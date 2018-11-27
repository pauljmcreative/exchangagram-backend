// let db = require("../models");

// // GET /api/likes/
// const getAllLikes = (req, res) => {
//   db.Likes.find({}, (err, likes) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     res.json(likes);
//   })
// }

// const createLikes = (req, res) => {
//   let like = req.body;
//   db.Likes.create(like, (err, createdLike) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     res.status(200).json(createdLike);
//   })
// }

// module.exports = {
//   show: getAllLikes,
//   create: createLikes,
// }