import * as TYPES from "../actions/actionTypes";

const defaultState = {
  posts: [],
  currentPost: {
    author: {
      imagePath: '/default.jpg'
    }
  },
  isLoading: false,
  headers: {},
  currentComments: []
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
    case TYPES.FETCH_COMMENTS_REQUEST:
      return { ...state, isLoading: true };
    case TYPES.CREATE_COMMENT_ERROR:
    case TYPES.REMOVE_COMMENT_ERROR:
    case TYPES.CREATE_POST_ERROR:
    case TYPES.REMOVE_POST_ERROR:
    case TYPES.FETCH_FORUM_HEADRS_ERROR:
    case TYPES.FETCH_POSTS_BY_TOPIC_ERROR:
    case TYPES.FETCH_POST_ERROR:
    case TYPES.FETCH_COMMENTS_ERROR:
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
      return { ...state, currentPost: action.payload };
    case TYPES.FETCH_FORUM_HEADRS_SUCCESS:
      return { ...state, headers: action.payload };
    case TYPES.FETCH_POSTS_BY_TOPIC_SUCCESS:
      return { ...state, posts: action.payload };
    case TYPES.VOTE_POST_SUCCESS:
      //const userID = require("jsonwebtoken").decode(localStorage.token)._id;
      const newCurrentPost = {...state.currentPost}
      console.log("action payload: "); //PostID, voteType
      console.log(action.payload);
      const { postID, voteType } = action.payload;

      const voteInt = voteType == "up" ? 1 : -1;
      const newPosts = state.posts.map(post => {
        if (post._id == postID) {
          //if user hasnt voted before, count his vote
          if (post.currentUserVote == undefined) {
            console.log("user hasnt voted");
            post.currentUserVote = voteType;
            post.votes += voteInt;

            newCurrentPost.currentUserVote = voteType;
            newCurrentPost.votes += voteInt
          }
          //if user HAS voted before, now he re-votes
          else {
            //if user votes same twice, cancel his vote
            if (post.currentUserVote == voteType) {
              console.log("user already voted, votes the same again");
              post.currentUserVote = undefined;
              post.votes -= voteInt;
              newCurrentPost.currentUserVote = undefined;
              newCurrentPost.votes -= voteInt;


            }
            //user votes one thing, and then re-votes the other
            else {
              console.log("user already voted, votes the opposite now");
              post.currentUserVote = voteType;
              post.votes += voteInt * 2;

              newCurrentPost.currentUserVote = voteType;
              newCurrentPost.votes += voteInt * 2;

            }
          }
          return post;
        } else return post;
      });
      return { ...state, posts: newPosts, currentPost: newCurrentPost };
    case TYPES.VOTE_COMMENT_SUCCESS:
      //const userID2 = require("jsonwebtoken").decode(localStorage.token)._id;
      //const { commentID, voteType } = action.payload;
      const commentID = action.commentID;
      const voteType2 = action.voteType
      const voteInt2 = voteType2 == "up" ? 1 : -1;
      const newComments = state.currentComments.map(comment => {
        if (comment._id == commentID) {
          //if user hasnt voted before, count his vote
          if (comment.currentUserVote == undefined) {
            console.log("user hasnt voted");
            comment.currentUserVote = voteType2;
            comment.votes += voteInt2;
          }
          //if user HAS voted before, now he re-votes
          else {
            //if user votes same twice, cancel his vote
            if (comment.currentUserVote == voteType2) {
              console.log("user already voted on comment, votes the same again");
              comment.currentUserVote = undefined;
              comment.votes -= voteInt2;
            }
            //user votes one thing, and then re-votes the other
            else {
              console.log("user already voted on comment, votes the opposite now");
              comment.currentUserVote = voteType2;
              comment.votes += voteInt2 * 2;
            }
          }
          return comment;
        } else return comment;
      });
      return { ...state, posts: newPosts };
    case TYPES.FETCH_COMMENTS_SUCCESS:
      return { ...state, currentComments: action.payload };
    case TYPES.ADD_COMMENT_SUCCESS:
      return {...state, currentComments: [action.payload, ...state.currentComments]}
    default:
      return state;
  }
};

export default forumReducer;
