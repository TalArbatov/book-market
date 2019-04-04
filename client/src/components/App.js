import React from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import styled from "styled-components";
import Auth from './Auth/Auth';
import Terms from './Auth/Terms';

const ContentWrap = styled.div`
  background: #f0f0f0;
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
          <Route exact path="/login" component={() => <Auth />} />
          <Route exact path="/terms" component={() => <Terms />} />
        </Switch>
      </ContentWrap>
    </div>
  );
};

export default App;
