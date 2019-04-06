const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  topic: String,
  title: String,
  content: String,
  authorHeader: String,
  authorEmail: String,
  date: Date,
  votes: Number,
  voters: [
    {
      _id: String,
      voteType: Boolean
    }
  ],
  comments: [
    {
      date: Date,
      content: String,
      author: String,
    }
  ]
})

mongoose.model('Post', PostSchema);