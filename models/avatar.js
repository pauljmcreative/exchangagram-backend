const mongoose = require("mongoose");
const Schema = mongoose.Schema;


let AvatarSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  avatarName: String,
});

let Avatar = mongoose.model("Avatar", AvatarSchema);

module.exports = Avatar;