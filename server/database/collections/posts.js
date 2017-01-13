const db = require('../config');
const Post = require('../models/post.js');

const Posts = db.Collection.extend({
  model: Post,
  initialize () {
    this.on('fethcing', this.order)
  },
  order () {
    console.log("FETCHING FIRES? Posts")
    this.orderBy('-created_at');
  }
});

module.exports = db.collection('Posts', Posts);


