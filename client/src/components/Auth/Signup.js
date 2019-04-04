import React, { useState } from "react";
import styled from "styled-components";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { withStyles } from '@material-ui/core/styles';

const defaultState = {
  form: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  },
  err: ""
};

const styles = {
  root: {
    margin: '3px'
  }
};

const Signup = props => {
  const { classes } = props;

  const [getState, setState] = useState(defaultState);
  const updateForm = (input, type) => {
    console.log(`type: ${type} , input: ${input}`);
    setState({ ...getState, form: { ...getState.form, [type]: input } });
  };
  const validateForm = () => {
    const form = getState.form;
    let err = null;
    if (form.firstName.length == 0) err = "Please enter first name.";
    else if (form.lastName.length == 0) err = "Please enter last name.";
    else if (form.email.length == 0) err = "Please enter Email Address.";
    else if (form.email.length < 6) err = "Invalid Email address.";
    else if (form.email.password == 0) err = "Please enter Password.";
    else if (form.password.length < 3)
      err = "Password must be at least 4 characters long.";
    else if (form.password != form.confirmPassword)
      err = "Passwords dont match.";
    if (err) return setState({ ...getState, error: err });
    else {
      setState({ ...getState, error: "" });
      submitForm();
    }
  };
  const submitForm = () => {
    console.log("submiting form");
    props.submit(getState.form).then(res => {
      console.log(res);
      if(!res.success) {
        console.log('FAILURE')
        setState({...getState, error: res.error})
      }
      else console.log('success!!!')
    });
  };
  return (
    <div>
      <h3>Sign Up</h3>
      <table>
        <tbody>
          <tr>
            <td>
              <TextField
                required
                id="outlined-required"
                label="First Name"
                margin="normal"
                variant="outlined"
                classes={{ root: classes.root }}

                onChange={e => updateForm(e.target.value, "firstName")}
              />
            </td>
          </tr>
          <tr>
            <td>
              <TextField
                required
                id="outlined-required"
                label="Last Name"
                margin="normal"
                variant="outlined"
                classes={{ root: classes.root }}
                onChange={e => updateForm(e.target.value, "lastName")}
              />{" "}
            </td>
          </tr>
          <tr>
            <td>
              <TextField
                required
                id="outlined-required"
                label="Email"
                margin="normal"
                variant="outlined"
                classes={{ root: classes.root }}

                onChange={e => updateForm(e.target.value, "email")}
              />{" "}
            </td>
          </tr>
          <tr>
            <td>
              <TextField
                required
                id="outlined-required"
                label="Password"
                type="password"
                margin="normal"
                classes={{ root: classes.root }}

                variant="outlined"
                onChange={e => updateForm(e.target.value, "password")}
              />{" "}
            </td>
          </tr>
          <tr>
            <td>
              <TextField
                required
                id="outlined-required"
                label="Confirm Password"
                margin="normal"
                variant="outlined"
                type="password"
                classes={{ root: classes.root }}

                onChange={e => updateForm(e.target.value, "confirmPassword")}
              />{" "}
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={validateForm}>Sign up</button>
      <p style={{ color: "red" }}>{getState.error}</p>
    </div>
  );
};

export default withStyles(styles)(Signup);
