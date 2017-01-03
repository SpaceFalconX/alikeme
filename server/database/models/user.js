const db = require('../config.js');
const bcrypt	= require('bcryptjs')
const Post = require('./post.js')

const User = db.Model.extend({
	tableName: 'users',
	hasTimestamps: true,
	initialize () {
		this.on('creating', this.hashPassword);
	},
	posts () {
    return this.hasMany('Post');
  },
	hashPassword () {
		const context = this;
		return new Promise((resolve, reject) => {
			bcrypt.hash(this.get('password'), 8, (err, hash) => {
				err? reject(err) : resolve(hash);
			})
		})
		.then((hash) => { context.set('password', hash); })
	},
	checkPassword (password) {
		const hash = this.get('password');
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, hash, (err, match) => {
				match? resolve(match) : reject(match);
			})
		})
	}
})

module.exports = db.model('User', User);

