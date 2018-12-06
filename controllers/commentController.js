const db = require("../models");

// GET /api/comments
const commentsIndex = (req, res) => {
  db.Comment.find({})
    .populate("user")
    .populate("post")
    .sort({ dateCreated: -1 })
    .exec((err, foundComments) => {
      if (err) {
        console.log(err);
        return;
      }
      res.json(foundComments);
    });
}

// GET /api/comments/:post_id
const getPostComments = (req, res) => {
  let postId = req.params.post_id;
  console.log(postId)
  db.Comment.find({ post: { _id: postId } })
    .sort({ dateCreated: -1 })
    .populate("user")
    .exec((err, comments) => {
      if (err) {
        console.log(err);
        res.status(404);
      }
      res.json(comments);
    });
};

// POST /api/comments/create/:user_id/:post_id

const createComment = (req, res) => {
  let postId = req.params.post_id;
  let userId = req.params.user_id;
  console.log(`HERE IS THE UNKNOWN`, userId);
  let newComment = req.body;

  db.Comment.create(newComment, (err, createdComment) => {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log("Newly created comment: ", createdComment);
      db.User.findById(userId, (err, foundUser) => {
        if (err) {
          console.log(err);
          return;
        } else {
          console.log("Setting new comment user");
          createdComment.user = foundUser;
          db.Post.findById(postId, (err, foundPost) => {
            if (err) {
              console.log(err);
              return;
            } else {
              console.log("Setting new comment post");
              createdComment.post = foundPost;
              createdComment.save();
              res.json(createdComment);
            }
          });
        }
      });
    }
  });
};

// DELETE /api/comments/:id
const deleteComment = (req, res) => {
  let id = req.params.id;
  db.Comment.findByIdAndRemove(id, (err, deletedComment) => {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log("Deleting ", deletedComment);
      res.json({
        message: "successfully deleted",
        deletedComment
      });
    }
  });
};

// DELETE /api/comments/post/:post_id
const deletePostComments = (req, res) => {
  let postId = req.params.post_id;
  db.Comment.deleteMany({ post: { _id: postId } }).exec(
    (err, deletedComments) => {
      if (err) {
        console.log(err);
        return;
      }
      res.json({
        message: "successfully deleted",
        deletedComments
      });
    }
  );
};

module.exports = {
  index: commentsIndex,
  getComments: getPostComments,
  create: createComment,
  delete: deleteComment,
  deleteMany: deletePostComments
};
