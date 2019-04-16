const Post = require("mongoose").model("Post");
const User = require("mongoose").model("User");
module.exports = {
  handlePost: (post, userID) => {
    //1. add currentUserVote
    let newPost = { ...post, currentUserVote: null };
    const userVote = post.voters.find(voter => {
      return voter._id == userID;
    });
    if (userVote != null && userVote != undefined)
      newPost.currentUserVote = userVote.voteType;


  },
  handlePost2: (post, userID) => {
    //  return new Promise(resolve => {
    //1. add currentUserVote
    let newPost = { ...post, currentUserVote: null };
    const userVote = post.voters.find(voter => {
      return voter._id == userID;
    });
    if (userVote != null && userVote != undefined)
      newPost.currentUserVote = userVote.voteType;
    //1.5 delete voters (sensitive data)
    delete newPost.voters;


    return newPost;
    //});
  },
  //HANDLES POST DATA
  //deletes all sensitive data from post
  //and adds, relavent, safe data
  handlePost3: (post, user) => {

    // 1. add currentUserVote
    let newPost = { ...post, currentUserVote: null };
    const userVote = post.voters.find(voter => {
      return voter._id == user._id;
    });
    if (userVote != null && userVote != undefined)
      newPost.currentUserVote = userVote.voteType;

    // 2. add isSavedPost
    const isSavedPost = user.forum.savedPosts.find(savedPost => {
      return savedPost.toString() == post._id;
    });
    console.log('isSavedPost: ' + isSavedPost);
    newPost.isSavedPost = isSavedPost != null;    
    
    // 3. add isSubmittedPost
    const isSubmittedPost = user.forum.submittedPosts.find(submittedPost => {
      return submittedPost._id == post._id;
    });
    newPost.isSubmittedPost = isSubmittedPost != null;

    // 4. delete voters
    delete newPost.voters;

    // TODO: add userHandler to delete all sensitive data
    //delete user.forum.savedPosts
    //delete user.forum.submittedPosts

    return newPost;
  }
};
