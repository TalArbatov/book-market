const JWT = require("jsonwebtoken");
require('dotenv').config();

module.exports = {
  signJWT: user => {
    //generate JW token
    //console.log('userID: ' + user._id)
    const JWT_SECRET = process.env.JWT_SECRET;
    //console.log('jwt secret: ' +JWT_SECRET);
     const token = JWT.sign(
      {
        iss: "TalArbetov",
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userImage: user.profileImage.filename
      },
      JWT_SECRET, 
      //{expiresIn: '10h'}
      {expiresIn: 5000}
    );
    //console.log('JWT_TOKEN: ' + token)
    return token;
  }
};
