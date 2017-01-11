const express = require('express');
const User = require('../database/models/user.js');
const Users = require('../database/collections/users.js');
const router = express.Router();

router.post('/setTwitter', (req, res) => {
  console.log('setting to', req.body)
  new User ({username: req.body.username})
	.fetch()
	.then((user) => {
		// if(!user) {
		// 	return res.sendStatus(401);
		// } else {
			user.save({twitterLink: req.body.twitter})
			.then((user) => {
				res.sendStatus(201)
			})
		// }
		if(!user) {
			return res.sendStatus(401);
		}
		user.save({twitterLink: req.body.twitter})
		.then((user) => {
			res.sendStatus(201)
		})
	})
})

module.exports = router