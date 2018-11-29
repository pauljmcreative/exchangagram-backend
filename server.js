const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
let controllers = require('./controllers');
const port = process.env.PORT || 4000;


// init public file //
app.use(express.static('public'));
// Express CORS //
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// Express Body Parser //
app.use(express.urlencoded({ extended: false }));

// Set up JSON //
app.use(express.json());

// CORS //
app.use(cors());

// Public Folder //
app.use(express.static('public'));

// Format of Token //
// Authorization: Bearer <access_token> //
const verifyToken = (req, res, next) => {
  // Get auth header value //
  const bearerHeader = req.headers['authorization'];
  // CHeck if bearder is undefined //
  if (typeof bearerHeader !== "undefined") {
    // Split at the space //
    const bearer = bearerHeader.split(" ");
    // Get token from array //
    const bearerToken = bearer[1];
    // Set the token //
    req.token = bearerToken;
    // Next middleware //
    next();
  } else {
    // Forbidden //
    res.sendStatus(403);
  }
}

// Routes //
app.get('/', (req, res) => res.send('Whatup fools!'));

app.get("/profileimage/:imagename", (req, res) => {
  res.sendFile("public/uploads/" + req.params.imagename, { root: __dirname });
})

// Users //
app.get("/api/users", controllers.user.index);
app.get("/api/users/:id", controllers.user.show);
app.post("/api/users/signup", controllers.user.create);
app.post("/api/users/signin", controllers.user.login);
app.put("/api/users/:id", controllers.user.update);

// Profile Images //
app.get("/api/profileimages/", controllers.profileImages.index);
app.get("/api/profileimages/:user_id", controllers.profileImages.show);
app.post("/api/:user_id/upload", controllers.profileImages.upload);

// Posts //
app.get("/api/posts", controllers.post.index);
app.get("/api/posts/:id", controllers.post.show);
app.post("/api/posts/new/:user_id", controllers.post.create);
app.put("/api/posts/:id", controllers.post.update);
app.delete("/api/posts/:id", controllers.post.delete);

// Comments //
app.get("/api/comments", controllers.comment.index);
app.get("/api/comments/:post_id/", controllers.comment.getComments);
app.post("/api/comments/create/:user_id/:post_id", controllers.comment.create);
app.delete("/api/comments/:id", controllers.comment.delete)
app.delete("/api/comments/post/:post_id", controllers.comment.deleteMany);

// // Followers //
// // app.get("/api/followers", controllers.followers.show);

// // Following //
// // app.get("/api/following", controllers.following.show);

// // Likes //
// // app.get("/api/likes", controllers.likes.show);

// Server //
server = app.listen(port, () => console.log(`HTTP server listening at port ${port}`));