const db = require('../config.js');
const User = require('./user.js')
const Category = require('./category.js')
const Tag = require('./tag.js')
const Posts_tags = require('./posts_tags.js')


const Post = db.Model.extend({
  tableName: 'posts',
  hasTimestamps: true,  
  user () {
    return this.belongsTo('User');
  },
  category () {
    return this.belongsTo('Category');
  },
  tags () {
  	return this.belongsToMany('Tag').through('Posts_tags')
  }
}, {  
    dependents: ['tags']
})

module.exports = db.model('Post', Post);

