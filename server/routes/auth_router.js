const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const readText = require('../utils/readText.js')
// const getTwitterFeed = require('../utils/twitHelper.js')

const config = require('../config/config.js');
const User = require('../database/models/user.js');
const Users = require('../database/collections/users.js');

const router = express.Router();


const getTwitterFeed = require('../config/twitter.js')

router.get('/tweeet/:twitterlink', (req, res) => {
	console.log("req.params.twitterlink", req.params.twitterlink)
	getTwitterFeed(req.params.twitterlink)
	.then((feed) => res.json(feed))
	.catch((err) => res.status(404).json(err))
})

router.post('/signup', (req, res) => {
	const { username, password, email, twitterLink} = req.body
	new User ({username: username})
	.fetch()
	.then((user) => {
		if(user) {
			return res.status(401).send("SIGNUP ERROR USER EXISTS");
		} else if(twitterLink) {
			getTwitterFeed(twitterLink)
			.then((feed) => readText(feed))
			.then((stats) => {
				console.log(stats)
				new User({ username, email, password, twitterLink})
				.save(stats)
				.then((newUser) => {
					console.log(`SIGNUP SUCCESS: ${newUser.get('username')}`)
					const token = generateToken(newUser);
					res.status(201).send({token});
				})
			})
			.catch(err => res.status(400).send(err))
		}
	})
})

				// var {openness, conscientiousness, extraversion, agreeableness, emotionalRange} = stats

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
			// getTwitterFeed(options)
			// 	.then((feed) => readText(feed))
 		// 		.then((stats) => {
 		// 			if(!stats) {
 		// 				var stats = {openness: 0, conscientiousness:0 , extraversion: 0, agreeableness: 0, emotionalRange:0}
 		// 			}
 		// 			var {openness, conscientiousness, extraversion, agreeableness, emotionalRange} = stats
 		// 			return new User({
 		// 				username, email, password, twitterLink, openness, conscientiousness, extraversion, agreeableness, emotionalRange
 		// 			}).save()
 		// 			.then((user) => {
 		// 				console.log("USER", user.toJSON())
 		// 				const token = generateToken(user);
 		// 				console.log(`SIGNUP SUCCESS: ${user.get('username')}`)
 		// 				res.status(201).send({token});
 		// 			})
 		// 			.catch(() => {
 		// 				console.log(`SIGNUP FAIL WATSON: ${user.get('username')}`)
 		// 				const token = generateToken(user);
 		// 				res.status(201).send({token});
 		// 			})
 		// 		})