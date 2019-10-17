const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activitySchema = new Schema(
  {
    studentcode: {type: Schema.Types.ObjectId, ref:'Student'},
    subject: { type: String, required: true},
    title: { type: String, required: true},
    activity: { type: String, required: true},
    imgPath: String,
    video: String
  },
  {
    timestamps: true
  }
);

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
