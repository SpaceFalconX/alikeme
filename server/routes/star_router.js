const express = require('express');
const router = express.Router();
const User = require('../database/models/user.js');
const Users = require('../database/collections/users.js');
const Post = require('../database/models/post.js');
const Posts = require('../database/collections/posts.js');
const PostStar = require('../database/models/post_star.js');
const PostStars = require('../database/collections/post_stars.js');
const Promise  = require('bluebird');

// fetch all data from join table
router.get('/join/all', (req, res) => {
  PostStar.fetchAll()
  .then((result) => res.send(result))
  .catch((err) => res.send(err))
});

// fetch join table data for specific users
router.get('/join/:userid', (req, res) => {
  const userid = parseInt(req.params.userid, 10);
  //console.log("USERID", userid)
  PostStars.forge()
  .query({where: {user_id: req.params.userid}})
  .fetch()
  .then((result) => res.send(result))
  .catch((err) => res.send(err))
});

// Fetch a post by id and all the users that starred it
router.get('/posts/:postid', (req, res) => {
  Post.forge({id: req.params.postid})
  .fetch({withRelated: ['stars']})
  .then((post) => res.send(post))
  .catch((err) => res.send(err))
});

// Fetch a user by id and all the posts the user starred
router.get('/users/:userid', (req, res) => {
  const userid = parseInt(req.params.userid, 10);
  User.forge({id: userid})
  .fetch({withRelated: ['starredPosts']})
  .then((user) => res.send(user))
  .catch((err) => res.send(err))
});

// Star a post
router.post('/post',(req, res) => {
  const {postid, userid, flag} = req.body;
  new Post({id: postid})
  .fetch()
  .then((post) => (
    new User({id: userid})
    .starredPosts()
    .attach(post)
    .then((user) => {
      //console.log("FLAG server", flag)
      post.attributes.stars_count++;
      post.save()
        .then((post) => res.send("Starred post!"), post.stars_count)
        .catch((err) => res.send(err))
    })
  ))
  .catch((err) => res.send(err))
})

router.post('/post/unstar',(req, res) => {
  const {postid, userid, flag} = req.body;
  new Post({id: postid})
  .fetch()
  .then((post) => (
    new User({id: userid})
    .starredPosts()
    .detach(post)
    .then((user) => {
      //console.log("FLAG server", flag)
      post.attributes.stars_count--;
      post.save()
        .then((post) => res.send("Starred post!"), post.stars_count)
        .catch((err) => res.send(err))
    })
  ))
  .catch((err) => res.send(err))
})


module.exports = router;