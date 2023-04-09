import React, { useEffect, useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ListItems from "./ListItems";
import MerchantsData from "./MerchantsData";
import Title from "../components/Title";
import ListItemIcon from "@mui/material/ListItemIcon";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import axios from "axios";
import merchantIcon from "./Assets/merchant.svg";
import coffeeIcon from "./Assets/coffee.svg";

const drawerWidth = 240;
// const merchantIcon = require("./Assets/merchant.svg");

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

export default function Dashboard() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const API_URL = "http://13.238.161.52:4000/api/v1/admin/dashboard/stats";

    axios(API_URL, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res.data);
        setData(res.data.data);
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
                variant="h4"
                fontSize="xl2"
                fontWeight="500"
                display="block"
              >
                Welcome Back!
              </Typography>
              <Typography
                variant="caption"
                sx={{ fontSize: "15px", color: "rgb(149,158,176)" }}
              >
                Track Your Business Analytics here
              </Typography>
            </Box>

            <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",

                      height: 130,
                      borderTop: "1px solid #e0e0e0",
                      borderRight: "1px solid #e0e0e0",
                      borderLeft: "1px solid #e0e0e0",
                      borderBottom: "1px solid #e0e0e0",
                      borderRadius: "5px",
                      ":hover": {
                        borderColor: "rgb(31,108,227)",
                        color: "rgb(31,108,227)",
                      },
                    }}
                  >
                    <Title>Total Merchants</Title>

                    <Typography
                      component="p"
                      variant="h4"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {data?.total_merchants || 0}
                      {/* <ListItemIcon sx={{ px: "4px" }}>
                        <ShoppingCartIcon />
                      </ListItemIcon> */}
                      <ListItemIcon sx={{ px: "4px" }}>
                        <img
                          src={merchantIcon}
                          style={{ height: 20, width: 20 }}
                          alt=""
                        />
                      </ListItemIcon>
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 130,

                      borderTop: "1px solid #e0e0e0",
                      borderRight: "1px solid #e0e0e0",
                      borderLeft: "1px solid #e0e0e0",
                      borderBottom: "1px solid #e0e0e0",
                      borderRadius: "5px",

                      ":hover": {
                        borderColor: "#5791ea",
                      },
                    }}
                  >
                    <Title>Total Customers</Title>
                    <Typography
                      component="p"
                      variant="h4"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {data?.total_customers || 0}
                      <ListItemIcon sx={{ px: "4px" }}>
                        <PeopleIcon />
                      </ListItemIcon>
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 130,

                      borderTop: "1px solid #e0e0e0",
                      borderRight: "1px solid #e0e0e0",
                      borderLeft: "1px solid #e0e0e0",
                      borderBottom: "1px solid #e0e0e0",
                      borderRadius: "5px",

                      ":hover": {
                        borderColor: "#5791ea",
                      },
                    }}
                  >
                    <Title>Coffee Sold</Title>
                    <Typography
                      component="p"
                      variant="h4"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {data?.total_purchase_coffee || 0}
                      <ListItemIcon sx={{ px: "4px" }}>
                        <img
                          src={coffeeIcon}
                          style={{ height: 20, width: 20 }}
                          alt=""
                        />
                      </ListItemIcon>
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 130,

                      borderTop: "1px solid #e0e0e0",
                      borderRight: "1px solid #e0e0e0",
                      borderLeft: "1px solid #e0e0e0",
                      borderBottom: "1px solid #e0e0e0",
                      borderRadius: "5px",

                      ":hover": {
                        borderColor: "#5791ea",
                      },
                    }}
                  >
                    <Title>Free Coffee</Title>
                    <Typography
                      component="p"
                      variant="h4"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {data?.total_free_coffee || 0}
                      <ListItemIcon sx={{ px: "4px" }}>
                        <img
                          src={coffeeIcon}
                          style={{ height: 20, width: 20 }}
                          alt=""
                        />
                      </ListItemIcon>
                    </Typography>
                  </Paper>
                </Grid>
                {/* Recent Merchants */}
                <Grid item xs={12}>
                  <MerchantsData />
                </Grid>
              </Grid>
              {/* <Copyright sx={{ pt: 4 }} /> */}
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
}
