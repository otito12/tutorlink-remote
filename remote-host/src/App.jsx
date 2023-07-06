import Test from "./test/test";
import { Grid } from "@mui/material";

function App() {
  return (
    <Grid
      container
      sx={{ height: "100vh", width: "100vw" }}
      alignContent={"start"}
    >
      <Test />
    </Grid>
  );
}

export default App;
