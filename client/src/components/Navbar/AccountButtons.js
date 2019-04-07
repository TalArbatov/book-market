import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { PromiseProvider } from "mongoose";

const Wrapper = styled.div`
display:inline-block;
height:100%;
display:flex;
align-items:center;
ul {
  list-style-type: none;
  display:inline-block;
  margin:0;
  height:100%;
display:flex;
align-items:center;
}
li {
  display:inline-block;
  font-size:0.9em
  height:100%;
  display:flex;
  align-items:center;
  padding-right:10px;
  padding-left:10px;
  cursor:pointer;
}
li:first-child {
  cursor:default !important;
}
li:not:(:first-child) {
  
}
li:hover:not(:first-child) {
  background: #5a445c;
  transition:0.1s;
}
a {
  color: #efefef;
  text-decoration: none;
  height:100%;
  display:flex;
  align-items:center;
}
p {
  font-weight:bold;  
}
li > div {
  height:100%;
  display:flex;
  align-items:center;
}
`;

const AccountButtons = ({ user, authenticated, logout }) => {
  return (
    <Wrapper>
      <ul>
        {authenticated ? (
          <li>
            <p>Hello {user.firstName} {user.lastName}</p>
          </li>
        ) : (
          <li />
        )}

        <li>
          <Link to="/wishlist">Wishlist</Link>
        </li>
        <li>
          <Link to="/order-status">Order Status</Link>
        </li>
        <li>
          <Link to="/account">My Account</Link>
        </li>
        {authenticated ? (
          <li>
            <div onClick={logout}>Logout</div>
          </li>
        ) : (
          <li>
            <Link to="/login">Login / Signup</Link>
          </li>
        )}
      </ul>
    </Wrapper>
  );
};

export default AccountButtons;
