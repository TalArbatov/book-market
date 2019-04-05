import React, { useState } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import { withRouter } from "react-router-dom";
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

const ButtonWrapper = styled.div`
  button {
    padding: 8px 18px;
    background: #815386;
    border-radius: 4px;
    color: #efefef;
    cursor: pointer;
    font-size: 0.95em;
    font-weight: 100;
  }
  button:hover {
    background: #4c394e;
  }
`;

const Login = props => {
  const { classes } = props;
  const [getState, setState] = useState(defaultState);
  const updateForm = (input, type) => {
    console.log(`type: ${type} , input: ${input}`);
    //setForm({ ...getForm, [type]: input });
    setState({ ...getState, form: { ...getState.form, [type]: input } });
  };
  const submitForm = () => {
    console.log(getState.form);
    props.submit(getState.form).then(res => {
      if (res.success) {
        props.history.push("/");
        //setState(defaultState);
      } else setState({ ...getState, error: "Invalid Credentials." });
    });
  };

  return (
    <div>
      <h3>Login</h3>
      <table>
        <tbody>
          <tr>
            <td>
              <TextField
                required
                label="Email"
                margin="normal"
                variant="outlined"
                classes={{ root: classes.root }}
                onChange={e => updateForm(e.target.value, "email")}
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
        <button onClick={submitForm}>Login</button>
        <button onClick={props.secret}>Secret</button>
      </ButtonWrapper>
      <p style={{ color: "red" }}>{getState.error}</p>
    </div>
  );
};

export default withRouter(withStyles(styles)(Login));
