import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import configStore from "./configStore";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  padding: 0;
  font-family: Gisha;
  min-height:100vh;
  
}
.MuiOutlinedInput-input-32 {
  padding:14px !important;
}
`;

const store = configStore();
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <GlobalStyle />
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
