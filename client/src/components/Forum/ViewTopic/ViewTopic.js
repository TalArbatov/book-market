import React from "react";
import { connect } from "react-redux";
import * as ACTIONS from "../../../actions/forumActions";
import PostPreviewList from "./PostPreviewList";
import { Link } from "react-router-dom";
class ViewTopic extends React.PureComponent {
  //  topic = this.props.match.params.topic;
  componentDidMount() {
    this.props.fetchPostsByTopic(this.props.match.params.topic).then(res => {
      if (res.success) {
        this.setState({ posts: res.payload });
      }
    });
  }

  state = {
    posts: []
  };

  render() {
    return (
      <div>
        <h1>View Topic {this.props.match.params.topic}</h1>
        <PostPreviewList posts={this.state.posts} />
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
    fetchPostsByTopic: topic => dispatch(ACTIONS.fetchPostsByTopic(topic))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewTopic);
