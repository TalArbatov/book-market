import React from "react";
import Comment from "./Comment";
import styled from 'styled-components';

const StyledUl = styled.ul`
margin:0;
padding:0;
`
const Comments = props => {
  return (
      <StyledUl>
        {props.comments.map((comment, index) => {
          return <Comment key={index} comment={comment} postID={props.postID} />;
        })}
      </StyledUl>
  );
};

export default Comments;
