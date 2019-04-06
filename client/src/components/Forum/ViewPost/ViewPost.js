import React from 'react';
import styled from 'styled-components'
import {connect} from 'react-redux';
import * as ACTIONS from '../../../actions/forumActions';

class ViewPost extends React.PureComponent {
  componentDidMount() {
    this.props.fetchPost(this.props.match.params._id);
  }

  render() {
  const {title, content, authorHeader, topic} = this.props.forumReducer.currentPost
  return(
    <div>
      <h1>View Post {this.props.match.params._id}</h1>
      <p>Title: {title}</p>
      <p>Content: {content}</p>
      <p>Author: {authorHeader}</p>
      <p>Topic: {topic}</p>
    </div>
  )
}
}

const mapStateToProps = state => {
  return {
    forumReducer: state.forumReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPost: (_id) => dispatch(ACTIONS.fetchPost(_id))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ViewPost);

