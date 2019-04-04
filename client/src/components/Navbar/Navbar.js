import React from "react";
import styled from "styled-components";
import NavbarButtons from "./NavbarButtons";
const Wrapper = styled.div`
  background: #4c394e;
  height: 50px;
  width: 100%;
  color: #efefef;
  display:flex;
  align-items:center;
`;
const leftButtons = [
  {
    title: "Home",
    path: "/"
  },
  {
    title: "Login",
    path: "/login"
  }
];

const Navbar = props => {
  return (
    <Wrapper>
      <NavbarButtons buttons={leftButtons} />
    </Wrapper>
  );
};

export default Navbar;
