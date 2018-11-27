const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGOD_URI || "mongodb://localhost:27017/project3",
  { useNewUrlParser: true }
);

let User = require("./user");
let Post = require("./post");
let Comment = require("./comment");
// let Follower = require("./follower");
// let Following = require("./following");
// let Like = require("./like");
let ProfileImage = require("./profileImage");


module.exports = {
  User: User,
  Post: Post,
  Comment: Comment,
  // Follower: Follower,
  // Following: Following,
  // Like: Like,
  ProfileImage: ProfileImage,
}