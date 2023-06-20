import React from "react";
import { Grid, Typography, Button } from "@mui/material";

export default function StyledLatexOCRInput() {
  const produceOCR = () => {
    console.log("Produce OCR");
    produceMessage("Alive");
  };
  return (
    <Grid>
      StyledLatexOCRInput
      <Grid item xs={12}>
        <Button onClick={() => produceOCR()}>Press me</Button>
      </Grid>
    </Grid>
  );
}
