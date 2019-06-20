const router = require("express").Router();
const AuthController = require("../../controllers/AuthController");
const passport = require("passport");
const User = require("mongoose").model("User");
router.post("/signup", (req, res, next) => {
  AuthController.signup(req, res, next);
});

//DEPRECATED

// router.use("/login", passport.authenticate("local", { session: false }));

// router.post("/login", (req, res, next) => {
//   AuthController.loginSuccess(req, res, next);
// });

const localPassport = passport.authenticate('local', {session: false})

router.post('/login', localPassport, AuthController.loginSuccess)

router.get("/logout", (req, res, next) => {
  AuthController.logout(req, res, next);
});

router
  .route("/secret")
  .get(passport.authenticate("jwt", { session: false }), (req, res, body) => {
    console.log("I MANAGED TO GET TOS ECRET");
    res.send("I MANAGED TO GET TO SECREt");
  });


module.exports = router;
