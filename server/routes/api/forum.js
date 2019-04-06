const router = require("express").Router();
const Post = require("mongoose").model("Post");
const passport = require("passport");

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
router.get("/view/post/:id", (req, res, next) => {
  Post.findOne({ _id: req.params.id }, (err, post) => {
    if (post) res.status(200).send({ success: true, payload: post });
    else res.status(500).send({ success: false, payload: error });
  });
});

const jwtAuth = passport.authenticate("jwt", { session: false });

router.route("/").post(jwtAuth, (req, res, next) => {
  //TOOD: validate
  //1. get author
  console.log("started creating post...");

  const firstName = require("jsonwebtoken").decode(req.body.token).firstName;
  const lastName = require("jsonwebtoken").decode(req.body.token).lastName;
  const authorEmail = require("jsonwebtoken").decode(req.body.token).email;

  const author = `${firstName} ${lastName}`;
  const date = Date.now();

  const { title, content, topic } = req.body.form;
  const newPost = new Post({
    title,
    content,
    topic: topic,
    votes: 0,
    authorHeader: author,
    authorEmail: authorEmail,
    date,
    comments: []
  });
  newPost.save((err, post) => {
    console.log("err: " + err);
    console.log(post);
    if (err != null) {
      res.status(500).send(err);
      console.log("error in newPost.save");
    } else {
      console.log("success in newPost.save");
      res.send({ success: true, payload: post });
    }
  });
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

      const userID = require("jsonwebtoken").decode(req.body.token)._id;

      const newPosts = posts.map(post => {
        const newPost = { ...post._doc };
        const voter = newPost.voters.find(voter => {
          return voter._id == userID;
        });
        console.log("voter: " + voter);
        newPost.currentUserVote = null;
        if (voter != undefined) newPost.currentUserVote = voter.voteType;

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
  // console.log('userID: ' + require('jsonwebtoken').decode(token)._id);
  // console.log('postID:' + postID);
  // console.log('voteType: ' + voteType);

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
        if(existingVote.voteType == voteType) {
          Post.findOneAndUpdate(
            { _id: postID },
            { $pull: { voters: {_id: userID} }, $inc: { votes: -1 * voteInt } },
            (err, doc) => {
              if (!err) res.send({ success: true });
              else res.status(500).send('err1')
            }
          );
        }
        //else, user votes a different vote,
        //cancel his old vote and change his voter to current voteType
        else {
          console.log('DIFFERET VOTE')
          Post.findOneAndUpdate(
            { _id: postID, "voters._id": userID },
            { $set: { "voters.$.voteType": voteType }, $inc: { votes: 2 * voteInt } },
            (err, doc) => {
              if (!err) res.send({ success: true });
              else res.status(500).send('err2')
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
            else res.status(500).send('err3')

          }
        );
      }
    } else res.status(500).send("err4");
  });
});

module.exports = router;