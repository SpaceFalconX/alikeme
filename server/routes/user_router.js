const express = require('express');
const router = express.Router();
const User = require('../database/models/user.js');
const Users = require('../database/collections/users.js');
const Follower_following = require('../database/models/follower_following.js');
const Followers_followings = require('../database/collections/followers_followings.js');
const Promise  = require('bluebird');

// Fetch all user posts by user id
router.route('/posts/:id')
	.get((req, res) => {
		User.where('id', req.params.id)
		.fetch({withRelated: ['posts.category', 'posts.tags']})
		.then((user) => {
			res.json(user)
 	  })
	});

router.route('/matches/:username')
	.get((req, res) => {
		User.where({username: req.params.username})
		.fetch().then((user) => {
			let parsedUser = user.toJSON()
			user.generateMatches().then(result => res.json(result.slice(0, 4)))
		})
  });



// Fetch all user's following by user id
router.route('/following/:id')
	.get((req, res) => {
		User.where('id', req.params.id)
		.fetch({withRelated: ['following']})
		.then((user) => {
		  res.json(user.related('following'))
		})
		.catch((err) => {
			console.error(err);
			res.json({error: {message: err.message}})
		});
	})

// Fetch all user's followers by user id
router.route('/followers/:id')
	.get((req, res) => {
		User.where('id', req.params.id)
		.fetch({withRelated: ['followers']})
		.then((user) => {
		  res.json(user.related('followers'))
		})
		.catch((err) => {
			console.error(err);
			res.json({error: {message: err.message}})
		});
	})

// Follow a user
router.route('/follow')
	.post((req, res) => {
		const {follower_id, followed_id} = req.body;
		if(follower_id === followed_id) {
			return res.status(400).send({error: "Cannot follow yourself."})
		}
		User.forge({id: follower_id})
		.fetch({require: true})
		.then((follower) => {
			User.forge({id: followed_id})
			.fetch({require: true})
			.then((followed) => {
				follower.following().attach(followed)
				.then(() => { res.sendStatus(201) })
				.catch((err) => { res.status(400).send({error: err.message})})
			})
			.catch((err) => {
				res.status(400).send({error: err.message})
			})
		})
		.catch((err) => {
			res.status(400).send({error: err.message})
		})
	})

module.exports = router;

