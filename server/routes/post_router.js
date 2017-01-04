
const Post = require('../database/models/post.js')
const Posts = require('../database/collections/posts.js')
const Tag = require('../database/models/tag.js')
const Tags = require('../database/collections/tags.js')

const Promise = require('bluebird')
const _ = require('lodash')
const express = require('express');

const router = express.Router();
router.route('/posts')
	.post((req, res) => {
		const {content, title, user_id, category_id, tags} = req.body;
		Post.forge({content, title, user_id, category_id})
		.save()
		.then((post) => {
			Tags.forge()
			.fetch()
			.then((allTags) => {
				const allTagsNames = allTags.pluck('name');
				const newTagsNames = JSON.parse(tags)
				const tagsToSave = _.difference(newTagsNames, allTagsNames);
				const promisedTags = tagsToSave.map((tagName) => {
					return new Tag({name: tagName}).posts().attach(post);
				})
				Promise.all(promisedTags)
				.then((result) => {
					console.log("RESULT", result)
				})
			})
		})
	})

// var admin1 = new Admin({username: 'user1', password: 'test'});
// var admin2 = new Admin({username: 'user2', password: 'test'});

// Promise.all([admin1.save(), admin2.save()])
//   .then(function() {
//     return Promise.all([
//     new Site({id: 1}).admins().attach([admin1, admin2]),
//     new Site({id: 2}).admins().attach(admin2)
//   ]);
// })


	.get((req, res) => {
		Posts.forge()
		.fetch({withRelated: ['tags', 'category']})
		.then((data) => {
			res.json({data})
		})
		.catch(function (err) {
			console.log(err)
      res.status(500).json({error: {message: err.message}});
    });
	});



module.exports = router;