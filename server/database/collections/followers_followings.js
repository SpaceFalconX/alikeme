const db = require('../config');
const Follower_following = require('../models/follower_following.js')

const Followers_followings = db.Collection.extend({
  model: Follower_following,
  countFollowers (id) {
    this.forge()
    .query('where','follower_id', '=',id)
    .count()
  },
  countFollowing(id) {
    this.forge()
    .query('where','following_id', '=', id)
    .count()
  }
});

module.exports = db.collection('Followers_followings', Followers_followings);
