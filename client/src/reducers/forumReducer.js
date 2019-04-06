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
    case TYPES.FETCH_POSTS_BY_TOPIC_REQUEST:
    case TYPES.FETCH_POST_REQUEST:
      return { ...state, isLoading: true };
    case TYPES.CREATE_COMMENT_ERROR:
    case TYPES.REMOVE_COMMENT_ERROR:
    case TYPES.CREATE_POST_ERROR:
    case TYPES.REMOVE_POST_ERROR:
    case TYPES.FETCH_FORUM_HEADRS_ERROR:
    case TYPES.FETCH_POSTS_BY_TOPIC_ERROR:
    case TYPES.FETCH_POST_ERROR:
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
    case TYPES.FETCH_POST_SUCCESS:
      return {...state, currentPost: action.payload}
    case TYPES.FETCH_FORUM_HEADRS_SUCCESS:
      return { ...state, headers: action.payload };
    case TYPES.FETCH_POSTS_BY_TOPIC_SUCCESS: 
      return {...state, posts: action.payload}
    case TYPES.VOTE_POST_SUCCESS: 
      const userID = require('jsonwebtoken').decode(localStorage.token)._id
      console.log('action payload: '); //PostID, voteType
      console.log(action.payload);
      const {postID, voteType} = action.payload;

      const voteInt = voteType == 'up' ? 1 : -1;
      // const post = state.posts.find(post => {
      //   return post._id == postID
      // })
      // console.log('post: (in reducer)');
      // console.log(post);
      // //if user hasnt voted before
      // if(post.currentUserVote == undefined)
      //   post.currentUserVote = voteType;
      // console.log('currentUserVote: ');
      // console.log(currentUserVote);     

      const newPosts = state.posts.map(post => {
        if(post._id == postID) {
          //if user hasnt voted before, count his vote
          if(post.currentUserVote == undefined) {
            console.log('user hasnt voted')
            post.currentUserVote = voteType;
            post.votes += voteInt
          }
          //if user HAS voted before, now he re-votes
          else {
            //if user votes same twice, cancel his vote
            if(post.currentUserVote == voteType) {
              console.log('user already voted, votes the same again')
              post.currentUserVote = undefined;
              post.votes -= voteInt
            }
            //user votes one thing, and then re-votes the other
            else {
              console.log('user already voted, votes the opposite now')
              post.currentUserVote = voteType;
              post.votes += voteInt * 2
            }
          }
          return post
        }
        
        else return post;
      })
      return {...state, posts: newPosts}
    default:
      return state;
  }
};

export default forumReducer;
