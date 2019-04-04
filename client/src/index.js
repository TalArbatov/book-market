import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import configStore from "./configStore";
import { Provider } from "react-redux";
const store = configStore();
ReactDOM.render(
  <Provider store={store}>
    {" "}
    <App />
  </Provider>,
  document.getElementById("root")
);
