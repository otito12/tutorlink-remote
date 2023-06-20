import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import style from "@edtr-io/mathquill/build/mathquill.css";

if (document.getElementById("react-mathquill-styles") == null) {
  const styleTag = document.createElement("style");
  styleTag.setAttribute("id", "react-mathquill-styles");
  styleTag.innerHTML = style[0][1];

  const head = document.getElementsByTagName("head")[0];
  head.appendChild(styleTag);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
