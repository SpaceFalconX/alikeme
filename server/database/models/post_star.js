const db = require('../config.js');
const Post = require('./post.js')
const User = require('./user.js')

const Post_star = db.Model.extend({
  tableName: 'posts_stars'
})

module.exports = db.model('Post_star', Post_star);

