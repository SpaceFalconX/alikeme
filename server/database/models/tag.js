const db = require('../config.js');
const Post = require('./post.js')
const Category = require('./category.js')
const Posts_tag = require('./posts_tag.js')

const Tag = db.Model.extend({
  tableName: 'tags',
  posts () {
    return this.belongsToMany('Post').through(Posts_tag)
  }
})

module.exports = db.model('Tag', Tag);

