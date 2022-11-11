import { TextField } from "@mui/material";
import React from "react";

function FieldText({ placeholder, onChange, value, type }) {
  return (
    <TextField
      className="textFiel"
      type={type}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      fullWidth
      margin="dense"
      variant="outlined"
    ></TextField>
  );
}

export default FieldText;
