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
      voteType: String
    }
  ],
  comments: [
    {
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
    }
  ]
})

mongoose.model('Post', PostSchema);