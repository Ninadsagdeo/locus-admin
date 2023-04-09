import React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextInput from "../components/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function ForgetPassword() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
    });
  };

  const navigate = useNavigate();

  const gotoVerificationPage = () => navigate("/otpVerify");

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(/background.jpg)',
              backgroundRepeat: "no-repeat",
              // backgroundColor: "rgb(31,108,227)",

              backgroundSize: "100% 100%",
              backgroundPosition: "center",
            }}
          />
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
                variant='h5'
                fontSize="xl2"
                fontWeight="500"
                sx={{ color: "rgb(31,108,227)" }}
              >
                Forgot Password
              </Typography>
              <Typography component="h5" sx={{ my: 1, mb: 3 }}>
                Enter your Email to reset your password
              </Typography>
              <FormControl sx={{  width: "100%" }}>
                      <TextInput
                      onSubmit={handleSubmit}
                        icon={
                          <InputAdornment position="start">
                            <MailOutlineIcon />
                          </InputAdornment>
                        }
                        label="Email"
                      />
                    </FormControl>
                
                 <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2,alignSelf:'end',px:5}}
                    onClick={gotoVerificationPage}
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
