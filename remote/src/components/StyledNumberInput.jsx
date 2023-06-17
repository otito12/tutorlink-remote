import React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export default function StyledNumberInput({ ...props }) {
  return (
    <OutlinedInput
      {...props}
      size={"small"}
      sx={{
        maxWidth: "150px",
        "& .MuiInputBase-input": { fontSize: "12px" },
      }}
      id="outlined-adornment-weight"
      endAdornment={
        <InputAdornment position="end">
          <CheckCircleIcon color="success" />
          <CancelIcon color="error" />
        </InputAdornment>
      }
      aria-describedby="outlined-weight-helper-text"
      inputProps={{
        "aria-label": "weight",
      }}
    />
  );
}
