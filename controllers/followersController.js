// let db = require("../models");

// // GET /api/followers/
// const getAllFollowers = (req, res) => {
//   db.Followers.find({}, (err, followers) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     res.json(followers);
//   })
// }

// const createFollowers = (req, res) => {
//   let follower = req.body;
//   db.Followers.create(follower, (err, createdFollower) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     res.status(200).json(createdFollower);
//   })
// }

// module.exports = {
//   show: getAllFollowers,
//   create: createFollowers,
// }