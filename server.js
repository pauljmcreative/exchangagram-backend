const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const ejs = require("ejs");
const path = require("path");
const app = express();
let controllers = require("./controllers");
const port = process.env.PORT || 4000;

// Set Storage Engine //
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

// Init Upload //
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single("myImage");

// Check File Type //
function checkFileType(file, cb) {
  // Allowed extensions
  const filetypes = /jpeg|jpg|png|gif/;
  // Check Extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mimetype
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only");
  }
}

// init public file //
app.use(express.static("public"));
// Express CORS //
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// Express Body Parser //
app.use(express.urlencoded({ extended: false }));

// Set up JSON //
app.use(express.json());

// CORS //
app.use(cors());

// Public Folder //
app.use(express.static("./public"));

// Format of Token //
// Authorization: Bearer <access_token> //
const verifyToken = (req, res, next) => {
  // Get auth header value //
  console.log(req.headers["authorization"])
  const bearerHeader = req.headers["authorization"];
  // CHeck if bearder is undefined //
  if (typeof bearerHeader !== "undefined") {
    // Split at the space //
    const bearer = bearerHeader.split(" ");
    // Get token from array //
    const bearerToken = bearer[1];
    // Set the token //
    req.token = bearerToken;
    // Next middleware //
    console.log("TOKENNNNN", req.token)
    next();
  } else {
    // Forbidden //
    res.sendStatus(403);
  }
};

// Node serving images
app.get("/image/:imagename", (req, res) => {
  res.sendFile("public/uploads/" + req.params.imagename, { root: __dirname });
});

// Node serving avatars
app.get("/avatars/:avatarname", (req, res) => {
  res.sendFile("public/uploads/" + req.params.avatarname, { root: __dirname });
});

// Users //
app.get("/api/users", verifyToken, controllers.user.index);
app.get("/api/users/:id", verifyToken, controllers.user.show);
app.post("/api/users/signup", controllers.user.create);
app.post("/api/users/signin", controllers.user.login);
app.put("/api/users/:id", verifyToken, controllers.user.update);

// Images //
app.get("/api/images", controllers.Images.index);
app.get("/api/images/:post_id", controllers.Images.show);
app.post("/api/images/:post_id/upload", controllers.Images.upload);

// Avatars //
app.get("/api/avatars", controllers.avatar.index);
app.get("/api/avatars/:user_id", controllers.avatar.show);
app.post("/api/avatars/:user_id/upload", controllers.avatar.upload);

// Posts //
app.get("/api/posts", controllers.post.index);
app.get("/api/posts/:id", controllers.post.show);
app.post("/api/posts/new/:user_id", controllers.post.create);
app.put("/api/posts/:id", controllers.post.update);
app.delete("/api/posts/:id", controllers.post.delete);

// Comments //
app.get("/api/comments", controllers.comment.index);
// app.get("/api/comments/post/:post_id/", controllers.comment.postComments);
app.get("/api/comments/:post_id/", controllers.comment.getComments);
app.post("/api/comments/create/:user_id/:post_id", controllers.comment.create);
app.delete("/api/comments/:id", controllers.comment.delete);
app.delete("/api/comments/post/:post_id", controllers.comment.deleteMany);

// Follows //
app.get("/api/follows", controllers.follow.getAll);
app.get(
  "/api/follows/:followee_id/:follower_id",
  controllers.follow.getOneFollow
);
app.get(
  "/api/follows/followers/:followee_id",
  controllers.follow.findFollowers
);
app.get(
  "/api/follows/following/:follower_id",
  controllers.follow.findFollowing
);
app.post("/api/follows/:followee_id", controllers.follow.create);
app.delete("/api/follows/:followee_id", controllers.follow.delete);

// // Likes //
// // app.get("/api/likes", controllers.likes.show);

// Server //
// server = app.listen(process.env.PORT || 3000)
server = app.listen(port, () =>
  console.log(`HTTP server listening at port ${port}`)
);
