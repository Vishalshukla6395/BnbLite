const express = require("express");
const wrapAsync = require("../utils/wrapAsync.js");
const router = express.Router();
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

router
  .route("/signup")
  .get(userController.signUpForm)
  .post(wrapAsync(userController.signUp));

router
  .route("/login")
  .get(userController.logInForm)
  .post(saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.logIn
  );

// logout 
router.get("/logout",userController.logOut);

module.exports = router;
