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

// GET /api/follows/
const getAllFollow = (req, res) => {
  db.Follow.find({}, (err, follow) => {
    if (err) {
      console.log(err);
      return;
    }
    res.json(follow);
  })
}

// GET /api/follows/:followee_id/:follower_id
// Check if someone is following somebody
const findFollowModel = (req, res) => {
  db.Follow.find({ follower: req.params.follower_id, followee: req.params.followee_id }, (err, foundFollow) => {
    if (err) throw Error(err);

    res.json(foundFollow);
  })
}

// GET /api/follows/:followee_id
// Check for all people that is following somebody
const findFollowers = (req, res) => {
  db.Follow.find({ followee: req.params.followee_id }, (err, foundFollow) => {
    if (err) throw Error(err);

    res.json(foundFollow);
  })
}

// GET /api/follows/:follower_id
// Check for all people that somebody is following
const findFollowing = (req, res) => {
  db.Follow.find({ follower: req.params.follower_id }, (err, foundFollow) => {
    if (err) throw Error(err);

    res.json(foundFollow);
  })
}



module.exports = {
  getAll: getAllFollow,
  getOneFollow: findFollowModel,
  findFollowers: findFollowers,
  findFollowing: findFollowing,
  create: store,
  delete: destroy,
}