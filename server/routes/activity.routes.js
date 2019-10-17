const express = require("express");
const router = express.Router();
const Activity = require("../models/Activity.model");
const Student = require("../models/Student.model");
const uploader = require("./../configs/cloudinary.config");
const axios = require("axios");

router.post("/addactivity", (req, res, next) => {
  const { id, subject, title, activity, video, imgPath } = req.body;

  Activity.create({
    subject: subject,
    title: title,
    activity: activity,
    video: video,
    imgPath: imgPath
  })
    .then(create => {
      Student.findByIdAndUpdate(
        id,
        { $push: { activities: create._id } },
        { new: true }
      ).then(() => {
        res.json(create);
      });
    })
    .then(other => {
      console.log("add activity complete", other);
    })
    .catch(e => next(e));
});

router.get("/activitiesStudent", (req, res, next) => {
  Student.findById(req.body.idStudent)
    .populate("activities")
    .then(user => {
      res.json({ user });
    });
});

router.post("/upload", uploader.single("imageUrl"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  // get secure_url from the file object and save it in the
  // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
  res.json({ secure_url: req.file.secure_url });
});

router.get("/searchyt/:query", (req, res) => {
  axios
    .get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=viewCount&q=${req.params.query}&type=video&videoDefinition=high&fields=items(id%2FvideoId%2Csnippet(description%2Ctitle))&key=${process.env.GOOGLE_API_KEY}`
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err=>console.log(err));
});

router.get("/searchAutocomplete/:query", (req, res) => {
  axios
    .get(
      `http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${req.params.query}`
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err=>console.log(err));;
});


module.exports = router;
