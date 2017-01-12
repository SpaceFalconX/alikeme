const db = require('../config.js');
const User = require('./user.js')

const Follower_following = db.Model.extend({
  tableName: 'followers_following',
  following () {
    return this.belongsTo('User');
  },
  follower () {
    return this.belongsTo('User')
  },

  countFollowers () {
    this.forge()
    .query('where','follower_id', '=', req.params.id)
    .count()
  },
  countFollowing() {
    this.forge()
    .query('where','following_id', '=', req.params.id)
    .count()
  }
})



module.exports = db.model('Follower_following', Follower_following);

