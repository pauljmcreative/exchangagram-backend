const db = require("../models");
const Post = db.Post;

// GET /api/posts

const getPosts = (req, res) => {
  db.Post.find({})
    .populate("user")
    .exec((err, posts) => {
      if (err) {
        console.log(err);
        return;
      }
      res.json(posts);
    });
};

// GET /api/posts/:id

const getPost = (req, res) => {
  let id = req.params.id
  db.Post.findById(id, (err, foundPost) => {
    if (err) {
      console.log(err);
      return
    }
    res.json(foundPost);
  })
}

// POST /api/posts/new/:user_id

const createPost = (req, res) => {
  console.log(req.body)
  let newPost = {
    caption: req.body.caption,
    location: req.body.location
  };
  let userId = req.params.user_id;

  db.Post.create(newPost, (err, createdPost) => {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log("Newly created post: ", createdPost);
      db.User.findById(userId, (err, foundUser) => {
        if (err) {
          console.log(err);
          return;
        } else {
          console.log("Setting new post user");
          createdPost.user = foundUser;
          createdPost.save();
          res
            .status(200)
            .send(createdPost, "successfully created with user ", foundUser);
        }
      });
    }
  });
};

// PUT /api/posts/:id

const updatePost = (req, res) => {
  let update = req.body;
  let id = req.params.id;

  db.Post.findByIdAndUpdate(id, update, { new: true }, (err, updatedPost) => {
    if (err) {
      console.log(err);
      return;
    }
    res.json(updatedPost);
  })
}

// DELETE /api/posts/:id

const deletePost = (req, res) => {
  let id = req.params.id;
  db.Post.findByIdAndRemove(id, (err, deletedPost) => {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log("Deleting ", deletedPost);
      res.json({
        message: "successfully deleted",
        deletedPost
      });
    }
  });
};

module.exports = {
  index: getPosts,
  show: getPost,
  create: createPost,
  update: updatePost,
  delete: deletePost
};
