import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  TableContainer,
  Box,
  Button,
  Typography,
  Snackbar,
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/api";

export default function MerchantsData() {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [limit, setLimit] = useState(8);
  const handleChangePage = async (event, newPage) => {
    setPage(newPage);
    const offsetData = Number(newPage) * limit;
    await axios(
      API_URL +
        `admin/sales/merchants?is_active_type=0?limit=${limit}&offset=${offsetData}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("tokenAdmin"),
        },
      }
    )
      .then((res) => {
        setData(res.data.data?.data);
        setPaginatedInfo(res.data.data);
      })
      .catch((error) => console.error(error));
  };
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [paginatedInfo, setPaginatedInfo] = useState(null);

  const [data, setData] = useState([]);
  const getAllMerchants = async () => {
    await axios(API_URL + "admin/sales/merchants?is_active_type=0", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("tokenAdmin"),
      },
    })
      .then((res) => {
        // console.log("RES ", res.data.data);
        setData(res.data.data.data);
        setPaginatedInfo(res.data.data);
      })
      .catch((err) => {
        if (err.response.status == 401) {
          localStorage.clear();
          navigate("/");
        }
      });
  };

  useEffect(() => {
    getAllMerchants();
  }, []);

  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isToastOpen, setIsToastOpen] = useState(false);

  useEffect(() => {
    // Update network status
    const handleStatusChange = () => {
      setIsOnline(navigator.onLine);
      console.log("navigator.onLine ", navigator.onLine);
      if (navigator.onLine === false) {
        setIsToastOpen(true);
      } else {
        setIsToastOpen(false);
      }
    };

    // Listen to the online status
    window.addEventListener("online", handleStatusChange);

    // Listen to the offline status
    window.addEventListener("offline", handleStatusChange);

    // Specify how to clean up after this effect for performance improvment
    return () => {
      window.removeEventListener("online", handleStatusChange);
      window.removeEventListener("offline", handleStatusChange);
    };
  }, [isOnline]);

  const submitAction = async (id) => {
    try {
      const response = await axios.put(
        API_URL + `users/${id}`,
        { is_active: 1 },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + localStorage.getItem("tokenAdmin"),
          },
        }
      );
      console.log("----> ", response.status);
      if (response.status === 200) {
        console.log("ADLLLL");
        getAllMerchants();
      }
    } catch (err) {
      console.log("ERR ");
      if (!err?.response) {
        // setErrMsg("No Server Response");
      } else if (err.response.status == 401) {
        localStorage.clear();
        navigate("/");
      } else {
        // setErrMsg("Login Failed");
      }
    }
  };

  const submitDeactivateAction = async (id) => {
    try {
      const response = await axios.put(
        API_URL + `users/${id}`,
        { is_active: 0 },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + localStorage.getItem("tokenAdmin"),
          },
        }
      );
      if (response.status === 200) {
        getAllMerchants();
      }
    } catch (err) {
      console.log("ERR ");
      if (!err?.response) {
        // setErrMsg("No Server Response");
      } else if (err.response.status == 401) {
        localStorage.clear();
        navigate("/");
      } else {
        // setErrMsg("Login Failed");
      }
    }
  };

  return (
    <React.Fragment>
      <TableContainer
        sx={{
          borderTop: "1px solid #e0e0e0",
          borderRight: "1px solid #e0e0e0",
          borderLeft: "1px solid #e0e0e0",
          borderBottom: "1px solid #e0e0e0",
          borderRadius: "8px",
        }}
      >
        <Typography
          sx={{ flex: "1 1 100%", px: "13px", mt: 2, fontSize: "15px" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          New / Inactive Merchants
        </Typography>
        <Table size="small" sx={{ mt: 1 }}>
          <TableHead>
            <TableRow sx={{ borderColor: "#e0e0e0" }}>
              <TableCell sx={{ color: "rgb(149,158,176)", fontSize: "13px" }}>
                Merchant Name
              </TableCell>
              <TableCell sx={{ color: "rgb(149,158,176)", fontSize: "13px" }}>
                Email
              </TableCell>
              <TableCell sx={{ color: "rgb(149,158,176)", fontSize: "13px" }}>
                Phone No
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "rgb(149,158,176)", fontSize: "13px" }}
              >
                Action
              </TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} sx={{ textAlign: "center" }}>
                  No Records found
                </TableCell>
              </TableRow>
            )}
            {data.map((row) => {
              return (
                <TableRow key={row.id}>
                  <TableCell sx={{ fontWeight: "500", fontSize: "13px" }}>
                    {row?.name}
                  </TableCell>
                  <TableCell sx={{ fontWeight: "400", fontSize: "11px" }}>
                    {row?.email}
                  </TableCell>
                  <TableCell sx={{ fontWeight: "400", fontSize: "11px" }}>
                    {row?.user_other_detail?.phone_no}
                  </TableCell>
                  {/* <TableCell>{row.action}</TableCell> */}
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {/* <Box>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            backgroundColor: "red",
                            color: "white",
                            fontFamily: "sans-serif",
                            fontSize: "11px",
                            fontWeight: "400",
                            ":hover": {
                              bgcolor: "#eb4335",
                              color: "white",
                            },
                          }}
                          
                          disabled={isOnline ? false : true}
                        >
                          Deactivate
                        </Button>
                      </Box> */}
                      <Box sx={{ mx: 2 }}>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            fontFamily: "sans-serif",
                            fontSize: "11px",
                            fontWeight: "400",
                          }}
                          onClick={() => submitAction(row?.id)}
                          disabled={isOnline ? false : true}
                        >
                          Activate
                        </Button>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <MoreVertIcon color="disabled" />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {isOnline ? null : (
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={isToastOpen}
            autoHideDuration={4000}
            onClose={() => setIsToastOpen(false)}
            message="No Internet Connection"
          />
        )}

        {data.length > 0 && (
          <TablePagination
            rowsPerPageOptions={[8]}
            component="div"
            count={paginatedInfo?.totalRecords}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </TableContainer>
    </React.Fragment>
  );
}
