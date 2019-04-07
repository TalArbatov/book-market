import React, { useState } from "react";
import styled from "styled-components";
import { Switch, Route, Link } from "react-router-dom";
import ViewPosts from "./ViewPosts/ViewPosts";
import CreatePost from "./CreatePost";
import {connect} from 'react-redux';
import * as ACTIONS from '../../actions/forumActions';
import ViewTopic from './ViewTopic/ViewTopic';
import ViewPost from './/ViewPost/ViewPost'
import {withRouter} from 'react-router-dom'
const MainWindow = styled.div`
  border-left: 5px solid #4c394e;
  background: #fff;
  width: 80vw;
  min-width: 400px;
  min-height: 50vh;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;
class Forum extends React.PureComponent {
  componentDidMount() {
    this.props.fetchForumHeaders();
  }
  render() {
    return (
      <div>
        <MainWindow>
          <Switch>
          <Route exact path="/forum/view" component={ViewPosts} />

            <Route exact path="/" component={ViewPosts} />
            <Route path="/forum/new" component={CreatePost} />
            <Route exact path="/forum/view/:topic" component={ViewTopic} />
            <Route path="/forum/view/:topic/:_id" component={ViewPost} />
          </Switch>
          <br />
          <br />
          <br />
          <div style={{ width: "100%" }}>
            <Link to="/forum/view">View Posts</Link>
            <Link to="/forum/new">New Post</Link>
            <p onClick={() => {this.props.history.goBack()}}>Back</p>
          </div>
        </MainWindow>
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
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Forum));
