require("dotenv").config();
const mongoose = require("mongoose");
const User = mongoose.model("User");
//const JWT = require("jsonwebtoken");
const authHelper = require("../helpers/authHelper");
module.exports = {
  loginSuccess: (req, res, next) => {
    console.log("successful login");
    User.findOne({ username: req.body.username }, (err, user) => {
      if (!user) res.send({ success: false, error: "Weird...!" });
      else {
        const token = authHelper.signJWT(user)
        res.send({ success: true, payload: user , token});
      }
    });
    //AuthController.login(req, res, next);
  },

  signup: (req, res, next) => {
    //VALIDATE CREDENTIALS IN CLIENT + SERVER
    const form = req.body;
    console.log(req.body);
    let err = null;
    if (form.firstName.length == 0) err = "Please enter first name.";
    else if (form.lastName.length == 0) err = "Please enter last name.";
    else if (form.username.length < 4 || form.username.length > 12) err = "Username must be between 4 and 12 characters.";

    else if (form.email.length == 0) err = "Please enter Email Address.";
    else if (form.email.length < 6) err = "Invalid Email address.";
    else if (form.email.password == 0) err = "Please enter Password.";
    else if (form.password.length < 3)
      err = "Password must be at least 4 characters long.";
    else if (form.password != form.confirmPassword)
      err = "Passwords dont match.";
    if (err) {
      res.send({ success: false, error: err });
      next();
    } else {
      User.findOne({ email: form.email }, (any, user) => {
        if (user) res.send({ success: false, error: "Email already exists." });
        else User.findOne({username: form.username}, (err, user) => {
          if (user) res.send({ success: false, error: "Username already exists" });
          else {
            const { firstName, lastName, username, email, password } = form;
            
            const newUser = new User({
              firstName,
              lastName,
              username,
              email,
              password,
              forum: {
                postsNum: 0,
                commentsNum: 0,
                submittedPosts: [],
                savedPosts: [],
              }
            });
            newUser.save((err, resUser) => {
            //sign JWT token
            const token = authHelper.signJWT(resUser);
            res.send({ success: true, token });  
            });
            
          }
        })
        
      });
    }
    //user.comparePassword(password, (err, isMatch) => {})
  },
  // login: (req, res, next) => {
  //   console.log(req.body);
  //   const { email, password } = req.body;
  //   User.findOne({ email }, (err, user) => {
  //     if (!user) res.send({ success: false, error: "Non-existent User." });
  //     else {
  //       user.comparePassword(password, (err, isMatch) => {
  //         if (err) res.send({ success: false, error: "General Error" });
  //         else if (!isMatch)
  //           res.send({ success: false, error: "Invalid Password." });
  //         else {
  //           //sign JWT token
  //           const token = authHelper.signJWT;
  //           res.send({ success: true, payload: user, token });
  //         }
  //       });
  //     }
  //   });
  // },
  logout: (req, res, next) => {
    //TODO: implement logout
    res.send({ success: true });
  }
};
