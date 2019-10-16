const express = require("express");
const router = express.Router();
const Student = require("../models/Student.model");
const User = require("../models/User");

router.post("/addstudent", (req, res, next) => {
  const { studentname, dni, grade, school , emailparent} = req.body;

  Student.create({
    studentname: studentname,
    dni: dni,
    grade: grade,
    school: school,
    emailparent: emailparent
  }).then(create=>{
      User.findByIdAndUpdate(req.user._id,{$push:{alumni: create._id}},{new:true})
      User.findOneAndUpdate({email:emailparent}, {$push:{alumni: create._id}},{new:true})
      .then(()=>{
        res.json(create)
      })
    })
    .then(other=>{
    console.log("add student copmplete"   ,other)
    })
    .catch(e => next(e));
});

router.post("/updatestudent", (req, res) => {
  const doc = {
    id: req.body.id,
    grade: req.body.grade,
    school: req.body.school
  };
  Student.findByIdAndUpdate(req.body.id, doc, function(err, result) {
    if (err) {
      res.send(err);
    }
    res.send("Student successfully updated!");
  });
});


router.get("/children",(req, res, next)=>{
  User.findById(req.user._id)
  .populate("alumni")
  .then((user)=>{
    res.json({user})
  })
})

module.exports = router;
