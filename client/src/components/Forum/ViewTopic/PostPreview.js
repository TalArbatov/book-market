import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import VotePost from "./VotePost";


const StyledTr = styled.tr`
  background: #efefef;
  box-shadow: 1px 1px black;
  td {
    padding-left: 25px;
  }
  
`;

const PostContents = styled.div`
margin-left:25px;
`

const PostWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const PostHeader = styled.div`
a {
    color: black;
    text-decoration: none;
  }
  p{
    font-weight: 600;
    font-size: 1.1em;
    color: #0000b7;
  }
`

const PostFooter = styled.div`
p {
  color:black;
  font-size:0.8em;

}
`

const VotePostWrapper = styled.div`
display:flex;
align-items:center;
`
const PostPreview = ({ post }) => {
  const m = new Date(post.date);
  var dateString = m.getFullYear() +"/"+ (m.getMonth()+1) +"/"+ m.getDate() + " " + m.getHours() + ":" + m.getMinutes() + ":" + m.getSeconds();


  return (
    <StyledTr>
      <td>
        <PostWrapper>
          <VotePostWrapper>
          <VotePost />
          </VotePostWrapper>
          <PostContents>
            <PostHeader>
            <Link to={"/forum/view/post/" + post._id}>
              <p>{post.title}</p>
            </Link>
            </PostHeader>
            <PostFooter>
              <p>Created by <Link to='/fuck'>{post.authorHeader}</Link>, {dateString}</p>
            </PostFooter>
          </PostContents>
        </PostWrapper>
      </td>
    </StyledTr>
  );
};
export default PostPreview;
