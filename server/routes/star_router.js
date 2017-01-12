const express = require('express');
const router = express.Router();
const User = require('../database/models/user.js');
const Users = require('../database/collections/users.js');
const Post = require('../database/models/post.js');
const Posts = require('../database/collections/posts.js');
const PostStar = require('../database/models/post_star.js');
const PostStars = require('../database/collections/post_stars.js');
const Promise  = require('bluebird');

// Fetch all the users that sarred a particular post
router.get('/post/:id', (req, res) => {
  Post.forge({id: req.params.id})
  .fetch({withRelated: ['stars']})
  .then((model) => res.send(model))
  .catch((err) => res.send(err))
});

// Fetch all the particular posts starred by a parctilaur user
router.get('/user/:id', (req, res) => {
  User.forge({id: req.params.id})
  .fetch({withRelated: ['starredPosts']})
  .then((model) => res.send(model))
  .catch((err) => res.send(err))
});

module.exports = router;