import React from "react";
import styled from "styled-components";
import {Link} from 'react-router-dom'

const StyledTr = styled.tr`
  background: #efefef;
  box-shadow: 1px 1px black;
  td {
    padding-left: 25px;
  }
  p ,a{
    color:black;
    text-decoration:none;
  }
  p:first-child {
    font-weight:600;
    font-size:1.1em;
    color:#0000b7;
  }
  p:nth-child(2) {
    font-size:0.9em;
    padding-left:20px;
  }
`;

const PostPreview = ({ post }) => {
  return (
    <StyledTr>
      <td>
      <Link to={'/forum/view/post/' + post._id}>
        <p>{post.title}</p>
        </Link>
      </td>
    </StyledTr>
  );
};
export default PostPreview;

