const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const config = require('../config/config.js');
const User = require('../database/models/user.js');
const Users = require('../database/collections/users.js');

const router = express.Router();

router.post('/signup', (req, res) => {
	const {username, password, email, twitterLink, facebookLink} = req.body
	console.log('REQ.BODY', req.body)
	new User ({username: username})
	.fetch()
	.then((user) => {
		if(user) {
			return res.sendStatus(401);
		} else {
			const newUser = new User({ username, email, password, twitterLink, facebookLink})
			.save()
			.then((user) => {
				// if(twitterLink !== 'NULL') {
				// 	// CALL THE GET TWITTER FEED FUNC
				// }
				const token = generateToken(user);
				console.log(`SIGNUP SUCCESS: ${user.get('username')}`)
				res.status(201).send({token});
			})
		}
	})
})

router.post('/login', (req, res) => {
	let {username, password} = req.body;
	new User ({username: username})
	.fetch()
	.then((user) => {
		if(!user) {
			res.status(400).send({error: "go to signup"})
		} else {
			user.checkPassword(password)
			.then((match) => {
				console.log("MATHC", match)
					const token = generateToken(user);
					console.log(`LOG IN SUCCESS: ${user.get('username')}`)
					res.status(200).send({token});
				// } else {
				// 	res.status(403).json({error: "incorrect password"})
				// }

			})
			// .catch((err)=> {
			// 	res.status(401).json({error: "incorrect password"})
			// })
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
