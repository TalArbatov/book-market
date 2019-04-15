import React, { useState } from "react";
import styled from "styled-components";
import { Switch, Route, Link } from "react-router-dom";
import ViewPosts from "./ViewPosts/ViewPosts";
import CreatePost from "./CreatePost";
import { connect } from "react-redux";
import * as ACTIONS from "../../actions/forumActions";
import ViewTopic from "./ViewTopic/ViewTopic";
import ViewPost from ".//ViewPost/ViewPost";
import { withRouter } from "react-router-dom";
import Button from "../shared/Button";

const ButtonArrayWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

class Forum extends React.PureComponent {
  componentDidMount() {
    this.props.fetchForumHeaders();
  }
  render() {
    return (
      <div>
        <Switch>
          {/* <Route exact path="/forum/view" component={ViewPosts} /> */}

          <Route exact path="/forum" component={ViewPosts} />
          <Route exact path="/forum/new" component={CreatePost} />
          <Route exact path="/forum/view/:topic" component={ViewTopic} />
          <Route path="/forum/view/:topic/:_id" component={ViewPost} />
        </Switch>
        <br />
        <br />
        <br />
        <div style={{ width: "100%" }}>
          {/* <Link to="/forum/view">View Posts</Link> */}
          <ButtonArrayWrapper>
              <Link to="/forum/new">
                <Button>New Post</Button>
              </Link>
              <Button
                onClick={() => {
                  this.props.history.goBack();
                }}
              >
                Back
              </Button>
          </ButtonArrayWrapper>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    forumReducer: state.forumReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchForumHeaders: () => dispatch(ACTIONS.fetchForumHeaders())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Forum)
);
