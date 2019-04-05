const passport = require("passport");
const jwtStrategy = require("passport-jwt").Strategy;
const localStrategy = require("passport-local").Strategy;

const { ExtractJwt } = require("passport-jwt");
const mongoose = require("mongoose");
const User = mongoose.model("User");
require("dotenv").config();

passport.use(
  new jwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("Authorization"),
      secretOrKey: process.env.JWT_SECRET
    },
    (payload, done) => {
      console.log('inside paassport jwt');
      try {
        //find the user specified in token
        User.findOne({ _id: payload._id }, (err, user) => {
          //if user doesn't exist, handle it
          console.log('payload')
          console.log(payload)
          if (!user) {
            console.log('inside passport.js jwt-strategy: user does not exist')
            return done(null, false);
          }
          //otherwise, return the user
          else {
            return done(null, user);
          }
        });
      } catch (e) {
        console.log('inside passport.js jwt-strategy:' + e);
        done(e, false);
      }
    }
  )
);

passport.use(
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    (email, password, done) => {
      //Find the user, given the email
      //If not, handle that
      User.findOne({ email }, (err, user) => {
        if (!user) return done(null, false);
        //if user found, check if password correct
        //if correct, return user, otherwise, handle that.
        else {
          user.comparePassword(password, (err, isMatch) => {
            if (err) done("Error inside passport.js localStarategy", false);
            else if (!isMatch)
              done("MISMATCH inside passport.js localStarategy", false);
            else done(null, user);
          });
        }
      });
    }
  )
);
