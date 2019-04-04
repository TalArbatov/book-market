import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  a {
    color: #efefef;
    text-decoration: none;
    font-size: 1.2em;
    height: 100%;
    display: flex;
    align-items: center;
  }
  li {
    padding: 0 15px;
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  li:hover {
    background: #5a445c;
    transition: 0.1s;
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
