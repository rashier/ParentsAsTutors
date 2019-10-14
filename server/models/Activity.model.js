const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activitySchema = new Schema(
  {
    studentcode: {type: Schema.Types.ObjectId, ref:'Student'},
    emailparent: {type: Schema.Types.ObjectId, ref:'User', required: true},
    subject: { type: String, required: true},
    title: { type: String, required: true},
    activity: { type: String, required: true},
    video: String//guardar el id o la url
  },
  {
    timestamps: true
  }
);

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
