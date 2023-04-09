import React, { useEffect, useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import TextInput from "../components/TextField";
import FormControl from "@mui/material/FormControl";
// import FormLabel from "@mui/material/FormLabel";
// import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ListItems from "./ListItems";
import PeopleIcon from "@mui/icons-material/People";
import WifiCalling3OutlinedIcon from "@mui/icons-material/WifiCalling3Outlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
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

export default function AdminProfile() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone_no: "",
    password: "",
    // confirmpassword: "",
    // date_of_birth:"",
    // is_merchant:"",
    // is_admin:"",
    // is_barista:"",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password === confirmPassword) {
      const formData = {
        ...form,
        is_merchant: "No",
        is_admin: "Yes",
        is_barista: "No",
      };
      try {
        const response = await axios.post(
          "http://13.238.161.52:4000/api/v1/users/register",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        // console.log("===> access ", response.data?.data);

        //

        if (response.data.status_code === 1000 && response.data.status) {
          navigate(-1);
        }
      } catch (err) {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 400) {
          console.log("111 ", err.response?.data?.data);
          setErrMsg(err.response?.data?.data);
        } else {
          setErrMsg("Login Failed");
        }
      }
    } else {
      console.log("TEST MSG");
      setErrMsg("Password and Confirm password is not matching");
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();
  const gotoAdminpage = () => navigate("/adminUsers");

  const onPhoneNumberChange = (e) => {
    const numb = e.target.value;
    if (numb.length < 11 && !isNaN(numb)) {
      setForm({ ...form, phone_no: e.target.value });
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
                gutterBottom
              >
                Admins
              </Typography>
              <Typography
                variant="caption"
                sx={{ fontSize: "15px", color: "rgb(149,158,176)" }}
              >
                You can view and add admins here
              </Typography>
            </Box>
            <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
              <form onSubmit={handleSubmit}>
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
                  <Box sx={{ mt: 2, px: 2 }}>
                    <Typography
                      variant="h6"
                      fontSize="18px"
                      fontWeight="lg"
                      display="block"
                      gutterBottom
                    >
                      Add Admin details
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    <FormControl sx={{ mx: "20px", width: "45%" }}>
                      <TextInput
                        icon={
                          <InputAdornment position="start">
                            <PeopleIcon sx={{ color: "#84b1f1" }} />
                          </InputAdornment>
                        }
                        label="Name"
                        required={true}
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
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
                        required={true}
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                      />
                    </FormControl>
                  </Box>

                  <Box sx={{ mt: 1 }}>
                    <FormControl sx={{ mx: "20px", my: "10px", width: "45%" }}>
                      <TextInput
                        icon={
                          <InputAdornment position="start">
                            <WifiCalling3OutlinedIcon
                              sx={{ color: "#84b1f1" }}
                            />
                          </InputAdornment>
                        }
                        label="Phone No"
                        value={form.phone_no}
                        onChange={(e) => onPhoneNumberChange(e)}
                      />
                    </FormControl>
                  </Box>

                  <Box>
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
                              sx={{ color: "#acb6bc" }}
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        value={form.password}
                        onChange={(e) =>
                          setForm({ ...form, password: e.target.value })
                        }
                      />
                    </FormControl>

                    <FormControl sx={{ mx: "20px", my: "10px", width: "45%" }}>
                      <TextInput
                        icon={
                          <InputAdornment position="start">
                            <LockOutlinedIcon sx={{ color: "#84b1f1" }} />
                          </InputAdornment>
                        }
                        label=" Confirm Password"
                        type={showConfirmPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowConfirmPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              sx={{ color: "#acb6bc" }}
                            >
                              {showConfirmPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </FormControl>
                  </Box>

                  <Box
                    sx={{
                      "& button": { m: 1 },
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "flex-end",
                      margin: "20px",
                    }}
                  >
                    <Box>
                      <Button
                        type="submit"
                        variant="contained"
                        size="medium"
                        sx={{
                          px: 5,
                          boxShadow: "none",
                          textTransform: "none",
                          borderRadius: 2,
                          backgroundColor: "rgb(125,136,158)",
                          height: 40,
                          ":hover": {
                            backgroundColor: "rgb(125,136,158)",
                          },
                        }}
                        onClick={gotoAdminpage}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        size="medium"
                        type="submit"
                        sx={{
                          px: 5,
                          boxShadow: "none",
                          textTransform: "none",
                          borderRadius: 2,
                          backgroundColor: "rgb(31,108,227)",
                          height: 40,
                          ":hover": {
                            backgroundColor: "rgb(31,108,227)",
                          },
                        }}
                      >
                        + Add
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </form>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </Box>
  );
}
