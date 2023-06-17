import "./init";
import React, { useState } from "react";
import { Grid } from "@mui/material";
import { addStyles, EditableMathField } from "react-mathquill";

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
          // cursor: "text",
        },
        "&.mq-root-block .mq-hasCursor": {
          outline: "none",
          border: "none",
        },
      }}
    >
      <EditableMathField
        latex={latex}
        onChange={(mathField) => {
          setLatex(mathField.latex());
        }}
      />
    </Grid>
  );
}
