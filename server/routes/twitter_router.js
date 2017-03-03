const express = require('express');
const User = require('../database/models/user.js');
const Users = require('../database/collections/users.js');
const util = require('../utils/util.js')


const router = express.Router();

router.post('/setTwitter', (req, res) => {
  const { username, twitterLink } = req.body;
  new User ({ username })
	.fetch({withRelated: ['posts']})
	.then((user) => {
		if(!user) {
			return res.sendStatus(401);
		} else {
      const posts = user.related('posts').toJSON();
      const userPosts = posts.map((post) => post.content).join('');
      user.save({ twitterLink })
      .then(() => util.getTwitterFeed(twitterLink))
      .then((feed) => feed.concat(userPosts))
      .then((result)=> util.readText(result))
      .then((stats) => user.save(stats)
      .then(() => res.json(stats)))
		}
	})
});

module.exports = router;
