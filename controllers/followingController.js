// let db = require("../models");

// // GET /api/following/
// const getAllFollowing = (req, res) => {
//   db.Following.find({}, (err, following) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     res.json(following);
//   })
// }

// const createFollowing = (req, res) => {
//   let following = req.body;
//   db.Following.create(following, (err, createdFollowing) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     res.status(200).json(createdFollowing);
//   })
// }

// module.exports = {
//   show: getAllFollowing,
//   create: createFollowing,
// }