import React from 'react';
import Login from './Login';
import Signup from './Signup';
import styled from 'styled-components';
import {connect} from 'react-redux';
import * as ACTIONS from '../../actions/userActions';

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

const submitSignup = (form) => {

}

const Auth = props => {
  return(
    <MainWindow>
      <Signup submit={(form) => {return props.signup(form)}}/>
      <Login submit={(form) =>{return props.login(form)}}/>
    </MainWindow>
  )
}

const mapStateToProps = state => {
  return {
    userReducer: state.userReducer
  }
}
const mapDispatchToProps = dispatch => {
  return {
    signup : (form) => dispatch(ACTIONS.signup(form)),
    login : (form) => dispatch(ACTIONS.login(form))

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);