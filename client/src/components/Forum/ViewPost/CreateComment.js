import React, {useState} from 'react';
import styled from 'styled-components'
import {connect} from 'react-redux';
import * as ACTIONS from '../../../actions/forumActions';

const CreateComment = props => {
  const [getContent, setContent] = useState('')
  const contentChange = input => {
    setContent(input);
  }
  const submitComment = () => {
    const user = props.userReducer.user;
    const comment = {
      author: {
        _id: user._id,
        image: user.profileImage.filename
      },
      content: getContent,
      date: Date.now()
    }

    props.addComment(comment, props.postID);
  }

  return(
    <div>
      <input onChange={e => contentChange(e.target.value)} type='text'></input>
      <button onClick={submitComment}></button>
    </div>
  )
}
const mapStateToProps = state => {
  return {
    forumReducer: state.forumReducer,
    userReducer: state.userReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addComment: (comment, postID) => dispatch(ACTIONS.addComment(comment, postID))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateComment);

