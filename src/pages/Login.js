import React, { useContext, useState } from "react";
// import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";
import TextInput from "../components/TextField";
import axios from "../api/axios";
import AuthContext from "../context/AuthProvider";
// import { emailValidator } from "../components/regexValidator";
import AppButton from "../components/AppButton";
const API_URL = "http://13.238.161.52:4000/api/v1/users/login";
const backgroundImage = require("./Assets/Group 48.png");
const Image = require("./Assets/Group 47.png");
const logo = require("./Assets/logo.png");
const theme = createTheme();

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMessage, setsuccessMessage] = useState("");
  const { setAuth } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        API_URL,
        JSON.stringify({ email, password }),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      console.log("===> access ", response.data?.data);
      const userData = response?.data?.data;
      if (userData.user_type === "admin") {
        const token = response?.data?.data?.token;
        await localStorage.setItem("token", response?.data?.data?.token);
        setAuth(email, password, token);
        setEmail("");
        setPassword("");
        setsuccessMessage("");
        navigate("/dashboard");
      } else {
        setErrMsg("Email or Password is Incorrect");
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg(err.response?.data?.data);
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);

  // const gotoVerificationPage = () => navigate("/forgetPassword");
  // const gotoSignupPage = () => navigate("/register");

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Grid
          container
          component="main"
          sx={{ height: "100vh", overflow: "hidden" }}
        >
          <CssBaseline />
          <Grid
            item
            sm={4}
            md={7}
            sx={{
              background:
                " linear-gradient(168.2deg, #1d66d5 10.77%, #0d2958 103.87%);",
              display: { xs: "none", sm: "block", md: "block", lg: "block" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ mt: 3 }}>
                <img style={{ width: "220px" }} src={backgroundImage} alt="" />
              </Box>
              <Box>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                  <img style={{ height: "300px" }} src={logo} alt="" />
                </Box>
                {/* <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <img style={{ width: "200px" }} src={text} alt="" />
                </Box> */}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mt: 3,
                  marginRight: "20px",
                }}
              >
                <img style={{ width: "220px" }} src={Image} alt="" />
              </Box>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 12,
                mx: 4,

                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <Typography
                variant="h4"
                fontSize="20"
                fontWeight="500"
                sx={{ color: "rgb(31,108,227)" }}
              >
                Login
              </Typography>
              <Typography
                component="h5"
                sx={{ my: 1, mb: 3, fontWeight: "500", fontSize: "13px" }}
              >
                Login into your Locus Merchant Portal
              </Typography>
              <form onSubmit={handleSubmit}>
                <Box sx={{ mt: 1 }}>
                  <FormControl sx={{ width: "100%" }}>
                    <TextInput
                      required={true}
                      icon={
                        <InputAdornment position="start">
                          <MailOutlineIcon sx={{ color: "rgb(31,108,227)" }} />
                        </InputAdornment>
                      }
                      label="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormControl>

                  <FormControl sx={{ my: "10px", mt: 3, width: "100%" }}>
                    <TextInput
                      icon={
                        <InputAdornment position="start">
                          <LockOutlinedIcon sx={{ color: "rgb(31,108,227)" }} />
                        </InputAdornment>
                      }
                      label="Password"
                      required={true}
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <Typography
                    color={"red"}
                    className={errMsg ? "errmsg" : "offscreen"}
                  >
                    {errMsg}
                  </Typography>
                  {successMessage.length > 0 && (
                    <Typography sx={{ marginBottom: "10px", color: "green" }}>
                      {successMessage}
                    </Typography>
                  )}

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "end",
                    }}
                  >
                    {/* <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        mt: 3,
                        mb: 2,
                        px: 5,
                        backgroundColor: "rgb(247,66,49)",
                      }}
                      value="Submit"
                    >
                      Login
                    </Button> */}
                    <AppButton
                      style={{ mt: 3, mb: 2, px: 2 }}
                      type="submit"
                      title="Login"
                    />

                    <Link
                      href="#"
                      variant="body2"
                      // onClick={gotoVerificationPage}
                      sx={{
                        color: "rgb(31,108,227)",
                        fontWeight: "700",
                        textDecoration: "none",
                      }}
                    >
                      Forgot password?
                    </Link>

                    {/* <Link
                      href="#"
                      variant="body2"
                      sx={{
                        mt: 10,
                        color: "black",
                        alignSelf: "center",
                        textDecoration: "none",
                      }}
                    >
                      Don't have an account want to{" "}
                      <Link
                        href="#"
                        onClick={gotoSignupPage}
                        sx={{
                          color: "rgb(31,108,227)",
                          fontWeight: "700",
                          textDecoration: "none",
                        }}
                      >
                        Signup?
                      </Link>
                    </Link> */}
                  </Box>
                </Box>
              </form>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}
