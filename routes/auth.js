//top level route
const express = require("express");
const passport = require("passport");
const router = express.Router();

//@description
//auth with google
//@route GET / auth /google

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

//@description
//google auth callback
//@route GET /auth/google/callback

router.get('/google/callback',passport.authenticate('google', { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);
//@description
//log out user 
//@route /auth/logout 
router.get('/logout',(req,res)=>{
  req.logOut();
  res.redirect('/')
})

module.exports = router;
