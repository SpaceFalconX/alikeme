const db = require('../config.js');
const Post = require('./post.js')
const User = require('./user.js')

const Post_star = db.Model.extend({
  tableName: 'posts_stars',
  // post () {
  //   return this.belongsTo('Post');
  // },
  // star () {
  //   return this.belongsTo('User')
  // }
})

module.exports = db.model('Post_star', Post_star);

