const User = require("../models/user.js");

module.exports.signUpForm=async (req, res) => {
    res.render("users/signup.ejs");
  };

module.exports.signUp=async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ username, email });
      let registeredUser= await User.register(newUser, password);
      req.logIn(registeredUser,(err)=>{
        if(err){
          return next(err);
        }
        req.flash("success", "Welcome to BnbLite!");
        res.redirect("/listings");
      })
     
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  };

  module.exports.logInForm=async (req, res) => {
    res.render("users/login.ejs");
  };

  module.exports.logIn=(req, res) => {
    req.flash("success", "Welcome back to BnbLite!");
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
  };

  module.exports.logOut=(req,res,next)=>{
    req.logOut((err)=>{
      if(err){
        next(err);
      }
      req.flash("success","Logged out successfully!");
      res.redirect("/listings");
    })
  };