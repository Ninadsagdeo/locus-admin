import React, { useEffect, useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ListItems from "./ListItems";
import Avatar from "@mui/material/Avatar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TablePagination from "@mui/material/TablePagination";
import TableContainer from "@mui/material/TableContainer";
import Button from "@mui/material/Button";
import axios from "axios";
import { API_URL } from "../utils/api";
import { Snackbar } from "@mui/material";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    background: " linear-gradient(168.2deg, #1d66d5 10.77%, #0d2958 103.87%);",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
  },
}));

const mdTheme = createTheme();

function createData(
  id,
  initial,
  name,
  email,
  phoneno,
  dateOfBirth,
  coffeePurchased,
  freeCoffeeAvailed
) {
  return {
    id,
    initial,
    name,
    email,
    phoneno,
    dateOfBirth,
    coffeePurchased,
    freeCoffeeAvailed,
  };
}

function preventDefault(event) {
  event.preventDefault();
}

export default function Customers() {
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(8);

  const [paginatedInfo, setPaginatedInfo] = useState(null);

  const [offset, setOffset] = useState(1);
  const [limit, setLimit] = useState(8);

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

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 16));
    setPage(0);
  };
  const handleChangePage = async (event, newPage) => {
    console.log("NEW PAGE ", newPage);
    setPage(newPage);

    const offsetData = Number(newPage) * limit;

    await axios(
      API_URL + `admin/customers/list?limit=${limit}&offset=${offsetData}`,
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
  const [data, setData] = useState([]);
  useEffect(() => {
    axios(API_URL + "admin/customers/list?limit=8&offset=0", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("tokenAdmin"),
      },
    })
      .then((res) => {
        setData(res.data.data?.data);
        setPaginatedInfo(res.data.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />

          <Drawer variant="permanent">
            <List component="nav">
              <ListItems />
            </List>
          </Drawer>

          <Box
            component="main"
            sx={{
              backgroundColor: (theme) => theme.palette.mode === "white",
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Box mx={3} my={4}>
              <Typography
                variant="h5"
                fontSize="xl2"
                fontWeight="500"
                display="block"
                gutterBottom
              >
                Customers
              </Typography>
              <Typography
                variant="caption"
                sx={{ fontSize: "15px", color: "rgb(149,158,176)" }}
              >
                You can view the Customers registred with Locus
              </Typography>
            </Box>
            <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                sx={{
                  borderTop: "1px solid #e0e0e0",
                  borderRight: "1px solid #e0e0e0",
                  borderLeft: "1px solid #e0e0e0",
                  borderBottom: "1px solid #e0e0e0",
                  borderRadius: "5px",
                }}
              >
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{ color: "rgb(149,158,176)", fontSize: "13px" }}
                        >
                          Customer Name
                        </TableCell>

                        <TableCell
                          sx={{ color: "rgb(149,158,176)", fontSize: "13px" }}
                        >
                          Date of Birth
                        </TableCell>
                        <TableCell
                          sx={{ color: "rgb(149,158,176)", fontSize: "13px" }}
                        >
                          Items Purchased
                        </TableCell>
                        <TableCell
                          sx={{ color: "rgb(149,158,176)", fontSize: "13px" }}
                        >
                          Free Items Availed
                        </TableCell>
                        <TableCell></TableCell>
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
                            <TableCell>
                              <Box
                                sx={{ display: "flex", flexDirection: "row" }}
                              >
                                <Avatar
                                  sx={{ width: 35, height: 35, fontSize: 14 }}
                                >
                                  {row?.initial}
                                </Avatar>
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    ml: 2,
                                  }}
                                >
                                  <Typography sx={{}}>{row?.name}</Typography>
                                  <Typography sx={{}}> {row?.email}</Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell sx={{ fontSize: "13px" }}>
                              {row.dateOfBirth}
                            </TableCell>
                            <TableCell
                              sx={{ fontWeight: "500", fontSize: "13px" }}
                            >
                              {row?.purhcase_coffees}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="contained"
                                size="small"
                                onClick={preventDefault}
                                sx={{
                                  borderRadius: 5,
                                  boxShadow: "none",
                                  backgroundColor: "rgb(31,108,227)",
                                  ":hover": {
                                    backgroundColor: "rgb(31,108,227)",
                                  },
                                }}
                              >
                                {row?.free_coffees}
                              </Button>
                            </TableCell>

                            <TableCell>
                              <MoreVertIcon color="disabled" />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>

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
              </Grid>

              {isOnline ? null : (
                <Snackbar
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                  open={isToastOpen}
                  autoHideDuration={4000}
                  onClose={() => setIsToastOpen(false)}
                  message="No Internet Connection"
                />
              )}
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
}
