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
import { API_URL } from "../utils/api";
import { useNavigate } from "react-router-dom";
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

export default function Profile() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [data, setData] = useState({
    name: "",
    email: "",
    phone_no: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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

  useEffect(() => {
    axios(API_URL + "users/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("tokenAdmin"),
      },
    })
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const phoneNumber = localStorage.getItem("phoneNumber");
    if (phoneNumber) {
      setData({ ...data, phone_no: phoneNumber });
    }
  }, []);

  const updatePhone = (e) => {
    const numb = e.target.value;
    if (numb.length < 11 && !isNaN(numb)) {
      setData({ ...data, phone_no: e.target.value });
    }
  };

  const updateData = async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.put(API_URL + `users/${data?.id}`, data, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer " + localStorage.getItem("tokenAdmin"),
        },
      });
      setIsLoading(false);
      if (response.status === 200) {
        if (response.data.phone_no) {
          localStorage.setItem("phoneNumber", response.data.phone_no);
        }

        navigate("/dashboard");
      }
    } catch (err) {
      setIsLoading(false);
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
                      label="Name"
                      value={data?.name}
                      onChange={(e) =>
                        setData({ ...data, name: e.target.value })
                      }
                    />
                  </FormControl>
                  <FormControl sx={{ mx: "20px", width: "45%" }}>
                    <TextInput
                      icon={
                        <InputAdornment position="start">
                          <MailOutlineIcon sx={{ color: "#84b1f1" }} />
                        </InputAdornment>
                      }
                      label="Email"
                      value={data?.email}
                      // required={true}
                      // inputProps={{
                      //   maxLength: 30,
                      //   pattern: "[A-Za-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$",
                      // }}
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
                      label="Phone No"
                      value={data?.phone_no}
                      inputProps={{
                        maxLength: 10,
                      }}
                      onChange={(e) => updatePhone(e)}
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
                      value={data?.password}
                      onChange={(e) =>
                        setData({ ...data, password: e.target.value })
                      }
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
                    onClick={updateData}
                    disabled={isLoading}
                  >
                    Update
                  </Button>
                </Box>
              </Grid>
            </Container>
          </Box>
          {isOnline ? null : (
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={isToastOpen}
              autoHideDuration={4000}
              onClose={() => setIsToastOpen(false)}
              message="No Internet Connection"
            />
          )}
        </Box>
      </ThemeProvider>
    </Box>
  );
}
