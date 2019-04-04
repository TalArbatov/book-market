import React, {useState} from 'react';
import styled from 'styled-components';

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
            <td><label>Email: </label></td>
            <td><input type='text' onChange={e => updateForm(e.target.value, 'email')}></input></td>
          </tr>
          <tr>
            <td><label>Password: </label></td>
            <td><input type='password' onChange={e => updateForm(e.target.value, 'password')}></input></td>
          </tr>
        </tbody>
      </table>
      <button onClick={submitForm}>Login</button>
    </div>
  )
}

export default Login;