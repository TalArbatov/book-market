import React from "react";
import styled from "styled-components";
import HeaderButton from "./HeaderButton";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  background: #7f5c82;
  margin-bottom: 55px;
  height: 55px;
  width: 100%;
`;

const Header = props => {
  return (
    <Wrapper>
      <HeaderButton
        openLoginModal={props.openLoginModal}
        fetchTopicPosts={props.fetchTopicPosts}
        fetchSavedPosts={props.fetchSavedPosts}
      />
    </Wrapper>
  );
};

export default Header;
