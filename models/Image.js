const mongoose = require("mongoose");
const Schema = mongoose.Schema;


let comment = require("./comment");

let ImageSchema = new Schema({
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post"
  },
  imageName: String,
});

let Image = mongoose.model("Image", ImageSchema);

module.exports = Image;