import React from "react";
import NavbarButton from "./NavbarButton";
import styled from "styled-components";


const Wrapper = styled.div`
height:100%;
align-items:center;
display:flex;
  ul {
    list-style-type: none;
    margin:0;
    display:inline-block;
    max-width:50%;
    display: flex;
    flex-direction: row;
    flex-wrap: no-wrap;
    justify-content: left;
    height:100%;
    align-items:center;


  }
  
`;
const NavbarButtons = ({ buttons }) => {
  return (
    <Wrapper>
      <ul>
        {buttons.map((button, index) => {
          return <NavbarButton key={index} button={button} />;
        })}
      </ul>
    </Wrapper>
  );
};

export default NavbarButtons;
