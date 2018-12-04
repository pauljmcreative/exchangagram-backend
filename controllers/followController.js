let db = require("../models");


store = (req, res) => {
  let follower = req.body.follower;
  let followee = req.params.followee_id;

  let follow = new db.Follow({
    follower: follower,
    followee: followee,
  });

  follow.save(function (err) {

    if (err) {
      return res.status(404).json({
        succes: false,
        status: 404,
        data: {},
        message: "There was an error trying follow the user."
      });
    }

    return res.status(200).json({

      success: true,
      status: 200,
      data: follow,
      message: 'Successfully followed user'

    });
  });
}

destroy = (req, res) => {
  let follower = req.params.followerid;
  let followee = req.params.id;

  Follow.remove({ 'follower': follower, 'followee': followee }, (err, result) => {

    if (err) {
      return res.status(404).json({
        success: false,
        status: 404,
        data: {},
        message: "Error removing record"
      });
    }


    return res.status(201).json({
      success: true,
      status: 201,
      data: {},
      message: "Successfully unfollowed user"
    })

  });
}

// GET /api/following/
const getAllFollow = (req, res) => {
  db.Follow.find({}, (err, follow) => {
    if (err) {
      console.log(err);
      return;
    }
    res.json(follow);
  })
}



module.exports = {
  get: getAllFollow,
  create: store,
  delete: destroy,
}