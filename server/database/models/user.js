const db = require('../config.js');
const bcrypt	= require('bcryptjs')

const User = db.Model.extend({
	tableName: 'users',
	hasTimestamps: true,
	initialize () {
		this.on('creating', this.hashPassword);
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

module.exports = User;


// var User = db.Model.extend({

//   tableName: 'users',
//   hasTimestamps: true,
//   initialize: function() {
//     this.on('creating', this.hashPassword);
//   },
//   comparePassword: function(attemptedPassword, callback) {
//     bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
//       callback(isMatch);
//     });
//   },
//   hashPassword: function() {
//     var cipher = Promise.promisify(bcrypt.hash);
//     return cipher(this.get('password'), null, null).bind(this)
//       .then(function(hash) {
//         this.set('password', hash);
//       });
//   }
//   });