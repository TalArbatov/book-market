const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  title: String,
  content: String,
  author: String,
  date: Date,
  comments: [
    {
      date: Date,
      content: String,
      author: String,
    }
  ]
})

mongoose.model('Post', PostSchema);