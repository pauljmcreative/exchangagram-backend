const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ProfileImageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  name: String,
  mimetype: String,

});

let ProfileImage = mongoose.model("ProfileImage", ProfileImageSchema);

module.exports = ProfileImage;