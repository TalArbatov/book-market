import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import * as ACTIONS from '../../actions/forumActions';
import {withRouter} from 'react-router-dom'

const Wrapper = styled.div`
  width: 60%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-items: center;
  table {
    width: 100%;
  }
  form {
    width:100%;
    display:flex;
    flex-direction:column;
  }
`;
const SubWrapper = styled.div`
width:60%;
  margin: 25px 0;
  margin-top: 25px;
`;
const styles = {
  root: {
    width: "100%"
  },
  select: {
    width: "100%"
  }
};
const defaultState = {
  form: {
    title: "",
    content: "",
    topic: "announcments"
  },
  error: ''
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

const CreatePost = props => {
  const { classes } = props;

  const [getState, setState] = useState(defaultState);

  const updateForm = (input, type) => {
    setState({ ...getState, form: {...getState.form , [type]: input} });
  };
  const submitForm = (e) => {
    e.preventDefault();
    console.log(getState);
    props.createPost(getState.form).then(res => {
      console.log('res')
      console.log(res)
      if(!res.success) {
        console.log('unauthorized2')
        setState({...getState, error: res.error})      
      }
      //else props.history.push('/forum/view')
    });
  };

  // const handleSelect = (input) => {
  //   setState({...getState, form: {...getState.form, topic: input}})
  // }
  return (
    <Wrapper>
      <form onSubmit={submitForm}>
        <div>
          <table>
            <tbody>
              <tr>
                <td>
                  <TextField
                    required
                    label="Title"
                    margin="normal"
                    classes={{ root: classes.root }}
                    variant="outlined"
                    onChange={e => updateForm(e.target.value, "title")}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <TextField
                    required
                    label="Content"
                    margin="normal"
                    variant="outlined"
                    classes={{ root: classes.root }}
                    multiline={true}
                    rows={15}
                    onChange={e => updateForm(e.target.value, "content")}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <SubWrapper>
          <FormControl variant="outlined" className={classes.select}>
            <InputLabel htmlFor="outlined-age-native-simple">Topic</InputLabel>
            <Select
              classes={{ root: classes.select }}
              native
              //value={this.state.age}
              //onChange={this.handleChange('age')}
              onChange={(e) => updateForm(e.target.value, 'topic')}
              input={
                <OutlinedInput
                  name="age"
                  labelWidth={10}
                  id="outlined-age-native-simple"
                />
              }
            >
            
              <option value={'announcments'}>Announcments</option>
              <option value={'patch-notes'}>Patch Notes</option>
              <option value={'random'}>Random</option>
              <option value={'new-stores'}>New Stores</option>
              <option value={'updating-users'}>Updating users</option>
              

            </Select>
          </FormControl>
        </SubWrapper>
        <ButtonWrapper>
          <button type="submit">Create Post</button>
        </ButtonWrapper>
      </form>
      <p style={{color:'red'}}>{getState.error}</p>
    </Wrapper>
  );
};

const mapStateToProps = state => {
  return {
    forumReducer: state.forumReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createPost: post => dispatch(ACTIONS.createPost(post))
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CreatePost)));
