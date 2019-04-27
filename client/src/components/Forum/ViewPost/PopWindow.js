import React, { useState } from "react";
import styled from "styled-components";
import ThreeDRotation from "@material-ui/icons/ThreeDRotation";
import MoreVert from "@material-ui/icons/MoreVert";
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import { connect } from "react-redux";
import * as ACTIONS from "../../../actions/forumActions";
import { withRouter } from "react-router-dom";
const PopWindow = props => {
  const [getState, setState] = useState({
    isPopoverOpen: false,
    mouseX: 0,
    mouseY: 0
  });
  const openPopup = e => {
    setState({
      ...getState,
      isPopoverOpen: true,
      mouseX: e.pageX,
      mouseY: e.pageY
    });
    console.log(getState);
  };

  const closePopup = () => {
    setState({ ...getState, isPopoverOpen: false });
    console.log(getState);
  };

  const deletePost = () => {
    const postID = props.post._id;
    props.deletePost(postID).then(res => {
      if (res.success) {
        props.history.push("/forum");
      } else {
        console.error("Problem while deleting post...");
      }
    });
  };

  return (
    <div>
      <IconButton onClick={openPopup}>
        <MoreVert />
      </IconButton>
      <Popover
        open={getState.isPopoverOpen}
        //anchorEl={this.anchorEl}
        //anchorReference={anchorReference}
        anchorPosition={{ top: getState.mouseY, left: getState.mouseX }}
        onClose={closePopup}
        anchorOrigin={{
          vertical: getState.mouseY,
          horizontal: getState.mouseX
        }}
        // transformOrigin={{
        //   vertical: transformOriginVertical,
        //   horizontal: transformOriginHorizontal,
      >
        <List component="nav">
          {props.post.isSubmittedPost ? (
            <ListItem button onClick={deletePost}>
              <ListItemText primary="Delete Post" />
            </ListItem>
          ) : (
            <></>
          )}

          <Divider />
          <ListItem button divider>
            <ListItemText primary="Drafts" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Trash" />
          </ListItem>
          <Divider light />
          <ListItem button>
            <ListItemText primary="Spam" />
          </ListItem>
        </List>
      </Popover>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    forumReducer: state.forumReducer,
    userReducer: state.userReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deletePost: postID => dispatch(ACTIONS.deletePost(postID))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PopWindow)
);
