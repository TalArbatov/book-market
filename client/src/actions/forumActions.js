import * as TYPES from './actionTypes';
import axios from "axios";
export const createPost = (form) => {
  return dispatch => {
    dispatch(createPostRequest())
    return axios.post('/api/forum', {form, token: localStorage.token}).then(res => {
      console.log('created post successfully!')
      console.log(res.data);
      dispatch(createPostSuccess(res.data.payload));
      return {success: true}

    }).catch(err => {
      console.log('err: ' + err)
      dispatch(createPostError());
      // console.log(err)
      // if(err.status == 401) {
      //   return {success: false, error: 'Unauthorized, please log in.'}
      // }
      // else if (err.status == 500) return {success: false, err: 'A problem accoured while posting.'}
      return {success: false, error: err.toString()}
    })
  }
}

export const createPostRequest = () => {
  return {
    type:TYPES.CREATE_POST_REQUEST
  }
}
export const createPostSuccess = (post) => {
  return {
    type:TYPES.CREATE_POST_SUCCESS,
    payload: post
  }
}
export const createPostError = () => {
  return {
    type:TYPES.CREATE_POST_ERROR
  }
}

export const fetchForumHeaders = () => {
  return dispatch => {
    dispatch(fetchHeadersRequest())
    axios.get('/api/forum/getHeaders').then(res => {
      console.log(res.data.payload)
      //TODO: complete
      dispatch(fetchHeadersSuccess(res.data.payload))
    }).catch(err => {
      dispatch(fetchHeadersError())
    })
  }
}

export const fetchHeadersRequest = () => {
  return {
    type: TYPES.FETCH_FORUM_HEADRS_REQUEST
  }
}
export const fetchHeadersSuccess = (headers) => {
  return {
    type: TYPES.FETCH_FORUM_HEADRS_SUCCESS,
    payload: headers
  }
}
export const fetchHeadersError = () => {
  return {
    type: TYPES.FETCH_FORUM_HEADRS_ERROR
  }
}

export const fetchPostsByTopic = (topic) => {
  return dispatch => {
    dispatch(fetchPostsByTopicRequest())
    return axios.get('/api/forum/fetchPostsByTopic/' + topic).then(res => {
      console.log(res);
      dispatch(fetchPostsByTopicSuccess(res))
      return {success: true, payload: res.data}
    }).catch(e => {
      dispatch(fetchPostsByTopicError())
      return {success: false, payload: e}
    })
  }
}

export const fetchPostsByTopicRequest = () => {
  return {
    type: TYPES.FETCH_POSTS_BY_TOPIC_REQUEST
  }
}
export const fetchPostsByTopicError = () => {
  return {
    type: TYPES.FETCH_POSTS_BY_TOPIC_ERROR
  }
}
export const fetchPostsByTopicSuccess = (posts) => {
  return {
    type: TYPES.FETCH_POSTS_BY_TOPIC_SUCCESS,
    payload: posts
  }
}

export const fetchPost = _id => {
  return dispatch => {
    dispatch(fetchPostRequest());
    return axios.get('/api/forum/view/post/' + _id).then(res => {
      console.log(res.data);
      dispatch(fetchPostSuccess(res.data.payload));
      return {success: true}
    }).catch(err => {
      dispatch(fetchPostError());
      return {success: false, error: err}
    })
  }
}

export const fetchPostRequest = () => {
  return {
    type:TYPES.FETCH_POST_REQUEST
  }
}
export const fetchPostError = () => {
  return {
    type:TYPES.FETCH_POST_ERROR
  }
}
export const fetchPostSuccess = (post) => {
  return {
    type:TYPES.FETCH_POST_SUCCESS,
    payload:post
  }
}