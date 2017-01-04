const twitter = require('../config/twitter.js');
const Twit  = require('twit');
const express = require('express');
const router = express.Router();

const T = new Twit(twitter);
const options = { 
	screen_name: 'guardian',
  count: 10 
}

router.route('/tweets')
	.get((req, res) => {
		T.get('statuses/user_timeline', options, (err, data) => {
			if (err) { res.status(500).send({err: {message: err.message}})}
		})
		.then((resp) => {
			let result = '';
			resp.data.forEach((tweet) => {
				let text = tweet.text
		    result += `${text.slice(0, text.length - 24)}.\n`;
			})
			res.status(200).send(result)
		})
		.catch((err) => {
			res.status(500).send({err: {message: err.message}})
		})
	})



module.exports = router;