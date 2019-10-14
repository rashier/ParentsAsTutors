const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  firstname: {
    type: String,
    required:true
  },
  surnames: {
    type: String,
    required:true
  },
  phone: {
    type: Number,
    required:true
  },
  email: {
    type: String,
    required:true
  },
  username: {
    type: String,
    unique:true,
    required:true
  },
  password: {
    type:String,
    required:true
  },
  role:{
    type: String,
    enum: ['teacher','parent'],
    default: 'parent'
  },
  alumni:[{
    type: Schema.Types.ObjectId, ref:'Student'
  }]
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;