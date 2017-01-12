const db = require('../config.js');
const bcrypt	= require('bcryptjs')
const Post = require('./post.js')
const Users = require('../collections/users.js')
const Follower_following = require('./follower_following.js')
const _ = require('lodash');

const User = db.Model.extend({
	tableName: 'users',
	hasTimestamps: true,
	// initialize () {
	// 	this.on('creating', this.hashPassword);
	// },
	posts () {
    return this.hasMany('Post');
  },
  following () {
  	return this.belongsToMany('User').through('Follower_following', 'follower_id', 'followed_id' )
  },
  followers () {
  	return this.belongsToMany('User').through('Follower_following', 'followed_id', 'follower_id' )
  },
  starredPosts () {
    return this.belongsToMany('Post', 'posts_stars', 'user_id', 'star_id')
  },

  generateMatches () {
    const context = this;
    return this.fetchAll({columns: ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'emotionalRange', 'username', 'id']})
    .then((response) => {
      const allUsers = response.toJSON();
      const distanceMap = allUsers.map((otherUser, index)=> {
        let distance = 0.0;
        for(var trait in otherUser) {
          if(trait !== 'username' && trait !== 'id') {
            distance += Math.pow((context.get(trait) - otherUser[trait]), 2);
          }
        }
        return {distance: distance, username: otherUser.username, id: otherUser.id };
      })
      return _.sortBy(distanceMap, 'distance');
    })
  },

  /* UNCOMMENT AFTER SEED DATA NO LONGER NEEDED */
	// hashPassword () {
	// 	const context = this;
	// 	return new Promise((resolve, reject) => {
	// 		bcrypt.hash(this.get('password'), 8, (err, hash) => {
	// 			err? reject(err) : resolve(hash);
	// 		})
	// 	})
	// 	.then((hash) => { context.set('password', hash); })
	// },
	checkPassword (password) {
		const hash = this.get('password');
    return new Promise((resolve, reject) => {
      if(password === hash) {
        resolve(true);
      } else {
        reject(false);
      }
    })
		// return new Promise((resolve, reject) => {
		// 	bcrypt.compare(password, hash, (err, match) => {
		// 		match? resolve(match) : reject(match);
		// 	})
		// })
	}
})

module.exports = db.model('User', User);

