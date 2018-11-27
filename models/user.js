const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  name: String,
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  fb_id: String,
  twitter_id: String,
  profile_url: String,
  aboutMe: {
    type: String,
    default: "Write something here!"
  },
  joinDate: {
    type: Date,
    default: Date.now
  }
});


const User = mongoose.model('User', UserSchema);
module.exports = User;