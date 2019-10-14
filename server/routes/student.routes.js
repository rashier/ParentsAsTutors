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
       .then(()=>{
           res.json(create)
       })
    })
    .catch(e => next(e));
});

module.exports = router;
