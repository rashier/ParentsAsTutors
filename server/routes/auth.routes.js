const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const passport = require("passport");
const Student = require("../models/Student.model");

const login = (req, user) => {
  return new Promise((resolve, reject) => {
    req.login(user, err => {
      if (err) {
        reject(new Error("Something went wrong"));
      } else {
        resolve(user);
      }
    });
  });
};

router.post("/signup", async (req, res, next) => {
  const { firstname, surnames, phone, email, username, password, role } = req.body;
c
  if (!username || !password) {
    next(new Error("You must provide valid credentials"));
  }

  let sons = await Student.find({ emailparent: email })
  sons = sons.map(user => user = user._id);

  User.findOne({ username })
  .then( foundUser => {
    if (foundUser) throw new Error('Username already exists');
    const salt     = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);
    return new User({
      firstname,
      surnames,
      phone,
      email,
      username,
      password: hashPass,
      role,
      alumni: sons
    })
    .save();
  })
  .then( savedUser => login(req, savedUser)) 
  .then( user => res.json({status: 'signup & login successfully', user})) 
  .catch(e => next(e));
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) next(new Error("Something went wrong"));
    if (!theUser) next(failureDetails);

    login(req, theUser).then(user => res.status(200).json(req.user));
  })(req, res, next);
});

router.post("/updateprofile", (req, res) => {
  const doc = {
    phone: req.body.phone,
    email: req.body.email
  };
  User.findByIdAndUpdate(req.body.id, doc, {new:true}) 
    .then((updateProfile)=>{
      res.json(updateProfile)
    })
    .catch(err=>console.log("don't update profile   ",err))
});

router.get("/currentuser", (req, res, next) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    next(new Error("Not logged in"));
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json({ message: "logged out" });
});

router.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = router;
