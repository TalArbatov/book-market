import React, { useState } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from '@material-ui/core/Checkbox';

import { withStyles } from "@material-ui/core/styles";

const defaultState = {
  form: {
    email: "",
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
    setState({...getState, form: {...getState.form, [type]: input}})
  };
  const submitForm = () => {
    console.log(getState.form);
    props.submit(getState.form).then(res => {
      if(res.success) {
        console.log('successfully logged in');
        setState(defaultState)
      }
      else setState({...getState, error: 'Invalid Credentials.'})
    })
  };

  return (
    <div>
      <h3>Login</h3>
      <table>
        <tbody>
          <tr>
            <TextField
              required
              id="outlined-required"
              label="Email"
              margin="normal"
              variant="outlined"
              classes={{ root: classes.root }}
              onChange={e => updateForm(e.target.value, "email")}
            />
          </tr>
          <tr>
            <TextField
              required
              id="outlined-required"
              label="Password"
              margin="normal"
              variant="outlined"
              type={getState.showPassword ? 'text' : 'password'}
              classes={{ root: classes.root }}
              onChange={e => updateForm(e.target.value, "password")}
            />{" "}
          </tr>
        </tbody>
      </table>
      <div>

        <Checkbox
          checked={getState.showPassword}
          onChange={() => {getState.showPassword ? setState({...getState, showPassword: false}) : setState({...getState, showPassword: true})}}
          value="checkedA"
        />
        <label>show password</label>
    </div>
      <button onClick={submitForm}>Login</button>
      <p style={{ color: "red" }}>{getState.error}</p>
    </div>
  );
};

export default withStyles(styles)(Login);
