import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import {
  CssBaseline,
  InputAdornment,
  Paper,
  Box,
  Grid,
  Typography,
  FormControl,
  Snackbar,
} from "@mui/material";
import TextInput from "../components/TextField";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { API_URL } from "../utils/api";

// const backgroundImage = require("./Assets/Group 48.png");
// const Image = require("./Assets/Group 47.png");
// const logo = require("./Assets/Group 109.png");

const backgroundImage = require("./Assets/Group 48.png");
const Image = require("./Assets/Group 47.png");
const logo = require("./Assets/logo.png");
const theme = createTheme();

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email !== "") {
      setIsLoading(true);
      try {
        const response = await axios.post(
          API_URL + "users/forget_password",
          { email: email },
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        setIsLoading(false);
        if (response?.data?.status_code === 1000 && response?.data?.status) {
          setEmail("");
          navigate("/otpVerify");
          localStorage.setItem("otp", response.data.data);
          localStorage.setItem("email", email);
        } else {
          setIsLoading(false);
          setErrMsg(response.data.data);
        }

        // if (!emailValidator(email))
        //   return setErrMsg("Please enter valid email id");
      } catch (err) {
        setIsLoading(false);
        // if (!err?.response) {
        //   setErrMsg("No Server Response");
        // } else if (err.response?.status === 400) {
        //   setErrMsg(err.response?.data?.data);
        // }  else {
        //   setErrMsg("No Server Response");
        // }
      }
    }
  };

  const navigate = useNavigate();

  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
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
                  <img style={{ height: "200px" }} src={logo} alt="" />
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
                my: 10,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <Typography
                variant="h3"
                fontSize="40"
                fontWeight="500"
                sx={{ color: "rgb(31,108,227)", mt: 5 }}
              >
                Forgot Password
              </Typography>
              <Typography component="h5" sx={{ my: 1, mb: 3 }}>
                Enter your Email to reset your password
              </Typography>
              <form style={{ width: "100%" }} onSubmit={handleSubmit}>
                <Box sx={{ flex: 1 }}>
                  <FormControl sx={{ width: "100%" }}>
                    <TextInput
                      icon={
                        <InputAdornment position="start">
                          <MailOutlineIcon sx={{ color: "rgb(31,108,227)" }} />
                        </InputAdornment>
                      }
                      label="Email"
                      value={email}
                      inputProps={{
                        maxLength: 30,
                        pattern: "[A-Za-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$",
                      }}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </FormControl>
                  <Typography color={"red"}>{errMsg}</Typography>

                  {isOnline ? null : (
                    <Snackbar
                      anchorOrigin={{ vertical: "top", horizontal: "center" }}
                      open={isToastOpen}
                      autoHideDuration={4000}
                      onClose={() => setIsToastOpen(false)}
                      message="No Internet Connection"
                    />
                  )}

                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 2,
                      float: "right",
                      px: 5,
                      boxShadow: "none",
                      textTransform: "none",
                      borderRadius: 2,
                      backgroundColor: "rgb(31,108,227)",
                      width: "35%",
                      height: 60,
                      ":hover": {
                        bgcolor: "rgb(31,108,227)",
                      },
                    }}
                  >
                    Next
                  </Button>
                </Box>
              </form>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}
