const db = require('../config.js');
const Post = require('./post.js')
const Category = require('./category.js')
const Posts_tags = require('./posts_tags.js')

const Tag = db.Model.extend({
  tableName: 'tags',
  posts () {
    return this.belongsToMany('Post').through('Posts_tags')
  }
},  {
 		dependents: ['posts']
})

module.exports = db.model('Tag', Tag);

