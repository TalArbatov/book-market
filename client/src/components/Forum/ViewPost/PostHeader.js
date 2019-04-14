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
  align-items: start;
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

const Content = styled.p`
white-space:pre-line;
`
const PostHeader = props => {
  return (
    <Wrapper>
      <SubWrapper>
        <AccountWrapper>
          <ImgWrapper>
            <img src={props.imagePath2} />
          </ImgWrapper>
          <Information>{props.author.username}</Information>
        </AccountWrapper>
        <Text>
          <Title>{props.title}</Title>
          <p>
            {props.formattedDate}
          </p>
          <Content>{props.content}</Content>
        </Text>
      </SubWrapper>
    </Wrapper>
  );
};

export default PostHeader;
