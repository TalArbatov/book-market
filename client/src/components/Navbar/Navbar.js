import React from "react";
import styled from "styled-components";
import NavbarButtons from "./NavbarButtons";
import { connect } from "react-redux";
import AccountButtons from './AccountButtons';

const Wrapper = styled.div`
  background: #4c394e;
  height: 50px;
  width: 100%;
  color: #efefef;
  display: flex;
  align-items: center;
`;

const ButtonWrapper = styled.div`
width:100%;
display: flex;
flex-direction:row;
justify-content: space-between;
height:100%;
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
      <ButtonWrapper>
        <NavbarButtons buttons={leftButtons} />
        <AccountButtons user={{authenticated:true}}/>
      </ButtonWrapper>
    </Wrapper>
  );
};

const mapStateToProps = state => {
  return {
    userReducer: state.userReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
