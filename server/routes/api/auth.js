const router = require("express").Router();
const AuthController = require("../../controllers/AuthController");
const passport = require("passport");
const User = require("mongoose").model("User");
router.post("/signup", (req, res, next) => {
  AuthController.signup(req, res, next);
});

router.use("/login", passport.authenticate("local", { session: false }));

router.post("/login", (req, res, next) => {
  AuthController.loginSuccess(req, res, next);
});

// router
//   .route("/login")
//   .post(
//     passport.authenticate("local", { session: false }),
//     (req, res, next) => {
//       console.log("successful login");
//       User.findOne({ email: req.body.email }, (err, user) => {
//         if (!user) res.send({ success: false, error: "Weird...!" });
//         else res.send({ success: true, payload: user });
//       });
//       //AuthController.login(req, res, next);
//     }
//   );

router.get("/logout", (req, res, next) => {
  AuthController.logout(req, res, next);
});

router
  .route("/secret")
  .get(passport.authenticate("jwt", { session: false }), (req, res, body) => {
    console.log("I MANAGED TO GET TOS ECRET");
    res.send("I MANAGED TO GET TO SECREt");
  });
// router.use("/secret", passport.authenticate("jwt", { session: false }));
// router.get("/secret", (req, res, body) => {
//   console.log("I MANAGED TO GET TOS ECRET");
//   res.send("I MANAGED TO GET TO SECREt");
// });

module.exports = router;
