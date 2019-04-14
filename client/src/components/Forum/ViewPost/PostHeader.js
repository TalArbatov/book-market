import React from "react";
import styled from "styled-components";

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
`;

const SubWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Text = styled.div`
  margin-left: 60px;
`;
const Information = styled.p`
  color: grey;
  text-align:center;
`;
const Wrapper = styled.div``;

const AccountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const PostHeader = props => {
  return (
    <Wrapper>
      <SubWrapper>
        <AccountWrapper>
          <ImgWrapper>
            <img src={props.imagePath} />
          </ImgWrapper>
          <Information>{props.authorHeader}</Information>
        </AccountWrapper>
        <Text>
          <Title>{props.title}</Title>
          <Information>
            Posted by {props.authorHeader}, at {props.formattedDate}
          </Information>
        </Text>
      </SubWrapper>
    </Wrapper>
  );
};

export default PostHeader;
