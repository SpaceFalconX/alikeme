const db = require('../config.js');

const User = require('./user.js')
const Category = require('./category.js')
const Tag = require('./tag.js')
const Posts_tag = require('./posts_tag.js')

const Post = db.Model.extend({
  tableName: 'posts',
  hasTimestamps: true,  
  user () {
    return this.belongsTo('User', 'author');
  },
  category () {
    return this.belongsTo('Category', 'category_name');
  },
  tags () {
  	return this.belongsToMany('Tag').through('Posts_tag')
  }
})

module.exports = db.model('Post', Post);

