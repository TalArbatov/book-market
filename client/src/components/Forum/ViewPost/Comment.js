import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import VoteComment from "./VoteComment";
import CommentHeader from './CommentHeader';
const CommentContent = styled.div`
  height: 100%;
  width: 100%;
  padding: 30px;
  display:flex;
  align-items:start;
`;
const CommentWindow = styled.div`
  border-left: 5px solid #4c394e;
  background: #fff;
  width: 80vw;
  min-width: 400px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin-top:15px;
`;
const StyledLi = styled.li`
  list-style-type: none;
`

const CommentText = styled.p`
  white-space:pre-line;
  margin-left:20px;
`

const Comment = ({ comment, postID }) => {
  return (
    <StyledLi>
      <CommentWindow>
        <CommentContent>
          {/* <VoteComment comment={comment} />
          <CommentText>{comment.content}</CommentText> */}
          <CommentHeader comment={comment}></CommentHeader>
        </CommentContent>
      </CommentWindow>
    </StyledLi>
  );
};

export default Comment;
