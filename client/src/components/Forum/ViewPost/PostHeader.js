import React from "react";
import styled from "styled-components";
import PostActions from "./PostActions";
import VotePost from "../ViewTopic/VotePost";
import config from "../../../config";
import formatDate from "../../../utils/formatDate";
import PostBadges from "./PostBadges/index";
import HollowButtonWrapper from '../../shared/HollowButtonWrapper';
import { followUser } from "../../../actions/forumActions";

const Overlay = styled.div`
  position:absolute;
  background:black;
  width: 100%;
  height: 100%;
  opacity:0;
  z-index:0;
  transition:0.4s;
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  &:hover {
    opacity:0.5;
  }
`


const ImgWrapper = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 50%;
  display: inline-block;
  justify-content: center;
  img {
    width: auto;
    height: 100%;
    position: absolute;
  }
`;
const Title = styled.p`
  font-size: 1.3em;
  display: inline-block;
  margin: 0;
  padding-top: 12px;
`;

const SubWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  margin-bottom: 20px;
`;
const Text = styled.div`
  margin-left: 30px;
  width: 100%;
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
const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;
const PostHeader = props => {
  const {
    _id,
    votes,
    currentUserVote,
    title,
    author,
    content,
    date
  } = props.post;
  const imagePath = config.PROFILE_IMG_PATH + props.post.author.imagePath;

 
  return (
    <>
      <Wrapper>
        <SubWrapper>
          <AccountWrapper>
            <div style={{ paddingBottom: "30px", paddingRight: "15px" }}>
              <VotePost
                postID={_id}
                votes={votes}
                currentUserVote={currentUserVote}
              />
            </div>

            <BadgeWrapper>
              <ImgWrapper>
                <img src={imagePath} />
                <Overlay>
                  <HollowButtonWrapper>
                    <button onClick={() => props.followUser()}>
                      Follow
                    </button>
                  </HollowButtonWrapper>
                </Overlay>
              </ImgWrapper>
              <Information>{author.username}</Information>
            </BadgeWrapper>
          </AccountWrapper>
          <Text>
            <TitleWrapper>
              <Title>{title}</Title>
              <PostBadges post={props.post} />
            </TitleWrapper>
            {/* <p style={{ color: "grey" }}>{formatDate(date)}</p> */}
            <Content>{content}</Content>
          </Text>
        </SubWrapper>
      </Wrapper>
      <PostActions
        toggleCreateComment={props.toggleCreateComment}
        toggleSavePost={props.toggleSavePost}
        isSavedPost={props.post.isSavedPost}
      />
    </>
  );
};

export default PostHeader;
