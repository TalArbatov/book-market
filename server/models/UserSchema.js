const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const UserSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  //image: {data: Buffer, contentType: String},
  username: { type: String, required: true },
  profileImage: {
    filename: { type: String, default: "default.jpg" },
    dateUploaded: { type: Date },
    url: {type: String}
  },
  password: { type: String, required: true },
  dateJoined: Date,
  forum: {
    postsNum: Number,
    commentsNum: Number,
    submittedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
      }
    ],
    savedPosts: [
      {
        dateSaved: Date,
         post: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post"
         }
      }
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
    ],
      followers: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
      
    ]
    //rank [rookie, appreitence, average, advanced, mater, elite, ....]
  }
  // orderHistory: [
  //   {
  //     books: [
  //       {

  //       }
  //     ]
  //   }
  // ]
});

UserSchema.pre("save", function(next) {
  var user = this;
  if (!user.isModified("password")) return next();
  bcrypt.genSalt(5, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});
UserSchema.methods = {
  comparePassword: function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) return cb(err);
      cb(null, isMatch);
    });
  }
};

//user.comparePassword(password, (err, isMatch) => {})

mongoose.model("User", UserSchema);
