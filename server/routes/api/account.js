const router = require("express").Router();
const path = require("path");
const multer = require("multer");
const User = require('mongoose').model('User');
const fs = require('fs');
const passport = require("passport");

const jwtAuth = passport.authenticate("jwt", { session: false });


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./client/public/profile-images");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now()+path.extname(file.originalname));
  }
});

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 100000000 }
// }).single("myImage");

const upload2 = multer({
  storage: storage,
  limits: { fileSize: 100000000 }
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

router.get('/fetchUser/:_id', (req,res,next) => {
  console.log('inside fetch users')
  console.log(req.params)
  const userID = req.params._id;
  User.findOne({_id: userID}, (err, user) => {
    if(!err) res.send(user);
    else res.status(500).send('error in /api/account/fetchUser/:_id')
  })
})

router.get('/discardUserImage/:_id', (req,res,next) => {
  const userID = req.params._id;
  console.log('test: ' + userID)
  const defaultProfileImage = {
    filename: 'default.jpg',
    dateUploaded: Date.now()
  }
  User.findByIdAndUpdate({_id: userID}, {$set: {'profileImage': defaultProfileImage}}, (err, doc) => {
    if(!err) res.send({success: true})
  })
})

router.post("/uploadPhoto", upload2.single("testFile"), (req, res, next) => {
  console.log(req.body)
  const userID = require('jsonwebtoken').decode(req.body.token)._id;
  console.log('userID: ' + userID);
  // const img = {
  //   data: fs.readFileSync(req.file.path),
  //   contentType: 'image/jpeg'
  // }
  const profileImage = {
    filename: req.file.filename,
    dateUploaded: Date.now()
  }
  User.findOneAndUpdate({_id: userID}, {$set:{profileImage: profileImage}}, (err, doc) => {
    if(!err) res.status(200).send({success: true});
    else res.sendStatus(500);
  })
});
router.use('/follow', jwtAuth)
router.post('/follow', (req,res,next) => {
  // {isFollow, followingUserID, followedUserID}
  const {isFollow, followingUserID, followedUserID} = req.body
  console.log('followingUserID: ' + followingUserID);
  console.log('followedUserID: ' + followedUserID);

  //add to followers to the user being followed
  User.findOneAndUpdate({_id: followedUserID}, {$push: {'forum.followers': followingUserID}}, (err, res) => {
    if(err) {
      console.log(err)
      res.send({success: false, err})
    }
  })
  //add to the 'following' to the user that is following
  User.findOneAndUpdate({_id: followingUserID}, {$push: {'forum.following': followedUserID}}, (err,res) => {
    if(err) {
      console.log(err)
      res.send({success: false, err})
    }
  })
  res.send({success: true})
})

module.exports = router;
