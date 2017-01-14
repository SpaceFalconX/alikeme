const db = require('../config.js');

const User = require('./user.js')
const Category = require('./category.js')
const Tag = require('./tag.js')
const Posts_tag = require('./posts_tag.js')
const Post_stars = require('./post_star.js')


const Post = db.Model.extend({
  tableName: 'posts',
  hasTimestamps: true,
  user () {
    return this.belongsTo('User');
  },
  category () {
    return this.belongsTo('Category');
  },
  stars () {
    return this.belongsToMany('User', 'posts_stars', 'star_id', 'user_id');
  },
  tags () {
  	return this.belongsToMany('Tag').through('Posts_tag')
  }
})

module.exports = db.model('Post', Post);

