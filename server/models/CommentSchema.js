const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
  date: Date,
  content: String,
  author: {
    _id: String,
    image: String
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
