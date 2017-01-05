const db = require('../config');
// const Friend = require('../models/friend.js');

const Friends = db.Collection.extend({
  model: 'Friend'
});

module.exports = db.collection('Friends', Friends);

