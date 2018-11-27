const mongoose = require("mongoose");
const Schema = mongoose.Schema;


let comment = require("./comment");

let PostSchema = new Schema({
  post_url: {
    type: String,
    required: true,
  },
  title: String,
  location: String,
  body: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  }
});

let Post = mongoose.model("Post", PostSchema);

module.exports = Post;