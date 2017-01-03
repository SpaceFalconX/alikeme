const db = require('../config.js');
const Post = require('./post.js')

const Category = db.Model.extend({
  tableName: 'categories',
  hasTimestamps: true,
  posts () {
    return this.hasMany('Post');
  }
})

module.exports = db.model('Category', Category);

