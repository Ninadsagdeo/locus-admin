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
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Generate Merchants Data
function createData(id, name, email, phoneno, reject, accept) {
  return { id, name, email, phoneno, reject, accept };
}

const rows = [
  createData(0, "Tim Hortins", "timhortins@gmail.com", "+010101000000"),
  createData(1, "Tim Hortins", "timhortins@gmail.com", "+010101000000"),
  createData(2, "Tim Hortins", "timhortins@gmail.com", "+010101000000"),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function MerchantsData() {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    getAllMerchants();
  }, []);

  const getAllMerchants = async () => {
    const API_URL1 =
      "http://13.238.161.52:4000/api/v1/admin/sales/merchants?is_active_type=0";

    await axios(API_URL1, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res.data);
        setData(res.data.data);
      })
      .catch((err) => {
        if (err.response.status == 401) {
          localStorage.clear();
          navigate("/");
        }
      });
  };

  const submitAction = async (id) => {
    try {
      const response = await axios.put(
        `http://13.238.161.52:4000/api/v1/users/${id}`,
        { is_active: 1 },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.data.statue) {
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
          New Merchants
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
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
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
                        <Box>
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
                            // onClick={() => submitAction("reject")}
                          >
                            Reject
                          </Button>
                        </Box>
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
                          >
                            Accept
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

        <TablePagination
          rowsPerPageOptions={[8, 16, 24]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </React.Fragment>
  );
}
