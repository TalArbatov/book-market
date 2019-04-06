import * as TYPES from "../actions/actionTypes";

const defaultState = {
  posts: [],
  currentPost: {},
  isLoading: false,
  headers: {}
};

const forumReducer = (state = defaultState, action) => {
  switch (action.type) {
    case TYPES.CREATE_POST_REQUEST:
    case TYPES.REMOVE_POST_REQUEST:
    case TYPES.CREATE_COMMENT_REQUEST:
    case TYPES.REMOVE_COMMENT_REQUEST:
    case TYPES.FETCH_FORUM_HEADRS_REQUEST:
      return { ...state, isLoading: true };
    case TYPES.CREATE_COMMENT_ERROR:
    case TYPES.REMOVE_COMMENT_ERROR:
    case TYPES.CREATE_POST_ERROR:
    case TYPES.REMOVE_POST_ERROR:
    case TYPES.FETCH_FORUM_HEADRS_ERROR:
      return { ...state, isLoading: false };
    case TYPES.CREATE_POST_SUCCESS:
      console.log(action.payload.topic);
      const newHeaders = {
        ...state.headers,
        [action.payload.topic]: {
          comments: state.headers[action.payload.topic].comments,
          posts: state.headers[action.payload.topic].posts + 1
        }
      };
      return {
        ...state,
        posts: [...state.posts, action.payload],
        headers: newHeaders
      };
    case TYPES.FETCH_FORUM_HEADRS_SUCCESS:
      return { ...state, headers: action.payload };
    default:
      return state;
  }
};

export default forumReducer;
