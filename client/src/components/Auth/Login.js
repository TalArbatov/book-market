import React, { useState } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import {connect} from 'react-redux';
import * as ACTIONS from '../../actions/userActions';
import ButtonWrapper from '../shared/ButtonWrapper';
const defaultState = {
  form: {
    username: "",
    password: ""
  },
  error: "",
  showPassword: false
};
const styles = {
  root: {
    margin: "3px"
  }
};



const Login = props => {
  const { classes } = props;
  const [getState, setState] = useState(defaultState);
  const updateForm = (input, type) => {
    console.log(`type: ${type} , input: ${input}`);
    //setForm({ ...getForm, [type]: input });
    setState({ ...getState, form: { ...getState.form, [type]: input } });
  };
  const submitForm = (e) => {
    e.preventDefault();
    console.log(getState.form);
    props.login(getState.form).then(res => {
      if (res.success) {
        props.history.push("/forum");
        //setState(defaultState);
      } else setState({ ...getState, error: "Invalid Credentials." });
    });
  };

  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={submitForm}>
      <table>
        <tbody>
          <tr>
            <td>
              <TextField
                required
                label="Username"
                margin="normal"
                variant="outlined"
                classes={{ root: classes.root }}
                onChange={e => updateForm(e.target.value, "username")}
              />
            </td>
          </tr>

          <tr>
            <td>
              <TextField
                required
                label="Password"
                margin="normal"
                variant="outlined"
                type={getState.showPassword ? "text" : "password"}
                classes={{ root: classes.root }}
                onChange={e => updateForm(e.target.value, "password")}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <Checkbox
          checked={getState.showPassword}
          onChange={() => {
            getState.showPassword
              ? setState({ ...getState, showPassword: false })
              : setState({ ...getState, showPassword: true });
          }}
          value="checkedA"
        />
        <label>show password</label>
      </div>
      <ButtonWrapper>
        {/* <button onClick={submitForm}>Login</button> */}
        <button type='submit'>Login</button>
        <button onClick={props.secret}>Secret</button>
      </ButtonWrapper>
      </form>
      <p style={{ color: "red" }}>{getState.error}</p>
    </div>
  );
};

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

export default withRouter(connect(mapStateToProps,mapDispatchToProps)((withStyles(styles)(Login))));
