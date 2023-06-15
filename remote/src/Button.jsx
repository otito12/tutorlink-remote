import React, { useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import { Grid, Typography } from "@mui/material";

export default function Button() {
  const [state, setState] = useState(0);
  const x = String.fromCharCode(
    Math.floor(Math.random() * (122 - 97 + 1) + 97)
  );
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
        <Typography variant="h6" fontWeight={600}>
          Ass to Grass
        </Typography>
        <InlineMath math={`f(${x}) = ${x} + y`} />
      </Grid>

      <br />
      <button
        className="shared-btn"
        onClick={() => setState((state) => state + 1)}
      >
        Click me: {state}
      </button>
    </div>
  );
}
