import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import * as ACTIONS from "../../../actions/forumActions";
import formatDate from "../../../utils/formatDate";
import CreateComment from "./CreateComment";
import Comments from "./Comments";
import PostHeader from "./PostHeader";
import config from "../../../config";
import Modal from "react-modal";
import Login from "../../Auth/Login";

const PostContent = styled.div`
  height: 100%;
  width: 100%;

  padding: 40px;
  padding-bottom: 20px;
  padding-left: 15px;
`;
const MainWindow = styled.div`
  border-left: 5px solid #4c394e;
  background: #fff;
  width: 80vw;
  min-width: 400px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

class ViewPost extends React.PureComponent {
  //imagePath = config.PROFILE_IMG_PATH + this.props.forumReducer.currentPost.author.imagePath;
  state = {
    // formattedDate: "",
    toggleCreateComment: false,
    isLoginModalOpen: false
    // imagePath:
    //   config.PROFILE_IMG_PATH +
    //   this.props.forumReducer.currentPost.author.imagePath
  };
  componentDidMount() {
    this.props.fetchPost(this.props.match.params._id).then(res => {
      // this.setState({
      //   formattedDate: formatDate(this.props.forumReducer.currentPost.date)
      // });
    });
  }
  toggleCreateComment = () => {
    if (this.props.userReducer.authenticated) {
      const toggleCreateComment = this.state.toggleCreateComment;
      this.setState({ toggleCreateComment: !toggleCreateComment });
    } else {
      console.log("UNAUTHORIZED");
      const currentState = this.state;
      this.setState({ ...currentState, isLoginModalOpen: true });
    }
  };
  render() {
    const commentsNum = this.props.forumReducer.currentComments.length;

    const { _id, comments } = this.props.forumReducer.currentPost;

    return (
      <>
        <MainWindow>
          <PostContent>
            <PostHeader
              post={this.props.forumReducer.currentPost}
              toggleCreateComment={this.toggleCreateComment}
            />
          </PostContent>
        </MainWindow>
        <div
          style={{ display: this.state.toggleCreateComment ? "block" : "none" }}
        >
          <CreateComment postID={_id} />
        </div>
        <p>Comments ({commentsNum}):</p>

        {comments != null && (
          <Comments
            comments={this.props.forumReducer.currentComments}
            postID={_id}
          />
        )}
        <Modal
          isOpen={this.state.isLoginModalOpen}
          //onAfterOpen={this.afterOpenModal}
          onRequestClose={() => {
            setState({ ...this.state, isLoginModalOpen: false });
          }}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <p>Please log-in to vote on posts.</p>
          <Login />
          {/* <button
          onClick={() => {
            setState({ ...getState, isOpen: false });
          }}
        >
          Close
        </button> */}
        </Modal>
      </>
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
