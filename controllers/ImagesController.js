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
}).single("myImage");
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

// GET /api/profileimages
const profileImages = (req, res) => {
  db.ProfileImage.find({})
    .populate("user")
    .exec((err, foundImages) => {
      if (err) {
        console.log(err);
        return;
      }
      res.json(foundImages);
    });
}

// GET /api/profileimages/:user_id
const profileImage = (req, res) => {
  let id = req.params.user_id;
  db.ProfileImage.find({ user: id }, (err, foundImage) => {
    if (err) {
      console.log(err);
      return;
    }
    res.json(foundImage);
  })
}

// POST /api/:user_id/upload
const uploadImage = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.json({
        error: err,
        msg: "Error Uploading Image"
      })
    } else {
      db.ProfileImage.findOneAndRemove({ user: req.params.user_id }, (err, foundImage) => {
        if (err) {
          console.log(err);
          return;
        }
      })

      console.log("REQ FILE", req.file);
      // create new profile image
      let newImage = new db.ProfileImage({
        user: req.params.user_id,
        name: req.file.filename,
        mimetype: req.file.mimetype,
      });
      newImage.save();
      res.json(newImage)
    }
  })
}

module.exports = {
  index: profileImages,
  show: profileImage,
  upload: uploadImage,
}