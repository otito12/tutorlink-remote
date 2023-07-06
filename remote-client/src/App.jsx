import { Typography } from "@mui/material";
import Question from "./questions/ab5c7957-76ed-4403-8fc0-ddb62a8dfd24";
import socket_url from "./utils/sockets";
import StyledLatexOCRInput from "./components/StyledLatexOCRInput"; // delete later
import { InlineMath } from "react-katex";

function App() {
  return (
    <>
      <div className="card">
        <Typography variant="h5">Remote Application</Typography>
        {/* <Typography variant="h5">{socket_url}</Typography> */}
        <Question />
      </div>
    </>
  );
}

export default App;
