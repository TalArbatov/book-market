const router = require("express").Router();
const Post = require("mongoose").model("Post");

router.get("/", (req, res, next) => {
  Post.find({}, (err, posts) => {
    if (posts) res.status(200).send({ success: true, payload: posts });
    else res.status(500).send({ success: false, payload: error });
  });
});
router.get("/:id", (req, res, next) => {
  Post.findOne({ _id: req.params.id }, (err, post) => {
    if (post) res.status(200).send({ success: true, payload: post });
    else res.status(500).send({ success: false, payload: error });
  });
});

router.post("/", (req, res, next) => {
  //TOOD: validate
  const { title, content, author, date, comments } = req.body;
  const newPost = new Post({
    title,
    content,
    author,
    date,
    commnets
  });
  try {
    newPost.save();
  } catch (e) {
    res.status(500).send({ success: false, payload: e });
  } finally {
    res.status(200).send({ success: true });
  }
});
module.exports = router;
