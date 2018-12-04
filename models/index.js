const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGOD_URI || "mongodb://localhost:27017/project3",
  { useNewUrlParser: true }
);

let User = require("./user");
let Post = require("./post");
let Comment = require("./comment");
let Follow = require("./follow");
let Image = require("./Image");
let Avatar = require("./avatar");


module.exports = {
  User: User,
  Post: Post,
  Comment: Comment,
  Image: Image,
  Avatar: Avatar,
  Follow: Follow,
  // Like: Like,
}