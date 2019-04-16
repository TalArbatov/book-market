const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  topic: String,
  title: String,
  content: String,
  date: Date,
  votes: Number,
  voters: [
    {
      _id: String,
      voteType: String
    }
  ],
  author: {
    _id: String,
    firstName: String,
    lastName: String,
    email: String,
    username: String,
    imagePath: String,
  },
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