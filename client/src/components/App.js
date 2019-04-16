import React from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import styled from "styled-components";
import Auth from './Auth/Auth';
import Terms from './Auth/Terms';
import Forum from './Forum/Forum'
import Account from './Account/Account';
const ContentWrap = styled.div`
  min-height:100vh;
  display:flex;
  justify-content:center;
  padding-top:40px;
`;
const App = props => {
  return (
    <div>
      <Navbar />
      <ContentWrap>
        <Switch>
          <Route exact path="/" component={() => <div>stasdasd asdaksld askldasda</div>} />
          <Route path="/login" component={() => <Auth />} />
          <Route path="/terms" component={() => <Terms />} />
          <Route path="/forum" component={() => <Forum />} />
          <Route path="/account" component={() => <Account />} />

        </Switch>
      </ContentWrap>
    </div>
  );
};

export default App;
