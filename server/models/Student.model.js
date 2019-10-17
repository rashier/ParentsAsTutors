const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    studentname: {
      type: String,
      required: true
    },
    dni:{
      type: String,
      unique:true,
      required: true
    },
    grade: {
      type: String,
      required: true
    },
    school:{
      type: String,
      required: true
    },
    emailparent:{
      type: String,
      required: true
    },
    activities: [{
      type: Schema.Types.ObjectId, 
      ref:'Activity'
    }],
  },
  {
    timestamps: true
  }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
