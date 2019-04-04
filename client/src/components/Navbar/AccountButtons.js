import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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

}
p {
  font-weight:bold;  
}
`;

const AccountButtons = ({ user }) => {
  return (
    <Wrapper>
      <ul>
        {user.authenticated ? (
          <li>
            <p>Hello New User</p>
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
          <Link to="/wishlist">My Account</Link>
        </li>
        {user.authenticated ? (
          <li>
            <Link to="/">Logout</Link>
          </li>
        ) : (
          <li>
            <Link to="/login">Login/Signup</Link>
          </li>
        )}
      </ul>
    </Wrapper>
  );
};

export default AccountButtons;
