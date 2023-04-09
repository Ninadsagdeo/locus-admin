import React from "react";
import { Button } from "@mui/material";

export default function AppButton(props) {
  return (
    <Button
      variant="contained"
      type={props.type}
      sx={{
        ...props.style,
        boxShadow: "none",
        textTransform: "none",
        borderRadius: 2,
        backgroundColor: "rgb(31,108,227)",
        width: "30%",
        height: 40,
        ":hover": {
          backgroundColor: "rgb(31,108,227)",
        },
      }}
    >
      {props.title}
    </Button>
  );
}
