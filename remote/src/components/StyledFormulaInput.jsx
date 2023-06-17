import "./init";
import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { addStyles, EditableMathField } from "react-mathquill";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

// inserts the required css to the <head> block.
// // you can skip this, if you want to do that by yourself.
// addStyles();
addStyles();

export default function StyledFormulaInput() {
  const [latex, setLatex] = useState("");
  return (
    <Grid
      container
      sx={{
        border: "1px solid #c1c1c1",
        minWidth: "150px",
        // position: "relative",
        "& .mq-editable-field": {
          fontSize: "15px",
          border: "none",
          width: "100%",
          // height: "100%",
          padding: "10px",
        },
        borderRadius: "5px",
        ":hover": {
          border: "1px solid black",
          cursor: "text",
        },
        "&.mq-root-block .mq-hasCursor": {
          outline: "none",
          border: "none",
        },
      }}
    >
      <Grid item flex={2} sx={{}}>
        <Grid container>
          <EditableMathField
            latex={latex}
            onChange={(mathField) => {
              setLatex(mathField.latex());
            }}
          />
        </Grid>
      </Grid>
      <Grid item flex={1}>
        <Grid
          justifyContent={"end"}
          alignContent={"center"}
          container
          sx={{
            p: 1,
            pr: 1.5,
            height: "100%",
          }}
        >
          <CheckCircleIcon color="success" />
          <CancelIcon color="error" />
        </Grid>
      </Grid>
    </Grid>
  );
}
