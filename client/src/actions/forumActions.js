import * as TYPES from "./actionTypes";
import axios from "axios";
export const createPost = form => {
  return dispatch => {
    dispatch(createPostRequest());
    return axios
      .post("/api/forum", { form, token: localStorage.token })
      .then(res => {
        console.log("created post successfully!");
        console.log(res.data);
        dispatch(createPostSuccess(res.data.payload));
        return { success: true };
      })
      .catch(err => {
        console.log("err: " + err);
        dispatch(createPostError());
        // console.log(err)
        // if(err.status == 401) {
        //   return {success: false, error: 'Unauthorized, please log in.'}
        // }
        // else if (err.status == 500) return {success: false, err: 'A problem accoured while posting.'}
        return { success: false, error: err.toString() };
      });
  };
};

export const createPostRequest = () => {
  return {
    type: TYPES.CREATE_POST_REQUEST
  };
};
export const createPostSuccess = post => {
  return {
    type: TYPES.CREATE_POST_SUCCESS,
    payload: post
  };
};
export const createPostError = () => {
  return {
    type: TYPES.CREATE_POST_ERROR
  };
};

export const fetchForumHeaders = () => {
  return dispatch => {
    dispatch(fetchHeadersRequest());
    axios
      .get("/api/forum/getHeaders")
      .then(res => {
        console.log(res.data.payload);
        //TODO: complete
        dispatch(fetchHeadersSuccess(res.data.payload));
      })
      .catch(err => {
        dispatch(fetchHeadersError());
      });
  };
};

export const fetchHeadersRequest = () => {
  return {
    type: TYPES.FETCH_FORUM_HEADRS_REQUEST
  };
};
export const fetchHeadersSuccess = headers => {
  return {
    type: TYPES.FETCH_FORUM_HEADRS_SUCCESS,
    payload: headers
  };
};
export const fetchHeadersError = () => {
  return {
    type: TYPES.FETCH_FORUM_HEADRS_ERROR
  };
};

export const fetchPostsByTopic = topic => {
  return dispatch => {
    dispatch(fetchPostsByTopicRequest());
    const token = localStorage.token;
    return axios
      .post("/api/forum/fetchPostsByTopic/" + topic, { token })
      .then(res => {
        console.log(res);
        dispatch(fetchPostsByTopicSuccess(res.data));
        return { success: true, payload: res.data };
      })
      .catch(e => {
        dispatch(fetchPostsByTopicError());
        return { success: false, payload: e };
      });
  };
};

export const fetchPostsByTopicRequest = () => {
  return {
    type: TYPES.FETCH_POSTS_BY_TOPIC_REQUEST
  };
};
export const fetchPostsByTopicError = () => {
  return {
    type: TYPES.FETCH_POSTS_BY_TOPIC_ERROR
  };
};
export const fetchPostsByTopicSuccess = posts => {
  return {
    type: TYPES.FETCH_POSTS_BY_TOPIC_SUCCESS,
    payload: posts
  };
};

export const fetchPost = _id => {
  return dispatch => {
    dispatch(fetchPostRequest());
    return axios
      .get("/api/forum/view/post/" + _id)
      .then(res => {
        console.log(res.data);
        dispatch(fetchPostSuccess(res.data.payload));
        dispatch(fetchComments(_id))
        return { success: true };
      })
      .catch(err => {
        dispatch(fetchPostError());
        return { success: false, error: err };
      });
  };
};

export const fetchPostRequest = () => {
  return {
    type: TYPES.FETCH_POST_REQUEST
  };
};
export const fetchPostError = () => {
  return {
    type: TYPES.FETCH_POST_ERROR
  };
};
export const fetchPostSuccess = post => {
  return {
    type: TYPES.FETCH_POST_SUCCESS,
    payload: post
  };
};
export const voteComment = ( commentID, voteType) => {
  //  const {postID, commentID, token, voteType} = req.body;
  return dispatch => {
    const data = {
      commentID,
      voteType,
      token: localStorage.token
    }
    dispatch(votePostRequest());
    axios.post('/api/forum/voteComment', data).then(res => {
      console.log(res.data);
      dispatch(voteCommentSuccess(commentID, voteType));
      return {success: true};
    }).catch(err => {
      console.log(err)
      dispatch(voteCommentError());
      return {success: false}
    })
  }
  
};

export const voteCommentSuccess = (commentID, voteType) => {
  return {
    type: TYPES.VOTE_COMMENT_SUCCESS,
    commentID,
    voteType
  };
};
export const voteCommentError = () => {
  return {
    type: TYPES.VOTE_COMMENT_ERROR
  };
};
export const voteCommentRequest = () => {
  return {
    type: TYPES.VOTE_COMMENT_REQUEST
  };
};

export const votePost = (postID, voteType) => {
  return dispatch => {
    dispatch(votePostRequest());
    const data = {
      token: localStorage.token,
      postID: postID,
      voteType: voteType
    };
    console.log(data);
    return axios
      .post("/api/forum/votePost", data)
      .then(res => {
        console.log(res.data);
        dispatch(votePostSuccess(postID, voteType));
        return { success: true };
      })
      .catch(err => {
        console.warn(err);
        dispatch(votePostError());
        return { success: false, error: err };
      });
  };
};

export const votePostSuccess = (postID, voteType) => {
  return {
    type: TYPES.VOTE_POST_SUCCESS,
    payload: {
      postID,
      voteType
    }
  };
};
export const votePostError = () => {
  return {
    type: TYPES.VOTE_POST_ERROR
  };
};

export const votePostRequest = () => {
  return {
    type: TYPES.VOTE_POST_REQUEST
  };
};

export const addComment = (comment, postID) => {
  //author: {_id, image}
  return dispatch => {
    dispatch(addCommentRequest());
    return axios
      .post("/api/forum/comments/" + postID, comment)
      .then(res => {
        console.log(res.data);
        dispatch(fetchPost(postID));
        dispatch(addCommentSuccess());
      })
      .catch(err => {
        console.warn(err);
        dispatch(addCommentError());
      });
  };
};

export const addCommentRequest = () => {
  return {
    type: TYPES.ADD_COMMENT_REQUEST
  };
};
export const addCommentError = () => {
  return {
    type: TYPES.ADD_COMMENT_ERROR
  };
};
export const addCommentSuccess = () => {
  return {
    type: TYPES.ADD_COMMENT_SUCCESS
  };
};

export const fetchComments = (postID) => {
  return dispatch => {
    dispatch(fetchCommentsRequest());
    const token = localStorage.token
    axios.post('/api/forum/comments/' + postID, {token}).then(res => {
      if(res.data.success) {
        console.log('success at fetchComments:')
        console.log(res.data);
        dispatch(fetchCommentsSuccess(res.data.payload));
        return {success: true}
      }
      else {
        console.log('error in fetchComments: ' + res.data.payload);
        dispatch(fetchCommentsError())
        return {success: false}
      }
    })
  }
}

export const fetchCommentsSuccess = (comments) => {
  return {
    type: TYPES.FETCH_COMMENTS_SUCCESS,
    payload: comments
  }
}
export const fetchCommentsError = () => {
  return {
    type: TYPES.FETCH_COMMENTS_ERROR
  }
}
export const fetchCommentsRequest = () => {
  return {
    type: TYPES.FETCH_COMMENTS_REQUEST
  }
}