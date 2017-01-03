const db = require('../config.js');
const Post = require('./post.js')
const Tag = require('./tag.js')

const Posts_tags = db.Model.extend({
  tableName: 'posts_tags',
  post () {
    return this.belongsTo('Post');
  },
  tag () {
  	return this.belongsTo('Tag')
  }
})

module.exports = db.model('Posts_tags', Posts_tags);

