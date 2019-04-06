import React from "react";
import styled from "styled-components";
import KeyboardArrowUp from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import { connect } from "react-redux";
import * as ACTIONS from "../../../actions/forumActions";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  p {
    margin: 0;
    margin-right: 7px;
    display: inline-block;
  }
`;

const ArrowsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const ArrowWrapper = styled.div`
  cursor: pointer;
`;

const VotePost = props => {
  const vote = voteType => {
    props.votePost(props.postID, voteType);
  };

  const upvoteColor = props.currentUserVote == "up" ? { color: "red" } : {};
  const downvoteColor = props.currentUserVote == "down" ? { color: "red" } : {};

  return (
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
