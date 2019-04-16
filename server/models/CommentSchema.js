const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
  postID: String,
  date: Date,
  content: String,
  author: {
    _id: String,
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    imagePath: String
  },
  votes: Number,
  voters: [
    {
      _id: String,
      voteType: String
    }
  ]
});

mongoose.model("Comment", CommentSchema);
