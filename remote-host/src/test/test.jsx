import React from "react";
import Question from "remoteApp/ab5c7957-76ed-4403-8fc0-ddb62a8dfd24";
import { BlockMath, InlineMath } from "react-katex";
import { Grid, Typography } from "@mui/material";

export default function Test() {
  return (
    // link: https://media.abacus11plus.co.uk/file/11PlusMathsPracticePapers/Kings-College-School-Wimbledon-Specimen-Paper-B-2023-2025.pdf
    <Grid container direction={"column"} sx={{ height: "100%" }}>
      {/* copy this to remote */}
      <Question questionNumber={4} />
    </Grid>
  );
}
