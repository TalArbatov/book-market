import React from 'react';
import Login from './Login';
import Signup from './Signup';
import styled from 'styled-components';
import {connect} from 'react-redux';
import * as ACTIONS from '../../actions/userActions';
import axios from 'axios';
const MainWindow = styled.div`
padding:60px 15px;
border-left: 5px solid #4c394e;
background:#fff;
width:75%;
min-width:400px;
height:50%;
display: flex;
flex-direction:row;
justify-content: space-evenly;
flex-wrap:wrap;
`

const submitSignup = (form) => {

}

const createSecret = () => {
  console.log('creating secret...')
  console.log('bearer: ' +  localStorage.token)
  axios.get('/api/auth/secret', {headers: {
    Authorization: 'Bearer ' + localStorage.token
  }}).then((res) => {
    console.log('RES STATUS: ' + res.status)
    console.log(res.data)
  }).catch(err => {
    console.log('CATCH IN AUTH:' + err)
  })
}
const Auth = props => {
  return(
    <MainWindow>
      <Signup submit={(form) => {return props.signup(form)}}/>
      <Login submit={(form) =>{return props.login(form)}} secret={createSecret}/>
      {/* <button onClick={createSecret}>Secret</button> */}
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