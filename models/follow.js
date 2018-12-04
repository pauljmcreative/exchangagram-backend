const mongoose = require("mongoose");
const Schema = mongoose.Schema;



let FollowSchema = new Schema({

  follower: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  followee: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
},
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  });

let Follow = mongoose.model("Follow", FollowSchema);


module.exports = Follow;