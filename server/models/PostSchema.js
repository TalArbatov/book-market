const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  topic: String,
  title: String,
  content: String,
  authorHeader: String,
  authorEmail: String,
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