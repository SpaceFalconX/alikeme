const express = require('express');
const router = express.Router();
const User = require('../database/models/user.js');
const Users = require('../database/collections/users.js');
const Post = require('../database/models/post.js');
const Posts = require('../database/collections/posts.js');
const PostStar = require('../database/models/post_star.js');
const PostStars = require('../database/collections/post_stars.js');
const Promise  = require('bluebird');

// Fetch a post by id and all the users that starred it
router.get('/posts/:postid', (req, res) => {
  Post.forge({id: req.params.postid})
  .fetch({withRelated: ['stars']})
  .then((post) => res.send(post))
  .catch((err) => res.send(err))
});

// Fetch a user by id and all the posts the user starred
router.get('/users/:userid', (req, res) => {
  User.forge({id: req.params.userid})
  .fetch({withRelated: ['starredPosts']})
  .then((user) => res.send(user))
  .catch((err) => res.send(err))
});

// Star a post
router.post('/post',(req, res) => {
  console.log("req.body", req.body)
  const {postid, userid} = req.body;
  new Post({id: postid})
  .fetch()
  .then((post) => (
    new User({id: userid})
    .starredPosts()
    .attach(post)
    .then((user) => {
      post.attributes.stars_count++;
      post.save();
    })
    .then(() => res.send("Starred post!"))
    .catch((err) => res.send(err))
  ))
  .catch((err) => res.send(err))
})


module.exports = router;