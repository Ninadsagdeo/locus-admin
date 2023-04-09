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

const rows = [
  createData(
    0,
    "TC",
    "Tom Cruise",
    "tom@gmail.com",
    "+101111121212",
    "25/02/1995",
    26,
    8
  ),
  createData(
    1,
    "MB",
    "Monica Bing",
    "monica07@gmail.com",
    "+101111121212",
    "05/01/1985",
    5,
    1
  ),
  createData(
    2,
    "RG",
    "Ross Geller",
    "profross@gmail.com",
    "+101111121212",
    "16/05/1992",
    12,
    2
  ),
  createData(
    3,
    "JT",
    "Joey Tribiani",
    "toy@gmail.com",
    "+101111121212",
    "04/12/2000",
    8,
    1
  ),
  createData(
    4,
    "MA",
    "Munnam Ali",
    "munnam403@gmail.com",
    "+101111121212",
    "02/11/1998",
    26,
    8
  ),
  createData(
    5,
    "CB",
    "Chandler Bing",
    "chandler@gmail.com",
    "+101111121212",
    "02/11/1983",
    26,
    8
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Customers() {
  const [page, setPage] = React.useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 16));
    setPage(0);
  };
  const [data1, setData1] = useState([]);
  useEffect(() => {
    const API_URL1 = "http://13.238.161.52:4000/api/v1/admin/customers/list";

    axios(API_URL1, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res.data);
        setData1(res.data.data);
        const allData = res?.data?.data;
        console.log("RES DATA ,", res.data.data);
        const sold = allData.filter((x) => x.is_free_coffee === "No");
        const free = allData.filter((x) => x.is_free_coffee === "Yes");
        // setSoldCoffee(sold.length);
        // setFreeCoffee(free.length);
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
                          Coffee Purchased
                        </TableCell>
                        <TableCell
                          sx={{ color: "rgb(149,158,176)", fontSize: "13px" }}
                        >
                          Free Coffee Availed
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data1
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
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
                                    <Typography sx={{}}>
                                      {" "}
                                      {row?.email}
                                    </Typography>
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

                <TablePagination
                  rowsPerPageOptions={[8, 16, 24]}
                  component="div"
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Grid>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
}
