const db = require('../config.js');
const Post = require('./post.js')
const Tag = require('./tag.js')

const Posts_tag = db.Model.extend({
  tableName: 'posts_tags'
})

module.exports = db.model('posts_tags', Posts_tag);

