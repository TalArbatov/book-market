import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import configStore from "./configStore";
import { Provider } from "react-redux";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import * as ACTIONS from "./actions/userActions";
import setAuthorizationToken from "./utils/setAuthorizationToken";

const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  padding: 0;
  font-family: Gisha;
  min-height:100vh;
  background: #f0f0f0;
  padding-bottom:40px;
  
}
.MuiOutlinedInput-input-32 {
  padding:14px !important;
}
`;
const store = configStore();


//  Authorization token is set in local Storage
//  1. when user logins
//  2. when user reloads the page

//DEPRECATED - token sets in localhost on login
//token attatches as authorization header on login + on reload inside componentdidmount
//

// const token = localStorage.token;
// console.log('inside index.js, token is: ');
// console.log(token)
// if (token != undefined && token !='undefined') {
//   console.log('now: ' + new Date(Date.now()))
//   console.log('exp: ' + new Date(require('jsonwebtoken').decode(token).exp * 1000));
//   const now = new Date(Date.now());
//   const exp = new Date(require('jsonwebtoken').decode(token).exp * 1000)
//   if(now > exp) {
//     console.warn('EXPIRED');
//   }
//   else {
//     store.dispatch(ACTIONS.loginSuccess(token));

//   }
// }

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <GlobalStyle />
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
