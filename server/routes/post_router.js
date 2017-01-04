const Post = require('../database/models/post.js')
const Posts = require('../database/collections/posts.js')
const Tag = require('../database/models/tag.js')
const Tags = require('../database/collections/tags.js')

const Promise = require('bluebird')
const _ = require('lodash');
const __ = require('underscore');
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
				const promisedTags = _.difference(newTagsNames, allTagsNames)
				.map((tagName, index) => {
					return Tag.forge({name: tagName}).save();
				})
				return Promise.all(promisedTags)
				.then((results) => {
					post.tags().attach(results);
					res.sendStatus(201);
				})
			})
		})
	})


	.get((req, res) => {
		Posts.forge()
		.fetch({withRelated: ['user', 'category', 'tags']})
		.then((collection) => {
			let result = collection.toJSON();
			for(let i = 0; i < result.length; i++) {
				result[i] = _.pick(result[i], ['title', 'created_at', 'updated_at', 'content', 'id', 
																			 'user.username', 'user.id', 'category.id', 'category.name', 'tags'])
				for(let j = 0; j < result[i].tags.length; j++) {
					delete result[i].tags[j]['_pivot_id'];
					delete result[i].tags[j]['_pivot_post_id'];
					delete result[i].tags[j]['_pivot_tag_id'];
				}
			}
			res.json(result)
		})
		.catch(function (err) {
      res.status(500).json({error: {message: err.message}});
    });
	});



module.exports = router;