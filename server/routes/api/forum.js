const router = require("express").Router();
const Post = require("mongoose").model("Post");
const Comment = require("mongoose").model("Comment");
const passport = require("passport");
const User = require("mongoose").model("User");
const jwtAuth = passport.authenticate("jwt", { session: false });
const forumHelper = require("../../helpers/forumHelper");


router.get("/view/post/", (req, res, next) => {
  Post.find({}, (err, posts) => {
    if (posts) {
      res.status(200).send({ success: true, payload: posts });
    } else {
      console.log("Error in get.(/)");
      res.status(500).send({ success: false, payload: "Error in get.(/)" });
    }
  });
});

router.post("/view/post/:id", async (req, res, next) => {
  //fetchPost

  let userID = null;
  try {
    userID = require("jsonwebtoken").decode(req.body.token)._id;
  } catch (e) {}

  if (userID) {
    //if user logged in
    const postID = req.params.id;
    Post.findOne({ _id: postID }, (err1, post) => {
      if (err1) res.send({ success: false, payload: err1 });
      else {
        User.findOne({ _id: userID }, (err2, user) => {
          if (err2) res.send({ success: true, payload: err2 });
          else {
            const newPost = forumHelper.handlePostLoggedIn(post._doc, user);
            res.send({ success: true, payload: newPost });
          }
        });
      }
    });
  } else {
    //user logged out
    const postID = req.params.id;
    Post.findOne({ _id: postID }, (err1, post) => {
      if (err1) res.send({ success: false, payload: err1 });
      else {
        const newPost = forumHelper.handlePostLoggedOut(post._doc);
        res.send({ success: true, payload: newPost });
      }
    });
  }
});

router.post("/comments/:postID", (req, res, next) => {
  //fetch all comments on a single post
  const postID = req.params.postID;
  Comment.find({ postID: postID }, (err, comments) => {
    if (err) res.send({ success: false, payload: "cannot find comments" });
    else {
      //handle comment data
      //return if user voted the post
      //do not send voters array to client - sensitive data

      //if user not logged-in, token is empty, than dont return currentUserVote
      let userID = null;

      try {
        userID = require("jsonwebtoken").decode(req.body.token)._id;
      } catch (e) {}
      const toFetch = comments.filter(comment => {
        return postID == comment.postID;
      });
      const newComments = toFetch.map(comment => {
        const newComment = { ...comment._doc };
        if (userID != null) {
          const voter = newComment.voters.find(voter => {
            return voter._id == userID;
          });
          newComment.currentUserVote = null;
          if (voter != undefined) newComment.currentUserVote = voter.voteType;
        } else {
          //use hasn't logged - in, return empty currentUserVote
          newComment.currentUserVote = null;
        }
        delete newComment.voters;
        return newComment;
      });

      res.send({ success: true, payload: newComments });
    }
  });
});

router.use("/createComment/:_id", jwtAuth);
router.post("/createComment/:_id", (req, res, next) => {
  const postID = req.params._id;
  const comment = req.body;
  comment.votes = 0;
  comment.voters = [];
  const NewComment = new Comment(comment);
  NewComment.save((err, doc) => {
    if (!err) res.send({ success: true, payload: doc });
    else res.send({ success: false, payload: "Error while creating comment." });
  });

  // Post.findOneAndUpdate({_id: postID}, {$push: {comments: comment}}, (err, doc) => {
  //   if(!err) res.send({success: true})
  //   else res.status(500).send({success: false, error: err})
  // });
});

router.route("/").post(jwtAuth, (req, res, next) => {
  //create post

  //TOOD: validate
  //1. get author

  // const firstName = require("jsonwebtoken").decode(req.body.token).firstName;
  // const lastName = require("jsonwebtoken").decode(req.body.token).lastName;
  // const authorEmail =

  const userID = require("jsonwebtoken").decode(req.body.token)._id;
  User.findOne({ _id: userID }, (err, user) => {
    if (err) res.send({ success: false, payload: err });
    else {
      const author = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        imagePath: user.profileImage.filename
      };
      const date = Date.now();

      const { title, content, topic } = req.body.form;
      const newPost = new Post({
        title,
        content,
        topic: topic,
        votes: 0,
        voters: [],
        author: author,
        date
      });
      newPost.save((err, post) => {
      
        if (err != null) {
        

          res.status(500).send(err);
        } else {
          User.findOneAndUpdate(
            { _id: userID },
            { $push: { "forum.submittedPosts": post._id } },
            (err, doc) => {
           
              res.send({ success: true, payload: post });
            }
          );
        }
      });
    }
  });
  //const author = `${firstName} ${lastName}`;
});

router.get("/getHeaders", (req, res, next) => {
  const topics = [
    { name: "Announcments", address: "announcments" },
    { name: "Patch Notes", address: "patch-notes" },
    { name: "Random", address: "random" },
    { name: "New Stores", address: "new-stores" },
    { name: "Updating users", address: "updating-users" },
    { name: "Networking", address: "networking" },
    { name: "Hardware", address: "hardware" }
  ];

  const headers = {};
  // topics.map(topic => {
  //   toSend[topic] = {
  //     posts: 0,
  //     comments: 0
  //   }
  // })
  Post.find({}, (err, posts) => {
    if (posts) {
      topics.map(topic => {
        const relaventPosts = posts.filter(post => {
          return post.topic == topic.address && !post.isDeleted;
        });
        let relaventCommentsNum = 0;
        relaventPosts.map(post => {
          return (relaventCommentsNum += post.comments.length);
        });
        headers[topic.address] = {
          posts: relaventPosts.length,
          comments: relaventCommentsNum
        };
      });
      //console.log(toSend)
      res.send({ success: true, payload: headers });
    }
  });
});

router.post("/fetchPostsByTopic/:topic", (req, res, next) => {
  let userID = null;
  try {
    userID = require("jsonwebtoken").decode(req.body.token)._id;
  } catch (e) {}
  if (userID) {
    //IF USER AUTHENTICATED - LOGGED IN
    Post.find({ topic: req.params.topic }, (err1, posts) => {
      if (posts) {
        User.findOne({ _id: userID }, (err2, user) => {
          if (err1) res.send({ success: false, payload: err.toString() });
          else {
            const existingPosts = forumHelper.handlePostArrayLoggedIn(
              posts,
              user
            );
            res.send({ success: true, payload: existingPosts });
          }
        });
      } else res.send({ success: false, payload: err2 });
    });
  } else {
    //USER LOGGED OUT
    Post.find({ topic: req.params.topic }, (err1, posts) => {
      if (posts) {
        // const newPosts = posts.map(post => {
        //   const newPost = forumHelper.handlePostLoggedOut(post._doc);
        //   return newPost;
        // });
        // const existingPosts = newPosts.filter(post => {
        //   return post != null;
        // });
        const existingPosts = forumHelper.handlePostArrayLoggedOut(posts);
        res.send({ success: true, payload: existingPosts });
      } else res.send({ success: false, payload: err1 });
    });
  }
});

router.use("/votePost", jwtAuth);
router.post("/votePost", (req, res, next) => {
  const { token, postID, voteType } = req.body;
  const userID = require("jsonwebtoken").decode(token)._id;

  const newVoter = {
    _id: userID,
    voteType: voteType
  };
  let voteInt = 0;
  if (voteType == "up") voteInt = 1;
  else voteInt = -1;

  Post.findOne({ _id: postID }, (err, post) => {
    if (post) {
      const existingVote = post.voters.find(voter => {
        return voter._id == userID;
      });
      //if user already voted
      if (existingVote) {
        console.log("EXISTING VOTE");
        //if old_user_vote == new_user_vote
        //then user un-votes, remove user voter instance and undo his effect on post.vote integer
        if (existingVote.voteType == voteType) {
          Post.findOneAndUpdate(
            { _id: postID },
            {
              $pull: { voters: { _id: userID } },
              $inc: { votes: -1 * voteInt }
            },
            (err, doc) => {
              if (!err) res.send({ success: true });
              else res.status(500).send("err1");
            }
          );
        }
        //else, user votes a different vote,
        //cancel his old vote and change his voter to current voteType
        else {
          console.log("DIFFERET VOTE");
          Post.findOneAndUpdate(
            { _id: postID, "voters._id": userID },
            {
              $set: { "voters.$.voteType": voteType },
              $inc: { votes: 2 * voteInt }
            },
            (err, doc) => {
              if (!err) res.send({ success: true });
              else res.status(500).send("err2");
            }
          );
        }
      }
      //else, a new vote
      else {
        Post.findOneAndUpdate(
          { _id: postID },
          { $push: { voters: newVoter }, $inc: { votes: voteInt } },
          (err, doc) => {
            if (!err) res.send({ success: true });
            else res.status(500).send("err3");
          }
        );
      }
    } else res.status(500).send("err4");
  });
});

router.use("/voteComment", jwtAuth);
router.post("/voteComment/", (req, res, next) => {
  const { commentID, token, voteType } = req.body;
  const userID = require("jsonwebtoken").decode(token)._id;

  const newVoter = {
    _id: userID,
    voteType: voteType
  };

  let voteInt = 0;
  if (voteType == "up") voteInt = 1;
  else voteInt = -1;

  Comment.findOne({ _id: commentID }, (err, comment) => {
    if (comment) {
      const existingVote = comment.voters.find(voter => {
        return voter._id == userID;
      });
      //if user already voted
      if (existingVote) {
        console.log("EXISTING VOTE");
        //if old_user_vote == new_user_vote
        //then user un-votes, remove user voter instance and undo his effect on post.vote integer
        if (existingVote.voteType == voteType) {
          Comment.findOneAndUpdate(
            { _id: commentID },
            {
              $pull: { voters: { _id: userID } },
              $inc: { votes: -1 * voteInt }
            },
            (err, doc) => {
              if (!err) res.send({ success: true });
              else res.status(500).send("cannot update (type: 1)");
            }
          );
        }
        //else, user votes a different vote,
        //cancel his old vote and change his voter to current voteType
        else {
          console.log("DIFFERET VOTE");
          Comment.findOneAndUpdate(
            { _id: commentID, "voters._id": userID },
            {
              $set: { "voters.$.voteType": voteType },
              $inc: { votes: 2 * voteInt }
            },
            (err, doc) => {
              if (!err) res.send({ success: true });
              else res.status(500).send("cannot update (type: 2)");
            }
          );
        }
      }
      //else, a new vote
      else {
        Comment.findOneAndUpdate(
          { _id: commentID },
          { $push: { voters: newVoter }, $inc: { votes: voteInt } },
          (err, doc) => {
            if (!err) res.send({ success: true });
            else res.status(500).send("cannot update (type: 3)");
          }
        );
      }
    } else res.status(500).send("cannot find comment to update.");
  });
});
router.use("/save/:postID", jwtAuth);
router.post("/save/:postID", (req, res, next) => {
  const postID = req.params.postID;
  const saveType = req.body.saveType;
  console.log("saveType: " + saveType);
  const userID = require("jsonwebtoken").decode(req.body.token)._id;
  console.log("inside savePosts, userID: " + userID);
  console.log("inside savePosts, postID: " + postID);

  let actionType = "$push";
  saveType == "save" ? (actionType = "$push") : (actionType = "$pull");
  const savedPostWrapper = {
    dateSaved: Date.now(),
    post: postID
  };

  if (actionType == "$pull") {
    //find savedPostWrapper
    User.findOne({ _id: userID }, (err, user) => {
      const existingSavedPostWrapper = user.forum.savedPosts.find(savedPost => {
        return savedPost.post.toString() == postID;
      });
      User.findOneAndUpdate(
        { _id: userID },
        { $pull: { "forum.savedPosts": existingSavedPostWrapper } },
        (err, callback) => {
          if (!err) res.send({ success: true });
          else res.send({ success: false, payload: err });
        }
      );
    });
  } else {
    User.findOneAndUpdate(
      { _id: userID },
      { $push: { "forum.savedPosts": savedPostWrapper } },
      (err, callback) => {
        if (!err) res.send({ success: true });
        else res.send({ success: false, payload: err });
      }
    );
  }
});

router.use("/fetchSaved/:_id", jwtAuth);
router.get("/fetchSaved/:_id", (req, res, next) => {
  const userID = req.params._id;
  User.findOne({ _id: userID })
    .populate("forum.savedPosts.post")
    .exec((err, user) => {
      //const savedPosts = user.forum.savedPosts;
      // const newSavedPosts = savedPosts.map(savedPost => {
      //   return forumHelper.handlePost3(savedPost.post._doc, user);
      // });
      // const existingSavedPosts = newSavedPosts.filter(post => {
      //   return post != null;
      // });
      // console.log('uSER')
      // console.log(user);
      // console.log('savedPosts');
      // console.log(user.forum.savedPosts)
      const savedPosts = user.forum.savedPosts.map(postWrapper => {
        return postWrapper.post;
      })
      const toReturn = forumHelper.handlePostArrayLoggedIn(savedPosts, user);
      if (err) res.send({ success: false, payload: err.toString() });
      else res.send({ success: true, payload: toReturn });
    });
});

router.use("/deletePost/:_id", jwtAuth);
router.post("/deletePost/:_id", (req, res, next) => {
  const userID = require("jsonwebtoken").decode(req.body.token)._id;
  const postID = req.params._id;
  User.findOne({ _id: userID }, (err1, user) => {
    if (err1) res.send({ success: false, err: err1.toString() });
    else {
      Post.findOne({ _id: postID }, (err2, post) => {
        if (err2) res.send({ success: false, err: err2.toString() });
        else {
          console.log("post.author._id: " + post.author._id);
          console.log("userID: " + userID);
          if (post.author._id != userID)
            res.status(401).send("error, user is not the post creator");
          else {
            Post.findOneAndUpdate(
              { _id: postID },
              { $set: { isDeleted: true } },
              (err3, doc) => {
                if (err3) res.send({ success: false, err: err3.toString() });
                else res.send({ success: true });
              }
            );
          }
        }
      });
    }
  });
});

module.exports = router;
