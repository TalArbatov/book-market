const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = {
  signup : (req,res, next) => {
    //VALIDATE CREDENTIALS IN CLIENT + SERVER
    const form = req.body;
    console.log(req.body)
    let err = null;
    if (form.firstName.length == 0) err = "Please enter first name.";
    else if (form.lastName.length == 0) err = "Please enter last name.";
    else if (form.email.length == 0) err = "Please enter Email Address.";
    else if (form.email.length < 6) err = "Invalid Email address.";
    else if (form.email.password == 0) err = "Please enter Password.";
    else if (form.password.length < 3)
      err = "Password must be at least 4 characters long.";
    else if (form.password != form.confirmPassword)
      err = "Passwords dont match.";
    if(err) {
      res.send({success: false, error: err});
      next();
    }
    else {
      User.findOne({email:form.email}, (any, user) => {
        if(user) res.send({success: false, error: 'Existing User.'})
        else {
          const {firstName, lastName, email, password} = form;
          const newUser = new User({
            firstName, lastName, email, password
          })
          newUser.save();
          res.send({success: true})
        }
      })
    }
//user.comparePassword(password, (err, isMatch) => {})
    
  },
  login: (req,res,next) => {
    console.log(req.body);
    const {email,password} = req.body
    User.findOne({email}, (err, user) => {
      if(!user) res.send({success: false, error: 'Non-existent User.'})
      else {
        user.comparePassword(password, (err, isMatch) => {
          if(err) res.send({success: false, error: 'General Error'})
          else if(!isMatch) res.send({success: false, error: 'Invalid Password.'})
          else {
            res.send({success:true, payload: user})
          }
        })
      }
    })
  },
  logout: (req,res,next) => {
    //TODO: implement logout
    res.send({success: true})
  }
}