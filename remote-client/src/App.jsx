import { Typography } from "@mui/material";
import Question from "./questions/ab5c7957-76ed-4403-8fc0-ddb62a8dfd24";
import StyledLatexOCRInput from "./components/StyledLatexOCRInput"; // delete later
function App() {
  return (
    <>
      <div className="card">
        <Typography variant="h5">Remote Application</Typography>
        {/* <Question /> */}
        <StyledLatexOCRInput />
      </div>
    </>
  );
}

export default App;
