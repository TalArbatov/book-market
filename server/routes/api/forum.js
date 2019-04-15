const router = require("express").Router();
const Post = require("mongoose").model("Post");
const Comment = require("mongoose").model("Comment");
const passport = require("passport");
const User = require("mongoose").model("User");
const jwtAuth = passport.authenticate("jwt", { session: false });

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

router.post("/view/post/:id", (req, res, next) => {
    //fetchPost

  let userID = null;
  try {
    userID = require("jsonwebtoken").decode(req.body.token)._id;
  } catch (e) {}
  console.log(req.body)
  console.log('inside fetchPost: userID: ' + userID);
  Post.findOne({ _id: req.params.id }, (err, post) => {
    if (err) res.send({ success: false, payload: err });
    else {
      let newPost = {...post._doc, currentUserVote: null}
      if (userID != null) {
        const userVote = post.voters.find(voter => {
          return voter._id == userID;
        });
        if(userVote);
          newPost.currentUserVote = userVote.voteType
      }
      delete newPost.voters;
      res.send({success: true, payload: newPost});
    }
  });
});

router.post("/comments/:_id", (req, res, next) => {
  //fetch all comments on a single post
  const postID = req.params.postID;
  Comment.find({ postID: postID }, (err, comments) => {
    if (err) res.send({ success: false, payload: "cannot find comments" });
    else {
      console.log("inside fetchComments");
      //handle comment data
      //return if user voted the post
      //do not send voters array to client - sensitive data

      //if user not logged-in, token is empty, than dont return currentUserVote
      let userID = null;

      try {
        userID = require("jsonwebtoken").decode(req.body.token)._id;
      } catch (e) {}

      const newComments = comments.map(comment => {
        const newComment = { ...comment._doc };
        if (userID != null) {
          const voter = newComment.voters.find(voter => {
            return voter._id == userID;
          });
          //console.log("voter: " + voter);
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
  //TOOD: validate
  //1. get author
  console.log("started creating post...");

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
        author: author,
        date
      });
      newPost.save((err, post) => {
        console.log("err: " + err);
        console.log(post);
        if (err != null) {
          console.log("error in newPost.save");

          res.status(500).send(err);
        } else {
          console.log("success in newPost.save");
          res.send({ success: true, payload: post });
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
          return post.topic == topic.address;
        });
        let relaventCommentsNum = 0;
        relaventPosts.map(post => {
          return (relaventCommentsNum += post.comments.length);
        });
        console.log(
          `Topic: ${topic}, posts: ${
            relaventPosts.length
          } comments: ${relaventCommentsNum}`
        );
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
  Post.find({ topic: req.params.topic }, (err, posts) => {
    if (posts) {
      console.log("inside fetchPosts");
      //handle posta data
      //return if user voted the post
      //do not send voters array to client - sensitive data

      //if user not logged-in, token is empty, than dont return currentUserVote
      let userID = null;

      try {
        userID = require("jsonwebtoken").decode(req.body.token)._id;
      } catch (e) {}

      const newPosts = posts.map(post => {
        const newPost = { ...post._doc };
        if (userID != null) {
          const voter = newPost.voters.find(voter => {
            return voter._id == userID;
          });
          //console.log("voter: " + voter);
          newPost.currentUserVote = null;
          if (voter != undefined) newPost.currentUserVote = voter.voteType;
        } else {
          //use hasn't logged - in, return empty currentUserVote
          newPost.currentUserVote = null;
        }
        delete newPost.voters;
        return newPost;
      });

      res.status(200).send(newPosts);
    } else res.status(500).send(err);
  });
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

module.exports = router;
