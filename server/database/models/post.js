const db = require('../config.js');
const User = require('./user.js')
const Category = require('./category.js')

const Post = db.Model.extend({
  tableName: 'posts',
  hasTimestamps: true,
  user () {
    return this.belongsTo('User');
  },
  category () {
    return this.belongsTo('Category');
  }
})

module.exports = db.model('Post', Post);

