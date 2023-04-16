import React from "react";
import ReactDOM from "react-dom/client";
import GlobalStyle from "./styles/GlobalStyle/GlobalStyle";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalStyle>
      <App />
    </GlobalStyle>
  </React.StrictMode>
);
