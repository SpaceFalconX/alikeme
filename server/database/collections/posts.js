const db = require('../config');
const Post = require('../models/post.js');

const Posts = db.Collection.extend({
  model: Post
});

module.exports = db.collection('Posts', Posts);


