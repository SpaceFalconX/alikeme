const db = require('../config.js');

const Friend = db.Model.extend({
  tableName: 'users',
})

module.exports = Friend;

