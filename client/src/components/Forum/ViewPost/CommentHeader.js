import React from "react";
import styled from "styled-components";
import PostActions from "./PostActions";
import VoteComment from "./VoteComment";
import config from "../../../config";
import formatDate from "../../../utils/formatDate";
const ImgWrapper = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 50%;
  display: inline-block;
  justify-content: center;
  img {
    width: 100%;
    height: 100%;
    position: absolute;
  }
`;
const Title = styled.p`
  font-size: 1.3em;
  display: inline-block;
  margin: 0;
`;

const SubWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  margin-bottom: 20px;
`;
const Text = styled.div`
  margin-left: 30px;
`;
const Information = styled.p`
  color: grey;
  text-align: center;
`;
const Wrapper = styled.div``;

const BadgeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Content = styled.p`
  white-space: pre-line;
`;
const AccountWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const CommentHeader = props => {
  const {
    _id,
    votes,
    currentUserVote,
    title,
    author,
    content,
    date
  } = props.comment;
  const imagePath = config.PROFILE_IMG_PATH + props.comment.author.imagePath;

  //console.log("imagePath" + imagePath);
  return (
    <>
      <Wrapper>
        <SubWrapper>
          <AccountWrapper>
            <div style={{ paddingBottom: "30px", paddingRight: "15px" }}>
              <VoteComment comment={props.comment}/>
            </div>

            <BadgeWrapper>
              <ImgWrapper>
                <img src={imagePath} />
              </ImgWrapper>
              <Information>{author.username}</Information>
            </BadgeWrapper>
          </AccountWrapper>
          <Text>
            <Title>{title}</Title>
            {/* <p style={{ color: "grey" }}>{formatDate(date)}</p> */}
            <Content>{content}</Content>
          </Text>
        </SubWrapper>
      </Wrapper>
    </>
  );
};

export default CommentHeader;
