const router = require("express").Router();
const AuthController = require('../../controllers/AuthController')

router.post("/signup", (req, res, next) => {
  AuthController.signup(req,res,next)
});

router.post("/login", (req, res, next) => {
  AuthController.login(req,res,next)
});

router.get("/logout", (req, res, next) => {
  AuthController.logout(req,res,next)
});



module.exports = router;
