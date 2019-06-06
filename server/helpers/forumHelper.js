const Post = require("mongoose").model("Post");
const User = require("mongoose").model("User");

const handlePostLoggedOut = post => {
  // 1. add currentUserVote
  let newPost = { ...post, currentUserVote: null };

  // 2. add isSavedPost
  newPost.isSavedPost = false;
  // 3. add isSubmittedPost
  newPost.isSubmittedPost = false;

  // 4. delete voters
  delete newPost.voters;
  // 5. remove posts that are labled as deleted
  if (newPost.isDeleted) return null;
  return newPost;

  // TODO: add userHandler to delete all sensitive data
  //delete user.forum.savedPosts
  //delete user.forum.submittedPosts
};

const handlePostLoggedIn = (post, user) => {
  // 1. add currentUserVote
  try {
  let newPost = { ...post, currentUserVote: null };
  const userVote = post.voters.find(voter => {
    return voter._id == user._id;
  });
  if (userVote != null && userVote != undefined)
    newPost.currentUserVote = userVote.voteType;

  // 2. add isSavedPost
  const isSavedPost = user.forum.savedPosts.find(savedPost => {
    return savedPost.post.toString() == post._id;
  });
  console.log("isSavedPost: " + isSavedPost);
  newPost.isSavedPost = isSavedPost != null;
} catch(e){}
  try {
    newPost.dateSaved = isSavedPost.dateSaved;
  } catch (e) {}
  // 3. add isSubmittedPost
  const isSubmittedPost = user.forum.submittedPosts.find(submittedPost => {
    return submittedPost.toString() == post._id;
  });
  console.log("isSubmittedPost:");
  console.log(isSubmittedPost);
  newPost.isSubmittedPost = isSubmittedPost != null;

  // 4. delete voters
  delete newPost.voters;
  // 5. remove posts that are labled as deleted
  if (newPost.isDeleted) return null;
  return newPost;

  // TODO: add userHandler to delete all sensitive data
  //delete user.forum.savedPosts
  //delete user.forum.submittedPosts
};

const handlePostArrayLoggedIn = (posts, user) => {
  
  const newPosts = posts.map(post => {
    //return this.handlePostLoggedIn(post._doc, user);
    return handlePostLoggedIn(post._doc, user);
  });
  const existingPosts = newPosts.filter(post => {
    return post != null;
  });
  return existingPosts;
};
const handlePostArrayLoggedOut = posts => {
  const newPosts = posts.map(post => {
    return handlePostLoggedOut(post._doc);
  });
  const existingPosts = newPosts.filter(post => {
    return post != null;
  });
  return existingPosts;
};

const handlePosts = (posts, userID) => {

}

module.exports = {
  handlePostLoggedIn: handlePostLoggedIn,
  handlePostLoggedOut: handlePostLoggedOut,
  handlePostArrayLoggedIn: handlePostArrayLoggedIn,
  handlePostArrayLoggedOut: handlePostArrayLoggedOut
};
