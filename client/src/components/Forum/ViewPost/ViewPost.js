import React from 'react';
import styled from 'styled-components'
import {connect} from 'react-redux';
import * as ACTIONS from '../../../actions/forumActions';
import formatDate from '../../../utils/formatDate';

class ViewPost extends React.PureComponent {
  state = {
    formattedDate: ''
  }
  componentDidMount() {
    this.props.fetchPost(this.props.match.params._id).then(res => {
      this.setState({formattedDate: formatDate(this.props.forumReducer.currentPost.date)})
    });
  }

  render() {
  const {title, content, authorHeader, topic, date} = this.props.forumReducer.currentPost

  return(
    <div>
      <h1>Title {title}</h1>
      <p>Posted by {authorHeader}, at {this.state.formattedDate}</p>
      <p style={{whiteSpace: 'pre-line'}}>Content: {content}</p>
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

