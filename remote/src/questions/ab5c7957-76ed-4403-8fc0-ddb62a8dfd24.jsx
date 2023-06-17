import React, { useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import { Grid, Typography } from "@mui/material";
import StyledNumberInput from "../components/StyledNumberInput";
import StyledFormulaInput from "../components/StyledFormulaInput";

// NOTES
// Base formular for question
// f(n) = (w + n) + ((w + n) + b) ^2
// where: n - row number, w - rand(0,4), b - rand(0,5)

// generate base formular
const w = Math.floor(Math.random() * (4 - 1 + 1) + 1);
const b = Math.floor(Math.random() * (5 - 1 + 1) + 1);
const ans = (n) => {
  return w + n + Math.pow(w + n + b, 2);
};

// generating row numbers
const x = Math.floor(Math.random() * (8 - 4 + 1) + 4);
const y = x + 1;
const z = Math.floor(Math.random() * (12 - (y + 1) + 1) + (y + 1));
const i = Math.floor(Math.random() * (60 - 30 + 1) + 30);
const j = Math.floor(Math.random() * (20 - 13 + 1) + 13);

export default function Question({ questionNumber = 1 }) {
  return (
    <div>
      <Grid
        sx={{
          pb: 2,
          "& .katex-html": {
            display: "none",
          },
        }}
      >
        <Typography fontWeight={600}>QUESTION {questionNumber}</Typography>
        <Grid container pt={1}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="body2">
                Here is a pattern of numbers.
              </Typography>
            </Grid>

            <Grid item xs={5}></Grid>
            <Grid item xs={5} sx={{ p: 1 }}>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Row 1:{" "}
                  <InlineMath math={`${w + 1} + ${w + b + 1}^2 = ${ans(1)}`} />
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Row 2:{" "}
                  <InlineMath math={`${w + 2} + ${w + b + 2}^2 = ${ans(2)}`} />
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Row 3:{" "}
                  <InlineMath math={`${w + 3} + ${w + b + 3}^2 = ${ans(3)}`} />
                </Typography>
              </Grid>
            </Grid>
            <Grid item flex={1}></Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12}>
              <Typography variant="body2">
                (a) Write out the next rows.
              </Typography>
            </Grid>
            <Grid item flex={1} sx={{ p: 1, pl: 3, pr: 3 }}>
              <Grid
                container
                alignItems={"center"}
                justifyContent={"space-between"}
                mb={1}
              >
                <Grid item>
                  <Typography variant="body2"> Row {x}:</Typography>
                </Grid>
                <Grid item>
                  <StyledFormulaInput />
                </Grid>
              </Grid>
              <Grid
                container
                alignItems={"center"}
                justifyContent={"space-between"}
                mb={1}
              >
                <Grid item>
                  <Typography variant="body2"> Row {y}:</Typography>
                </Grid>
                <Grid item>
                  <StyledNumberInput id="outlined-basic" variant="outlined" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12}>
              <Typography variant="body2">(b) Write out row {z}.</Typography>
            </Grid>
            <Grid item flex={1} sx={{ p: 1, pl: 3, pr: 3 }}>
              <Grid
                container
                alignItems={"center"}
                justifyContent={"space-between"}
                mb={1}
              >
                <Grid item>
                  <Typography variant="body2"> Row {z}:</Typography>
                </Grid>
                <Grid item>
                  <StyledNumberInput id="outlined-basic" variant="outlined" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12}>
              <Typography variant="body2">(c) Write out row {i}.</Typography>
            </Grid>
            <Grid item flex={1} sx={{ p: 1, pl: 3, pr: 3 }}>
              <Grid
                container
                alignItems={"center"}
                justifyContent={"space-between"}
                mb={1}
              >
                <Grid item>
                  <Typography variant="body2"> Row {i}:</Typography>
                </Grid>
                <Grid item>
                  <StyledNumberInput id="outlined-basic" variant="outlined" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12}>
              <Typography variant="body2">
                (d) Find the row which ends {ans(j)}.
              </Typography>
            </Grid>
            <Grid item flex={1} sx={{ p: 1, pl: 3, pr: 3 }}>
              <Grid
                container
                alignItems={"center"}
                justifyContent={"space-between"}
                mb={1}
              >
                <Grid item>
                  <Typography variant="body2">Answer:</Typography>
                </Grid>
                <Grid item>
                  <StyledNumberInput id="outlined-basic" variant="outlined" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
