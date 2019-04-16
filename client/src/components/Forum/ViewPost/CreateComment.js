import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import * as ACTIONS from "../../../actions/forumActions";
import ButtonWrapper from "../../shared/ButtonWrapper";

const PostContent = styled.div`
  height: 100%;
  width: 100%;

  padding: 40px;
  padding-bottom: 20px;
`;
const MainWindow = styled.div`
  border-left: 5px solid #4c394e;
  background: #fff;
  width: 80vw;
  min-width: 400px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin-top: 25px;
  margin-bottom: 25px;
`;
const TextAreaWrapper = styled.div`
  width: 100%;
  textarea {
    width: 80%;
    height: 100px;
    margin-bottom: 10px;
  }
`;

const Wrapper = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
`;
const CreateComment = props => {
  const [getState, setState] = useState({
    content: "",
    errorMsg: ""
  });

  const contentChange = input => {
    setState(input);
  };

  const submitComment = () => {
    const user = props.userReducer.user;
    const comment = {
      author: {
        _id: user._id,
        imagePath: user.profileImage.filename,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
      },
      content: getState,
      postID: props.postID,
      date: Date.now()
    };

    props.addComment(comment, props.postID).then(res => {
      if (res.success) {
        props.onCommentSubmit();
      } else {
        setState({ ...getState, errorMsg: res.payload });
      }
    });
  };

  return (
    <Wrapper>
      <TextAreaWrapper>
        <textarea
          placeholder="What are your thoughts?"
          onChange={e => contentChange(e.target.value)}
          type="text"
        />
      </TextAreaWrapper>
      <p style={{ color: "red", margin:'0', marginBottom:'25px' }}>{getState.errorMsg}</p>
      <ButtonWrapper>
        <button onClick={submitComment}>Submit</button>
      </ButtonWrapper>
    </Wrapper>
  );
};
const mapStateToProps = state => {
  return {
    forumReducer: state.forumReducer,
    userReducer: state.userReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addComment: (comment, postID) =>
      dispatch(ACTIONS.addComment(comment, postID))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateComment);
