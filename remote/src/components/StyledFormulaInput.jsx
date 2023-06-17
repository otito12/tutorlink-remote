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

export default function StyledFormulaInput({ ...props }) {
  const [latex, setLatex] = useState("");
  const { ans } = props;
  const [correct, setCorrect] = useState(null);
  const checkCorrect = (latex) => {
    const userans = latex.toString().replace(/\\[ ]+/g, "");
    if (userans === "") {
      setCorrect(null);
      return;
    }

    if (userans === ans) {
      console.log(userans);
      console.log(ans);
      setCorrect(true);
    } else {
      console.log(userans);
      console.log(ans);
      setCorrect(false);
    }
  };
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
              checkCorrect(mathField.latex());
            }}
          />
        </Grid>
      </Grid>

      {correct === null ? (
        <></>
      ) : (
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
            {correct === true && <CheckCircleIcon color="success" />}
            {correct === false && <CancelIcon color="error" />}
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
