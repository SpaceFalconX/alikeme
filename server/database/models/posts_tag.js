const db = require('../config.js');
const Post = require('./post.js')
const Tag = require('./tag.js')

const Post_tag = db.Model.extend({
  tableName: 'posts_tags',
  post () {
    return this.belongsTo('Post');
  },
  tag () {
  	return this.belongsTo('Tag')
  }
})

module.exports = db.model('Post_tag', Post_tag);

