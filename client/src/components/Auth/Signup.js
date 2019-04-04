import React, { useState } from "react";
import styled from "styled-components";
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const defaultForm = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: ""
};

const Signup = props => {
  const [getForm, setForm] = useState(defaultForm);
  const updateForm = (input, type) => {
    console.log(`type: ${type} , input: ${input}`);
    setForm({ ...getForm, [type]: input });
  };
  const submitForm = () => {
    console.log(getForm);
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
          onChange={e => updateForm(e.target.value, "lastName")}
        />            </td>
          </tr>
          <tr>
            <td>
            <TextField
          required
          id="outlined-required"
          label="Email"
          margin="normal"
          variant="outlined"
          onChange={e => updateForm(e.target.value, "email")}
        />            </td>
          </tr>
          <tr>
            <td>
            <TextField
          required
          id="outlined-required"
          label="Password"
          margin="normal"
          variant="outlined"
          onChange={e => updateForm(e.target.value, "password")}
        />            </td>
          </tr>
          <tr>
            <td>
            <TextField
          required
          id="outlined-required"
          label="Confirm Password"
          margin="normal"
          variant="outlined"
          onChange={e => updateForm(e.target.value, "confirmPassword")}
        />            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={submitForm}>Sign up</button>
    </div>
  );
};

export default Signup;
