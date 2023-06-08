import * as React from "react";
import Box from "@mui/material/Box";
// import  { useEffect } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";

import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import "../style.css";

import { useLocation, useNavigate } from "react-router-dom";
import merchantIcon from "./Assets/merchantDash.svg";
import dashboardIcon from "./Assets/dashboard.svg";
import coffeeIcon from "./Assets/coffeeDash.svg";
import profileIcon from "./Assets/profile.svg";
// import logo from "../pages/logo.png";
const logo = require("./Assets/logo.png");

export default function ListItems() {
  const navigate = useNavigate();
  const location = useLocation();

  const gotoDashboardPage = () => {
    navigate("/dashboard");
  };

  const gotoMerchantsPage = () => {
    navigate("/merchants");
  };
  const gotoCustomersPage = () => {
    navigate("/customers");
  };

  const gotoProfilePage = () => {
    navigate("/profile");
  };

  const gotoAdminPage = () => {
    navigate("/adminUsers");
  };

  const gotoIssueList = () => {
    navigate("/issueList");
  };

  //   useEffect(() => {
  //     const checkUser = () => {
  //         if (!localStorage.getItem("username")) {
  //             navigate("/");
  //         }
  //     };
  //     checkUser();
  // }, [navigate]);

  const gotoLoginPage = () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <img style={{ width: "170px" }} src={logo} alt="" />
        </Box>

        <Box sx={{ mt: 2 }}>
          <ListItemButton
            onClick={gotoDashboardPage}
            sx={
              location.pathname.includes("dashboard")
                ? { backgroundColor: "rgb(31,108,227)" }
                : {}
            }
          >
            <ListItemIcon sx={{ color: "#d1dbed" }}>
              <img
                src={dashboardIcon}
                style={{ height: 20, width: 20, color: "#d1dbed" }}
                alt=""
              />
            </ListItemIcon>
            <ListItemText
              primary="Dashboard"
              sx={{ color: "#d1dbed", fontSize: "12px" }}
            ></ListItemText>
          </ListItemButton>

          <ListItemButton
            onClick={gotoMerchantsPage}
            sx={
              location.pathname.includes("merchants")
                ? { backgroundColor: "rgb(31,108,227)" }
                : {}
            }
          >
            <ListItemIcon sx={{ color: "#d1dbed" }}>
              <img
                src={merchantIcon}
                style={{ height: 20, width: 20, color: "#d1dbed" }}
                alt=""
              />
            </ListItemIcon>
            <ListItemText primary="Merchants" sx={{ color: "#d1dbed" }} />
          </ListItemButton>

          <ListItemButton
            onClick={gotoCustomersPage}
            sx={
              location.pathname.includes("customers")
                ? { backgroundColor: "rgb(31,108,227)" }
                : {}
            }
          >
            <ListItemIcon sx={{ color: "#d1dbed" }}>
              <img
                src={coffeeIcon}
                style={{ height: 20, width: 20, color: "#d1dbed" }}
                alt=""
              />
            </ListItemIcon>
            <ListItemText primary="Customers" sx={{ color: "#d1dbed" }} />
          </ListItemButton>

          <ListItemButton
            onClick={gotoIssueList}
            sx={
              location.pathname.includes("issueList")
                ? { backgroundColor: "rgb(31,108,227)" }
                : {}
            }
          >
            <ListItemIcon sx={{ color: "#d1dbed" }}>
              {/* <img
                src={profileIcon}
                style={{ height: 20, width: 20, color: "#d1dbed" }}
                alt=""
              /> */}
              <SupportAgentIcon />
            </ListItemIcon>
            <ListItemText primary="Issue List" sx={{ color: "#d1dbed" }} />
          </ListItemButton>

          <ListItemButton
            onClick={gotoProfilePage}
            sx={
              location.pathname.includes("profile")
                ? { backgroundColor: "rgb(31,108,227)" }
                : {}
            }
          >
            <ListItemIcon sx={{ color: "#d1dbed" }}>
              <img
                src={profileIcon}
                style={{ height: 20, width: 20, color: "#d1dbed" }}
                alt=""
              />
            </ListItemIcon>
            <ListItemText primary="Profile" sx={{ color: "#d1dbed" }} />
          </ListItemButton>

          <ListItemButton
            onClick={gotoAdminPage}
            sx={
              location.pathname.includes("adminUsers")
                ? { backgroundColor: "rgb(31,108,227)" }
                : {}
            }
          >
            <ListItemIcon sx={{ color: "#d1dbed" }}>
              <img
                src={profileIcon}
                style={{ height: 20, width: 20, color: "#d1dbed" }}
                alt=""
              />
            </ListItemIcon>
            <ListItemText primary="Admin Users" sx={{ color: "#d1dbed" }} />
          </ListItemButton>
        </Box>

        <Box sx={{ mt: 14, color: "#d1dbed" }}>
          <ListItemButton onClick={gotoLoginPage}>
            <ListItemIcon sx={{ color: "#d1dbed" }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </Box>
      </Box>
    </React.Fragment>
  );
}
