let db = require("./models");
// const User = db.User;

// let avatars = [
//   {
//     user: ,
//     avatarName: ''
//   }
// ]


// let userList = [
//   {
//     name: 'Amanda Kissnhug',
//     username: 'amandak1',
//     password: 'amandak123',
//     email: 'amandak@amandak.com',
//     profile_url: 'https://picsum.photos/200/300/?random',
//     aboutMe: 'I am lonely and live with my 12 cats',
//   },
//   {
//     name: 'Ben Dover',
//     username: 'bend1',
//     password: 'bend123',
//     email: 'bend@bend.com',
//     profile_url: 'https://picsum.photos/200/300/?random',
//     aboutMe: 'I am a trucker with a sensitive side',
//   },
//   {
//     name: 'Arthur Rightus',
//     username: 'arthurr1',
//     password: 'arthurr123',
//     email: 'arthurr@arthurr.com',
//     profile_url: 'https://picsum.photos/200/300/?random',
//     aboutMe: 'I am super old and crotchety',
//   },
// ]

// let postList = [
//   {
//     post_url: 'https://picsum.photos/200/300/?random',
//     title: 'I love my cats',
//     body: 'Cats, cats, cats, cats, cats, cats, cats, cats, cats!',
//     location: 'My basement',
//     user: 'Amanda Kissnhug',
//   },
//   {
//     post_url: 'https://picsum.photos/200/300/?random',
//     title: 'Truck-life',
//     body: 'On the road again! Just cannot wait to get on the road again',
//     location: 'My truck',
//     user: 'Ben Dover',
//   },
//   {
//     post_url: 'https://picsum.photos/200/300/?random',
//     title: 'My joints',
//     body: 'I can feel my joints cracking as I take this picture.',
//     location: 'My rocking chair',
//     user: 'Arthur Rightus',
//   }
// ]

// let commentList = [
//   {
//     body: 'You need to get out more!',
//     user: 'Amanda Kissnhug',
//     post: 'I love my cats',
//   },
//   {
//     body: 'Please do not post anymore pictures!',
//     user: 'Ben Dover',
//     post: 'Truck-life',
//   },
//   {
//     body: 'Take a nap.',
//     user: 'Arthur Rightus',
//     post: 'My joints',
//   },
// ];


// db.User.deleteMany({}, (err, users) => {
//   db.User.create(userList, (err, users) => {
//     if (err) return console.log('error', err);
//     console.log('All users: ', users);
//     console.log('Created ', users.length, 'users');
//   });
// });
// db.Image.deleteMany({}, (err, images) => {

// });

db.Image.deleteMany({}, (err, posts) => {
  // db.Post.create(postList, (err, posts) => {
  //   if (err) {
  //     return console.log('error', err);
  //   }
  //   console.log('All posts: ', posts);
  //   console.log('Created ', posts.length, 'posts');
  // });
  process.exit();
});

// db.Comment.deleteMany({}, (err, comments) => {
//   if (err) {
//     console.log('error', err);
//     return;
//   }
// });

// db.ProfileImage.deleteMany({}, (err, comments) => {
//   if (err) {
//     console.log("Error", err);
//     return;
//   }
//   process.exit();
// });