import React, { useEffect, useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import TextInput from "../components/TextField";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ListItems from "./ListItems";
import WifiCalling3OutlinedIcon from "@mui/icons-material/WifiCalling3Outlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Button from "@mui/material/Button";
import axios from "../api/axios";

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

export default function Profile() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [data, setData] = useState();

  useEffect(() => {
    const API_URL1 = "http://13.238.161.52:4000/api/v1/users/";
    axios(API_URL1, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log("---> ", res.data);
        setData(res.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <Box>
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
                Profile
              </Typography>
              <Typography
                variant="caption"
                sx={{ fontSize: "15px", color: "rgb(149,158,176)" }}
              >
                Edit your profile here
              </Typography>
            </Box>
            <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
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
                <Box sx={{ mt: 4 }}>
                  <FormControl sx={{ mx: "20px", width: "45%" }}>
                    <TextInput
                      icon={
                        <InputAdornment position="start">
                          <StoreOutlinedIcon sx={{ color: "#84b1f1" }} />
                        </InputAdornment>
                      }
                      label="  Name"
                      value={data?.name}
                    />
                  </FormControl>
                  <FormControl sx={{ mx: "20px", width: "45%" }}>
                    <TextInput
                      icon={
                        <InputAdornment position="start">
                          <MailOutlineIcon sx={{ color: "#84b1f1" }} />
                        </InputAdornment>
                      }
                      label="  Email"
                      value={data?.email}
                    />
                  </FormControl>
                </Box>

                <Box>
                  <FormControl sx={{ mx: "20px", my: "10px", width: "45%" }}>
                    <TextInput
                      icon={
                        <InputAdornment position="start">
                          <WifiCalling3OutlinedIcon sx={{ color: "#84b1f1" }} />
                        </InputAdornment>
                      }
                      label="  Phone No"
                    />
                  </FormControl>
                  <FormControl sx={{ mx: "20px", my: "10px", width: "45%" }}>
                    <TextInput
                      icon={
                        <InputAdornment position="start">
                          <LockOutlinedIcon sx={{ color: "#84b1f1" }} />
                        </InputAdornment>
                      }
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "end",
                    marginRight: "45px",
                    marginTop: "10px",
                    mb: 4,
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      px: 5,
                      boxShadow: "none",
                      textTransform: "none",
                      borderRadius: 2,
                      backgroundColor: "rgb(31,108,227)",
                      height: 40,
                      ":hover": {
                        bgcolor: "rgb(31,108,227)",
                      },
                    }}
                  >
                    Update
                  </Button>
                </Box>
              </Grid>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </Box>
  );
}
