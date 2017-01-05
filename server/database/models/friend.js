const db = require('../config.js');

const Friend = db.Model.extend({
  tableName: 'friends',
})

module.exports = db.model('Friend', Friend);

