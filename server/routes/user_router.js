const express = require('express');
const router = express.Router();
// const db = require('../database/config.js')
const User = require('../database/models/user.js');
const Users = require('../database/collections/users.js');

router.route('/user/posts/:id')
	// Fetch all user posts by user id
	.get((req, res) => {
		User.where('id', req.params.id)
		.fetch({withRelated: ['posts']})
		.then((user) => {
			console.log('USER', user, req.params.id)
		  console.log(user.related('posts').toJSON());
		  res.json({user})
		})
		.catch((err) => {
			console.error(err);
			res.json({error: {message: err.message}})
		});
	})

module.exports = router;

