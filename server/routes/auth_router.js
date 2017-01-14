const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const readText = require('../utils/readText.js')
const getTwitterFeed = require('../utils/twitHelper.js')

const config = require('../config/config.js');
const User = require('../database/models/user.js');
const Users = require('../database/collections/users.js');

const router = express.Router();

router.post('/signup', (req, res) => {
	const {
		username, password, email, twitterLink, facebookLink,
		agreeableness, conscientiousness, emotionalRange, extraversion, openness
	} = req.body
	new User ({username: username})
	.fetch()
	.then((user) => {
		if(user) {
			return res.sendStatus(401);
		} else {
			const newUser = new User({
				username, email, password, twitterLink, facebookLink,
				agreeableness, conscientiousness, emotionalRange, extraversion, openness
			})
			.save()
			.then((user) => {
				const token = generateToken(user);
				console.log(`SIGNUP SUCCESS: ${user.get('username')}`)
				res.status(201).send({token});
			})
		}
	})
})

router.post('/login', (req, res) => {
	console.log('here')
	let {username, password} = req.body;
	new User ({username: username})
	.fetch({withRelated: ['posts', 'starredPosts']})
	.then((user) => {
		if(!user) {
			res.status(400).send({error: "go to signup"})
		} else {
			user.checkPassword(password)
			.then((match) => {
				const userPosts = user.toJSON().posts.map((post) => post.content).join('')
				console.log(userPosts)
				const options = {
					screen_name: user.toJSON().twitterLink,
					include_rts: false,
					count: 100
				}
				getTwitterFeed(options)
				.then((feed) => feed.concat(userPosts))
				.then((result)=> readText(result))
				.then((stats) => user.save(stats))
				.then(() => {
					console.log(`LOGIN SUCCESS WATSON: ${user.get('username')}`)
					const token = generateToken(user);
					res.status(201).send({token});
				})
				.catch(() => {
					console.log(`LOGIN FAIL WATSON: ${user.get('username')}`)
					const token = generateToken(user);
					res.status(201).send({token});
				})


				// 	if(stats) {
				// 		console.log("STATS SAVED SUCCESFULLY", stats.agreeableness)
				// 		user.save(stats)
				// 		.then((user)=> {
				// 			const token = generateToken(user);
				// 			res.status(201).send({generateToken(user)});
				// 		})
				// 	} else {
				// 		console.log("NEED MORE TEXT FROM USER")
				// 		const token = generateToken(user)
				// 		res.status(201).send({token});
				// 	}
				// })
				// .catch((err) => console.error(err))
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


				// readText(userPosts).then((analysis) => {
				// 	if(analysis === 'error') {
				// 		const token = generateToken(user);
				// 		console.log(`LOG IN SUCCESS BUT NO TEXT UPDATE: ${user.get('username')}`)
				// 		res.status(200).send({token});
				// 	} else {
				// 		const options = {
				// 			screen_name: user.toJSON().twitterLink,
				// 			include_rts: false,
				// 			count: 100
				// 		}
				// 		readTwitter(options).then((twitterAnalysis) => {
				// 			let updatedPersonality = {
				// 				openness: (twitterAnalysis.openness + analysis.openness)/2,
				// 				conscientiousness: (twitterAnalysis.conscientiousness + analysis.conscientiousness)/2,
				// 				extraversion: (twitterAnalysis.extraversion + analysis.extraversion)/2,
				// 				agreeableness: (twitterAnalysis.agreeableness + analysis.agreeableness)/2,
				// 				emotionalRange: (twitterAnalysis.emotionalRange + analysis.emotionalRange)/2
				// 			}
				// 			if(isNaN(updatedPersonality.openness)) {
				// 				const token = generateToken(user);
				// 				console.log(`LOG IN SUCCESS BUT NO TWITTER UPDATE: ${user.get('username')}`)
				// 				res.status(200).send({token});
				// 			} else {
				// 				user.save({
				// 					openness: updatedPersonality.openness,
				// 					conscientiousness: updatedPersonality.conscientiousness,
				// 					extraversion: updatedPersonality.extraversion,
				// 					agreeableness: updatedPersonality.agreeableness,
				// 					emotionalRange: updatedPersonality.emotionalRange
				// 				})
				// 				.then((success) => {
				// 					const token = generateToken(user);
				// 					console.log(`LOG IN SUCCESS: ${user.get('username')}`)
				// 					res.status(200).send({token});
				// 				})
				// 			}
				// 		})
				// 	}
				// })
module.exports = router;
