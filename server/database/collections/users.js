const db = require('../config');
const User = require('../models/user.js');

const Users = db.Collection.extend({
  model: User
});

module.exports = db.collection('Users', Users);

