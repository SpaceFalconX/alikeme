const db = require('../config');
const Post_star = require('../models/post_star.js');

const Post_stars = db.Collection.extend({
  model: Post_star,
  user () {
    return this.belongsTo('User')
  },
  post () {
    return this.belongsTo('Post')
  }
});

module.exports = db.collection('Post_stars', Post_stars);