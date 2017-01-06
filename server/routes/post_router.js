const Post = require('../database/models/post.js')
const Posts = require('../database/collections/posts.js')
const Tag = require('../database/models/tag.js')
const Tags = require('../database/collections/tags.js')

const Promise = require('bluebird')
const _ = require('lodash');
const __ = require('underscore');
const express = require('express');

const router = express.Router();
router.get('/all', (req, res) => {
	Posts.forge()
	.fetch({withRelated: ['user', 'tags']})
	.then((collection) => {
		let result = collection.toJSON();
		console.log('RESULT', result)
		for(let i = 0; i < result.length; i++) {
			result[i] = _.omit(result[i],['user', 'tags'])
			for(let j = 0; j < result[i].tags.length; j++) {
				delete result[i].tags[j]['_pivot_id'];
				delete result[i].tags[j]['_pivot_post_id'];
				delete result[i].tags[j]['_pivot_tag_id'];
			}
		}
		res.json(result)
	})
	.catch((err) => {
    res.status(500).json({error: {message: err.message}});
  });
});

// router.get('/:userid', (req, res) => {
// 	Posts.forge()
// 	.query({where: {user_id: req.params.userid}})
// 	.fetch({withRelated: ['user', 'category', 'tags']})
// 	.then((collection) => {
// 		console.log("COLLECTION",collection)
// 		let result = collection.toJSON();
// 		for(let i = 0; i < result.length; i++) {
// 			result[i] = _.pick(result[i],
// 				['title', 'created_at', 'updated_at', 'content', 'id',
// 				 'category.id', 'category.name', 'tags'])
// 			for(let j = 0; j < result[i].tags.length; j++) {
// 				delete result[i].tags[j]['_pivot_id'];
// 				delete result[i].tags[j]['_pivot_post_id'];
// 				delete result[i].tags[j]['_pivot_tag_id'];
// 			}
// 		}
// 		res.json(result)
// 	})
// 	.catch((err) => {
//     res.status(500).json({error: {message: err.message}});
//   });
// });

router.post('/new', (req, res) => {
	console.log("req.body", req.body)
	const {content, title, author, category, tags} = req.body;
	Post.forge({content, title, author, category})
	.save()
	.then((post) => {
		console.log("POST", post)
		Tags.forge()
		.fetch()
		.then((allTags) => {
			console.log("ALL TAGS", typeof tags)
			const allTagsNames = allTags.pluck('name');
			// const newTagsNames = JSON.parse(tags)
			const promisedTags = _.difference(tags, allTagsNames)
			.map((tagName, index) => {
				return Tag.forge({name: tagName}).save();
			})
			return Promise.all(promisedTags)
			.then((results) => {
				post.tags().attach(results);
				console.log("RESULTS", results)
				res.sendStatus(201);
			})
			.catch((err) => {
				console.log(err);
	    	res.status(500).send({error: {message: err.message}});
	  	});
		})
		.catch((err) => {
			console.log(err);
    	res.status(500).send({error: {message: err.message}});
  	});
	})
	.catch((err) => {
		console.log(err);
  	res.status(400).send({error: {message: err.message}});
	});
})

module.exports = router;