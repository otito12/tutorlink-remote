import React, { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export default function StyledNumberInput({ ...props }) {
  const { ans } = props;
  const [correct, setCorrect] = useState(null);
  const checkCorrect = (event) => {
    const userans = event.target.value;
    console.log(userans);
    console.log(ans);
    if (event.target.value === "") {
      setCorrect(null);
      return;
    }

    if (event.target.value === ans.toString()) {
      setCorrect(true);
    } else {
      setCorrect(false);
    }
  };

  return (
    <OutlinedInput
      {...props}
      size={"small"}
      sx={{
        maxWidth: "150px",
        "& .MuiInputBase-input": { fontSize: "12px" },
      }}
      id="outlined-adornment-weight"
      onChange={(event) => checkCorrect(event)}
      endAdornment={
        <InputAdornment position="end">
          {correct === null && <></>}
          {correct === true && <CheckCircleIcon color="success" />}
          {correct === false && <CancelIcon color="error" />}
        </InputAdornment>
      }
      aria-describedby="outlined-weight-helper-text"
      inputProps={{
        "aria-label": "weight",
      }}
    />
  );
}
