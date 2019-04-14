import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import VoteComment from "./VoteComment";
const Comment = ({ comment,postID }) => {
  console.log(comment)
  return <li>
    <div>
      <VoteComment comment={comment}/>
      <p>{comment.content}</p>
    </div>
  </li>
};

export default Comment;
