const JWT = require("jsonwebtoken");
require('dotenv').config();

module.exports = {
  signJWT: userID => {
    //generate JW token
    console.log('userID: ' + userID)
    const JWT_SECRET = process.env.JWT_SECRET;
    console.log('jwt secret: ' +JWT_SECRET);
     const token = JWT.sign(
      {
        iss: "TalArbetov",
        sub: userID,
        
      },
      JWT_SECRET, 
      //{expiresIn: '10h'}
      {expiresIn: 20}
    );
    console.log('JWT_TOKEN: ' + token)
    return token;
  }
};
