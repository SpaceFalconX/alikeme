const express = require('express');
const router = express.Router();
const User = require('../database/models/user.js');
const Users = require('../database/collections/users.js');
const Friend = require('../database/models/friend.js');
// const Friends = require('../database/collections/friends.js');


router.route('/user/posts/:id')
	// Fetch all user posts by user id
	.get((req, res) => {
		User.where('id', req.params.id)
		.fetch({withRelated: ['posts']})
		.then((user) => {
		  console.log(user.related('posts').toJSON());
		  res.json(user.related('posts'))
		})
		.catch((err) => {
			console.error(err);
			res.json({error: {message: err.message}})
		});
	})

router.route('/user/friends')
	// Fetch all friends by user id
	.get((req, res) => {
		User.where('id', req.params.id)
		.fetch({withRelated: ['posts']})
		.then((user) => {
		  console.log(user.related('posts').toJSON());
		  res.json(user.related('posts'))
		})
		.catch((err) => {
			console.error(err);
			res.json({error: {message: err.message}})
		});
	})

	// Fetch all friends by user id
	
router.route('/user/addfriend')
	.post((req, res) => {
		const {user_id, friend_id} = req.body
		User.where('id', user_id)
		.fetch()
		.then((user) => {
			new Friend({id: friend_id}).attach(user);
			res.json(user);
		})
	})
// 	var admin1 = new Admin({username: 'user1', password: 'test'});
// var admin2 = new Admin({username: 'user2', password: 'test'});

// Promise.all([admin1.save(), admin2.save()])
//   .then(function() {
//     return Promise.all([
//     new Site({id: 1}).admins().attach([admin1, admin2]),
//     new Site({id: 2}).admins().attach(admin2)
//   ]);


module.exports = router;

