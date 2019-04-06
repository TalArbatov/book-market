const router = require("express").Router();
const Post = require("mongoose").model("Post");
const passport = require("passport");

router.get("/view/post/", (req, res, next) => {
  Post.find({}, (err, posts) => {
    if (posts) res.status(200).send({ success: true, payload: posts });
    else {
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

router.get("/fetchPostsByTopic/:topic", (req, res, next) => {
  Post.find({ topic: req.params.topic }, (err, posts) => {
    if (posts) res.status(200).send(posts);
    else res.status(500).send(err);
  });
});

module.exports = router;
