const db = require('../config.js');
const Post = require('./post.js')

const Category = db.Model.extend({
  tableName: 'categories',
  posts () {
    return this.hasMany('Post');
  }
})

module.exports = db.model('Category', Category);

