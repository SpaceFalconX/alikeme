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
  // countFollowers () {
  //   var qDB = this.collection().query();
  //   var qRaw = 'COUNT(followers_following.*) AS followers_count, follower_id, user.*';
  //   return qDB.join('user', 'follower.id', '=', 'followers_following.follower_id').
  //     select(qDB.knex.raw(qRaw)).
  //     groupBy('followers_following.follower_id', 'user.id')
  // }
});

module.exports = db.collection('Followers_followings', Followers_followings);
