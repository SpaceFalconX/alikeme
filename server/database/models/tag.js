const db = require('../config.js');
const Post = require('./post.js')
const Category = require('./category.js')

const Tag = db.Model.extend({
  tableName: 'tags',
  hasTimestamps: true,
  posts () {
    return this.belongsToMany('Post');
  },
  category () {
    return this.belongsTo('Category');
  }
},  {
 		dependents: ['posts']
})

module.exports = db.model('Tag', Tag);

