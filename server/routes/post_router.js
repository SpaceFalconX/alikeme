
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
					return Tag.posts({name: tagName}).save();
				})
				Promise.all(promisedTags)
				.then((tags) => {
					Promise.all()
					res.json(tags)
				})
			})
		})
	})




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