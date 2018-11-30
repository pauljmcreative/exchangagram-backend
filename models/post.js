const mongoose = require("mongoose");
const Schema = mongoose.Schema;


let comment = require("./comment");

let PostSchema = new Schema({
  location: String,
  caption: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  likes: {
    type: Number,
    default: 0
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  }
});

let Post = mongoose.model("Post", PostSchema);

module.exports = Post;