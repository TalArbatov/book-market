import React, {useState} from 'react';
import styled from 'styled-components';
import TextField from "@material-ui/core/TextField";
import { withStyles } from '@material-ui/core/styles';

const defaultForm = {
  email: '',
  password: '',
}

const Login = props => {
  const [getForm, setForm] = useState(defaultForm);
  const updateForm = (input, type) => {
    console.log(`type: ${type} , input: ${input}`)
    setForm({...getForm, [type]: input})
  }
  const submitForm = () => {
    console.log(getForm)
  }
  return(
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
                classes={{ root: classes.root }}

                onChange={e => updateForm(e.target.value, "password")}
              />          </tr>
        </tbody>
      </table>
      <button onClick={submitForm}>Login</button>
    </div>
  )
}

export default Login;