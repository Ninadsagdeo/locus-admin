import React from "react";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";

export default function TextInput(props) {
  return (
    <React.Fragment>
      <FormLabel
        id="demo-row-radio-buttons-group-label"
        sx={{
          color: "black",
          fontSize: "14px",
          fontWeight: "500",
        }}
      >
        {props?.label}
      </FormLabel>
      <TextField
        sx={{
          border: "none",
          "& fieldset": { border: "none" },
          backgroundColor: "#e8f7ff",
          boxShadow: "0px 0px 10px rgba(0,0,0,0.10)",
          borderRadius: "8px",
          height: "50px",
        }}
        id="filled-required"
        variant="outlined"
        onChange={props.onChange}
        value={props.value}
        type={props.type}
        required={props.required}
        InputProps={{
          startAdornment: props?.icon,
          endAdornment: props?.endAdornment,
        }}
      />
    </React.Fragment>
  );
}
