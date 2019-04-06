import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const StyledTr = styled.tr`
  background: #efefef;
  box-shadow: 1px 1px black;
  td {
    padding-left: 25px;
  }
  p ,a{
    color:black;
    text-decoration:none;
  }
  p:first-child {
    font-weight:600;
    font-size:1.1em;
    color:#0000b7;
  }
  p:nth-child(2) {
    font-size:0.9em;
    padding-left:20px;
  }
`;

const Topic = props => {
  const { title, subtitle, address } = props.topic;
  console.log(address)
  //console.log('on topic: ' + props.forumReducer.headers[address].posts)
  //type = "posts" || "comments"
  const getNum = type => {
    try {
      return props.forumReducer.headers[address][type];
    } catch (e) {
      return "0";
    }
  };

  return (
    <StyledTr>
      <td>
        <Link to={`/forum/view/topic/${address}`}>
          <p>{title}</p>
        </Link>
        <p>{subtitle}</p>
      </td>
      <td>{getNum("posts")}</td>
      <td>{getNum("comments")}</td>
    </StyledTr>
  );
};

const mapStateToProps = state => {
  return {
    forumReducer: state.forumReducer
  };
};

export default connect(mapStateToProps)(Topic);
