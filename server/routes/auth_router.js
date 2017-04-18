const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const gravatarGen = require('gravatar');

const util = require('../utils/util.js')
const config = require('../config/config.js');
const User = require('../database/models/user.js');
const Users = require('../database/collections/users.js');

const router = express.Router();

router.post('/signup', (req, res) => {
	const { username, password, email, twitterLink} = req.body
	new User ({username: username})
	.fetch()
	.then((user) => {
		if(user) {
			return res.status(401).send({error: "go to login"});
		} else  {
			util.getTwitterFeed(twitterLink)
			.then((feed) => util.readText(feed))
			.then((stats) => {
				new User({ username, email, password, twitterLink}).save(stats)
				.then((newUser) => {
					const gravatar = gravatarGen.url(email, {s: '100', r: 'x', d: 'retro'}, true);
					newUser.set({ gravatar })
					const token = generateToken(newUser);
					res.status(201).send({token});
				})
			})
			.catch((err) => res.status(400).send(err))
		}
	})
})

router.post('/login', (req, res) => {
	let {username, password} = req.body;
	new User ({username: username})
	.fetch({withRelated: ['posts', 'starredPosts']})
	.then((user) => {
		if(!user) {
			res.status(400).send({error: "go to signup"})
		} else {
			user.checkPassword(password)
			.then((match) => {
				const { posts, twitterLink } = user.toJSON();
				const userPosts = posts.map((post) => post.content).join('');
				util.getTwitterFeed(twitterLink)
				.then((feed) => feed.concat(userPosts))
				.then((result)=> util.readText(result))
				.then((stats) => user.save(stats))
				.then((userUpdate) => {
					const gravatar = gravatarGen.url(userUpdate.get('email'),
					{s: '100', r: 'x', d: 'retro'}, true);
					userUpdate.set({ gravatar })
					const token = generateToken(userUpdate);
					res.status(201).send({token});
				})
				.catch((err) => res.status(500).send({error: err.message}))
			})
		}
	})
})

// Helper function
const generateToken = (user) => {
	return jwt.sign({
		user: _.omit(user.attributes, 'password'),
	}, config.jwtSecret)
}

module.exports = router;
