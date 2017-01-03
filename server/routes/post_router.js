const Post = require('../database/models/post.js')
const Posts = require('../database/collections/posts.js')

const express = require('express');

const router = express.Router();
router.route('/posts')
	.post((req, res) => {
		// const {content, title, user_id, category_id} = req.body;
		Post.forge(req.body)
		.save()
		.then((post) => {
			console.log("SUCCESS! -> post created")
			res.send("Success")
		})
	})

	.get((req, res) => {
		Posts.forge()
		.fetch()
		.then((data) => {
			res.json({collection})
		})
		.catch(function (err) {
      res.status(500).json({error: {message: err.message}});
    });
	});


module.exports = router;