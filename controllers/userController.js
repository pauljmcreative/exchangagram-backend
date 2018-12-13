let db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// GET /api/users //
const getUsers = (req, res) => {
  jwt.verify(req.token, "secretKey", (err, authData) => {
    if (err) {
      res.send({ err: true, message: `No users found.` });
    } else {
      db.User.find({}, (err, users) => {
        if (err) {
          console.log(err);
          return;
        }
        res.json({
          users: users,
          authData
        });
      });
    }
  });
  db.User.find({}, (err, users) => {
    if (err) {
      console.log(err);
      return;
    }
    res.json(users)
  })
};

// GET /api/users/:id //
const getUser = (req, res) => {
  let id = req.params.id;
  // db.User.findById(id, (err, user) => {
  //   if (err) {
  //     console.log(err);
  //     return;
  //   }
  //   res.json(user);
  // });
  jwt.verify(req.token, "secretKey", (err, authData) => {
    if (err) {
      res.send({ err: true, message: `No user found.` });
    } else {
      db.User.findById(req.params.id, (err, user) => {
        if (err) {
          console.log(err);
          return;
        }
        if (user) {
          let userInfo = {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            aboutMe: user.aboutMe,
            joinDate: user.joinDate
          };
          res.json({
            user: userInfo,
            authData
          });
        }
      });
    }
  });

}


// POST /api/users/create
const createUser = (req, res) => {
  db.User.findOne({ username: req.body.username }, (err, foundUserName) => {
    if (err) {
      console.log(err);
      return;
    }
    // if username is found, return bad request
    if (foundUserName) {
      console.log("userName error");
      res.status(400).json({ error: "Username already exists" });
    } else {
      db.User.findOne({ email: req.body.email }, (err, foundUserEmail) => {
        if (err) {
          console.log(err);
          return;
        }
        // if email is found, return bad request
        if (foundUserEmail) {
          console.log("userEmailerror");
          console.log(foundUserEmail);
          res.status(400).send({ error: "Email already in use" });
        } else {
          // create new user
          let newUser = new db.User({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
          });


          // salt and hash password with bcryptjs //
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) {
                console.log("Error hashing password: ", err);
                return;
              }
              newUser.password = hash;
              newUser.save((err, user) => {
                if (err) {
                  console.log(err);
                  return user;
                }
              });
              // res.json(newUser);
            });
          });

          let newDefaultImage = new db.Avatar({
            avatarName: "default-avatar.png",
          })

          newDefaultImage.user = newUser._id;

          newDefaultImage.save();

          let user = {
            id: newUser._id,
            name: newUser.name,
            username: newUser.username,
            email: newUser.email,
            aboutMe: newUser.aboutMe,
            joinDate: newUser.joinDate
          };

          jwt.sign({ user: user }, "secretKey", (err, token) => {
            if (err) {
              console.log(err);
              return;
            }
            res.json({
              token: token
            });
          });
        }
      });
    }
  });
};

// POST /api/users/login //
const userLogin = (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  db.User.findOne({ username: username }, (err, foundUser) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log(foundUser);
    console.log(req.body)
    // check for user
    if (foundUser) {
      // check password
      console.log("FOUNDs")
      bcrypt
        .compare(password, foundUser.password)
        .then(isMatch => {
          if (isMatch) {
            console.log("BCRYPT")
            // user confirmed, send web token
            let user = {
              id: foundUser._id,
              name: foundUser.name,
              username: foundUser.username,
              email: foundUser.email,
              joinDate: foundUser.joinDate
            };

            jwt.sign({ user: user }, "secretKey", (err, token) => {
              if (err) {
                console.log(err);
                return;
              }
              console.log("JWT")
              res.json({
                token: token
              });
            });
          }
        });
    } else {
      res.status(404).json({ message: "No user found" });
    }
  });
};

// PUT / api / users /: id //
const updateUser = (req, res) => {
  let id = req.params.id;
  let update = req.body;
  console.log("IN PUT", id, update);
  // db.User.findByIdAndUpdate(id, update, { new: true }, (err, updatedUser) => {
  //   if (err) {
  //     console.log(error);
  //     return;
  //   }
  //   let user = {
  //     id: updatedUser._id,
  //     name: updatedUser.name,
  //     username: updatedUser.username,
  //     email: updatedUser.email,
  //     joinDate: updatedUser.joinDate
  //   };

  //   jwt.sign({ user: user }, "secretKey", (err, token) => {
  //     if (err) {
  //       console.log(err);
  //       return;
  //     }
  //     console.log("JWT")
  //     res.json({
  //       token: token
  //     });
  //   });
  // })
  jwt.verify(req.token, "secretKey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      let id = req.params.id;
      let update = req.body;
      db.User.findByIdAndUpdate(
        id,
        update,
        { new: true },
        (err, user) => {
          if (err) {
            console.log(err);
            return;
          }
          let userInfo = {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            aboutMe: user.aboutMe,
            joinDate: user.joinDate
          }
          res.json({
            user: userInfo,
          });
        }
      );
    }
  });
};

module.exports = {
  index: getUsers,
  show: getUser,
  create: createUser,
  login: userLogin,
  update: updateUser
};
