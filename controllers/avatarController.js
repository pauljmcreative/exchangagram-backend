const multer = require("multer");
const path = require("path");

// load in models
let db = require("../models");

// Set Storage Engine
const storage = multer.diskStorage({
  destination: 'public/uploads',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// init Upload
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
}).single("myAvatar");
//this is the form name!!! CHANGE WHEN MAKE FORM IF NEEDED

// file upload check
const checkFileType = (file, cb) => {
  // allowed file tpyes
  const filetypes = /jpeg|jpg|gif|png/;
  // check file uplaod type
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // check mimetype
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only.')
  }
}

// GET /api/avatars
const getAvatars = (req, res) => {
  db.Avatar.find({})
    // .populate("post")
    .exec((err, foundAvatars) => {
      if (err) {
        console.log(err);
        return;
      }
      res.json(foundAvatars);
    });
}

// GET /api/avatars/:user_id
const showAvatar = (req, res) => {
  let userId = req.params.user_id;
  db.Avatar.find({ user: userId }, (err, foundAvatar) => {
    if (err) {
      console.log(err);
      return;
    }
    res.json(foundAvatar);
  })
}

// POST /api/:user_id/upload
const uploadAvatar = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.json({
        error: err,
        msg: "Error Uploading Avatar"
      })
    } else {
      // db.Avatar.findOneAndRemove({ user: req.params.user_id }, (err, foundAvatar) => {
      //   if (err) {
      //     console.log(err);
      //     return;
      //   }
      // })

      console.log("REQ FILE", req.file);
      // create new Avatar
      let newAvatar = new db.Avatar({
        user: req.params.user_id,
        avatarName: req.file.filename,
      });
      newAvatar.save();
      res.json(newAvatar)
    }
  })
}

module.exports = {
  index: getAvatars,
  show: showAvatar,
  // upload: uploadAvatar,
}

