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
import * as ACTIONS from "../../actions/forumActions";
import { withRouter } from "react-router-dom";
import ButtonWrapper from "../shared/ButtonWrapper";
import { Button } from "@material-ui/core";

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
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;
const MainWindow = styled.div`
  border-left: 5px solid #4c394e;
  background: #fff;
  width: 80vw;
  min-width: 400px;
  min-height: 50vh;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;
const SubWrapper = styled.div`
  width: 60%;
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
    topic: "announcments",
    tags: [],
    tagInput: '',
  },
  error: ""
};

const CreatePost = props => {
  const { classes } = props;

  const [getState, setState] = useState(defaultState);

  const updateForm = (input, type) => {
    setState({ ...getState, form: { ...getState.form, [type]: input } });
  };
  const submitForm = e => {
    e.preventDefault();
    console.log(getState);
    props.createPost(getState.form).then(res => {
      console.log("res");
      console.log(res);
      if (!res.success) {
        console.log("unauthorized2");
        setState({ ...getState, error: res.error });
      }
      //else props.history.push('/forum')
    });
  };
  const onTopicInputUpdate = e => {
    const input = e.target.value;
    const lastLetter = input[input.length - 1];
    console.log(lastLetter);
    setState({...getState, form: {...getState.form, tagInput: input}})

    if (lastLetter == " ") {
      console.log("adding tag.");
      const newTag = input.slice(0, -1 );
      setState({
        ...getState,
        form: { ...getState.form, tags: [...getState.form.tags, newTag], tagInput: '' }
      });
    }
  };
  // const handleSelect = (input) => {
  //   setState({...getState, form: {...getState.form, topic: input}})
  // }
  return (
    <MainWindow>
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
                <tr>
                  <td>
                    <ButtonWrapper>
                      {getState.form.tags.map(tag => {
                        return <button>{tag}</button>;
                      })}
                    </ButtonWrapper>
                  </td>
                </tr>
                <tr>
                  <td>
                    <TextField
                      required
                      value={getState.form.tagInput}
                      label="Topic"
                      margin="normal"
                      classes={{ root: classes.root }}
                      variant="outlined"
                      onChange={e => onTopicInputUpdate(e)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <SubWrapper>
            <FormControl variant="outlined" className={classes.select}>
              <InputLabel htmlFor="outlined-age-native-simple">
                Topic
              </InputLabel>
              <Select
                classes={{ root: classes.select }}
                native
                //value={this.state.age}
                //onChange={this.handleChange('age')}
                onChange={e => updateForm(e.target.value, "topic")}
                input={
                  <OutlinedInput
                    name="age"
                    labelWidth={10}
                    id="outlined-age-native-simple"
                  />
                }
              >
                <option value={"announcments"}>Announcments</option>
                <option value={"patch-notes"}>Patch Notes</option>
                <option value={"random"}>Random</option>
                <option value={"new-stores"}>New Stores</option>
                <option value={"updating-users"}>Updating users</option>
              </Select>
            </FormControl>
          </SubWrapper>
          <ButtonWrapper>
            <button type="submit">Create Post</button>
          </ButtonWrapper>
        </form>
        <p style={{ color: "red" }}>{getState.error}</p>
      </Wrapper>
    </MainWindow>
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(CreatePost))
);
