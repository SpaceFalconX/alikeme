const db = require('../config');
const Follower_following = require('../models/follower_following.js')

const Followers_followings = db.Collection.extend({
  model: 'Followers_following'
});

module.exports = db.collection('Followers_followings', Followers_followings);
