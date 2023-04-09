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
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TablePagination from "@mui/material/TablePagination";
import TableContainer from "@mui/material/TableContainer";
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
function createData(id, name, email, phoneno, branches) {
  return { id, name, email, phoneno, branches };
}

const rows = [
  createData(0, "Tim Hortins", "timhortins@gmail.com", "+010101000000", 3),
  createData(1, "Coffee House", "timhortins@gmail.com", "+010101000000", 1),
  createData(2, "Tim Hortins", "timhortins@gmail.com", "+010101000000", 5),
  createData(3, "Tim Hortins", "timhortins@gmail.com", "+010101000000", 5),
  createData(4, "Nescafe Coffee", "timhortins@gmail.com", "+010101000000", 1),
  createData(5, "Coffee", "timhortins@gmail.com", "+010101000000", 1),
];

export default function Merchants() {
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
    const API_URL1 = "http://13.238.161.52:4000/api/v1/admin/sales/merchants";

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
        // const sold = allData.filter((x) => x.is_free_coffee === "No");
        // const free = allData.filter((x) => x.is_free_coffee === "Yes");
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
              >
                Merchants
              </Typography>
              <Typography
                variant="caption"
                sx={{ fontSize: "15px", color: "rgb(149,158,176)" }}
              >
                You can view the merchants registred with Locus
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
                  <Table size="medium">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{ color: "rgb(149,158,176)", fontSize: "13px" }}
                        >
                          Merchant Name
                        </TableCell>
                        <TableCell
                          sx={{ color: "rgb(149,158,176)", fontSize: "13px" }}
                        >
                          Email
                        </TableCell>
                        <TableCell
                          sx={{ color: "rgb(149,158,176)", fontSize: "13px" }}
                        >
                          Phone No
                        </TableCell>
                        <TableCell
                          sx={{ color: "rgb(149,158,176)", fontSize: "13px" }}
                        >
                          Branches
                        </TableCell>
                        <TableCell
                          sx={{ color: "rgb(149,158,176)", fontSize: "13px" }}
                        >
                          {" "}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data1.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell
                            sx={{ fontWeight: "500", fontSize: "13px" }}
                          >
                            {row?.name}
                          </TableCell>
                          <TableCell
                            sx={{ fontWeight: "500", fontSize: "11px" }}
                          >
                            {row?.email}
                          </TableCell>
                          <TableCell
                            sx={{ fontWeight: "400", fontSize: "11px" }}
                          >
                            {row?.user_other_detail?.phone_no}
                          </TableCell>
                          <TableCell
                            sx={{ fontWeight: "500", fontSize: "13px" }}
                          >
                            {row?.total_merchant}
                          </TableCell>

                          <TableCell>
                            <MoreVertIcon color="disabled" />
                          </TableCell>
                        </TableRow>
                      ))}
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
