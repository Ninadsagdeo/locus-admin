import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  CssBaseline,
  FormControl,
  Paper,
  Box,
  Grid,
  Typography,
  Snackbar,
} from "@mui/material";
import TextInput from "../components/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import AuthContext from "../context/AuthProvider";
import { API_URL } from "../utils/api";

const logo = require("./Assets/logo.png");

const theme = createTheme();

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const { setAuth } = useContext(AuthContext);
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const emailData = localStorage.getItem("email");
    const otp = localStorage.getItem("otp");
    setEmail(emailData);
    // setOtp(otp);
  }, []);

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

  const handleSubmit = async () => {
    const mainOtp = localStorage.getItem("otp");
    if (mainOtp == otp) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          API_URL + "users/verify_otp",
          { email: email, otp: otp },
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        const userData = response?.data?.data;
        if (response?.data?.status_code == 999 && !response?.data?.status) {
          setErrMsg(userData);
          setIsLoading(false);
        } else if (userData.user_type === "admin") {
          const token = response?.data?.data?.token;
          await localStorage.setItem(
            "phoneNumber",
            response?.data?.data?.phone_no
          );
          setIsLoading(false);

          await localStorage.setItem("token", response?.data?.data?.token);
          setAuth(email, otp, token);
          setEmail("");
          navigate("/dashboard");
        } else {
          setIsLoading(false);
          setErrMsg("Incorrect OTP");
        }
      } catch (err) {
        setIsLoading(false);
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 400) {
          setErrMsg(err.response?.data?.data);
        } else if (err.response?.status === 401) {
          setErrMsg("Unauthorized");
        } else {
          setErrMsg("Something went wrong");
        }
      }
    }
  };

  const navigate = useNavigate();

  const verifyOtpData = (e) => {
    const numb = e.target.value;
    if (!isNaN(numb)) {
      setOtp(Number(e.target.value));
    }
  };

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
            <img
              style={{
                height: "200px",
                position: "absolute",
                top: "35%",
                left: "20%",
              }}
              src={logo}
              alt=""
            />
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
                Verify OTP
              </Typography>
              <Typography component="h5" sx={{ my: 1, mb: 3 }}>
                OTP Verification
              </Typography>

              <FormControl sx={{ width: "100%" }}>
                <TextInput
                  value={otp}
                  inputProps={{
                    maxLength: 4,
                  }}
                  onChange={(e) => verifyOtpData(e)}
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
                  alignSelf: "end",
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
                onClick={handleSubmit}
                disabled={isLoading || !isOnline ? true : false}
              >
                Next
              </Button>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}
