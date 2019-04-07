import React, { useState } from "react";
import styled from "styled-components";
import KeyboardArrowUp from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import { connect } from "react-redux";
import * as ACTIONS from "../../../actions/forumActions";
import authenticated from "../../../utils/authenticated";
import Modal from "react-modal";
import Login from '../../Auth/Login';

Modal.setAppElement("#root");

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  p {
    margin: 0;
    text-align: center;
    width: 25px;
    display: inline-block;
  }
`;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

const ArrowsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const ArrowWrapper = styled.div`
  cursor: pointer;
`;

const defaultModalState = {
  isOpen: false
};

const VotePost = props => {
  const [getState, setState] = useState(defaultModalState);
  const vote = voteType => {
    const isAuth = authenticated();
    console.log('isAuth: ' + isAuth)
    if (isAuth) props.votePost(props.postID, voteType);
    else setState({ ...getState, isOpen: true });
  };

  const upvoteColor = props.currentUserVote == "up" ? { color: "red" } : {};
  const downvoteColor = props.currentUserVote == "down" ? { color: "red" } : {};

  return (
    <>
      <Wrapper>
        <p>{props.votes}</p>
        <ArrowsWrapper>
          <ArrowWrapper>
            <KeyboardArrowUp style={upvoteColor} onClick={() => vote("up")} />
          </ArrowWrapper>
          <ArrowWrapper>
            <KeyboardArrowDown
              style={downvoteColor}
              onClick={() => vote("down")}
            />
          </ArrowWrapper>
        </ArrowsWrapper>
      </Wrapper>
      <Modal
        isOpen={getState.isOpen}
        //onAfterOpen={this.afterOpenModal}
        onRequestClose={() => {
          setState({ ...getState, isOpen: false });
        }}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <p>Please log-in to vote on posts.</p>
        <Login />
        {/* <button
          onClick={() => {
            setState({ ...getState, isOpen: false });
          }}
        >
          Close
        </button> */}
      </Modal>
    </>
  );
};
const mapStateToProps = state => {
  return {
    forumReducer: state.forumReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    votePost: (postID, voteType) => dispatch(ACTIONS.votePost(postID, voteType))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VotePost);
