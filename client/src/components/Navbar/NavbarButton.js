import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
display:inline-block;
margin-left:18px;
height:100%;
  a {
    color: #efefef;
    text-decoration: none;
    font-size:1.2em
  }
  li {
    display: inline-block;
  }
`;
const NavbarButton = ({ button }) => {
  return (
    <Wrapper>
      <li>
        <Link to={button.path}>{button.title}</Link>
      </li>
    </Wrapper>
  );
};

export default NavbarButton;
