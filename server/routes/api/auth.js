const router = require("express").Router();
const AuthController = require('../../controllers/AuthController')
router.post("/signup", (req, res, next) => {
  //console.log(req.body)
  AuthController.signup(req,res,next)
  //res.send(req.body)
});

module.exports = router;
