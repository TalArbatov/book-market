import React from 'react';
import Login from './Login';
import Signup from './Signup';
import styled from 'styled-components';
import {connect} from 'react-redux';

const MainWindow = styled.div`
padding:60px 15px;
border-left: 5px solid #4c394e;
background:#fff;
min-width:80%;
height:50%;
display: flex;
flex-direction:row;
justify-content: space-evenly;
`

const Auth = props => {
  return(
    <MainWindow>
      <Signup />
      <Login />
    </MainWindow>
  )
}

export default Auth;