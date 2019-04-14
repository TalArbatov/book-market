import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import * as ACTIONS from "../../../actions/forumActions";
import formatDate from "../../../utils/formatDate";
import CreateComment from "./CreateComment";
import Comments from "./Comments";
import PostHeader from "./PostHeader";
import config from "../../../config";


const PostContent = styled.div`
  height:100%;
  width:100%;
  padding:60px;
  padding-left:45px;
`


class ViewPost extends React.PureComponent {
 imagePath =
  config.PROFILE_IMG_PATH + this.props.userReducer.user.profileImage.filename;

  state = {
    formattedDate: ""
  };
  componentDidMount() {
    this.props.fetchPost(this.props.match.params._id).then(res => {
      this.setState({
        formattedDate: formatDate(this.props.forumReducer.currentPost.date)
      });
    });
  }

  render() {
    const {
      title,
      content,
      authorHeader,
      topic,
      date,
      _id,
      comments
    } = this.props.forumReducer.currentPost;

    return (
      <PostContent>
        <PostHeader imagePath={this.imagePath} title={title} authorHeader={authorHeader} formattedDate={this.state.formattedDate}/>

        <p style={{ whiteSpace: "pre-line" }}>Content: {content}</p>
        <p>Author: {authorHeader}</p>
        <p>Topic: {topic}</p>
        <CreateComment postID={_id} />
        {comments != null && (
          <Comments
            comments={this.props.forumReducer.currentComments}
            postID={_id}
          />
        )}
      </PostContent>
    );
  }
}

const mapStateToProps = state => {
  return {
    forumReducer: state.forumReducer,
    userReducer: state.userReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPost: _id => dispatch(ACTIONS.fetchPost(_id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewPost);
