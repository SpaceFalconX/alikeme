const Post = require('../database/models/post.js')
const Posts = require('../database/collections/posts.js')
const Tag = require('../database/models/tag.js')
const Tags = require('../database/collections/tags.js')
const User = require('../database/models/user.js')
const Users = require('../database/collections/users.js')

const Promise = require('bluebird')
const _ = require('lodash');
const __ = require('underscore');
const express = require('express');

const router = express.Router();
router.get('/', (req, res) => {
	Posts.forge()
	.fetch({withRelated: ['user', 'category', 'tags']})
	.then((collection) => {
		let result = collection.toJSON();
		for(let i = 0; i < result.length; i++) {
				result[i] = _.pick(result[i],
					['title', 'created_at', 'updated_at', 'content', 'id',
					 'user.username', 'user.id', 'category.id', 'category.name', 'tags', ]
					)
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

router.get('/:username', (req, res) => {
	console.log("REQ.PARAMS", req.params.username)
	User.where('username', req.params.username)
	.fetch().then((user) => {
		if(!user) {
			res.status(404).send({err: 'Cannot find user'})
		}
		Posts.forge()
			.query({where: {user_id: user.id}})
			.fetch({withRelated: ['user', 'category', 'tags']})
			.then((collection) => {
			console.log("USER ID", user.id)
			let result = collection.toJSON();
			for(let i = 0; i < result.length; i++) {
				result[i] = _.pick(result[i],
					['title', 'created_at', 'updated_at', 'content', 'id',
					 'user.username', 'user.id','category.id', 'category.name', 'tags'])
				for(let j = 0; j < result[i].tags.length; j++) {
					delete result[i].tags[j]['_pivot_id'];
					delete result[i].tags[j]['_pivot_post_id'];
					delete result[i].tags[j]['_pivot_tag_id'];
				}
			}
			console.log("result", result)
			res.send(result)
		})
		.catch((err) => {
	    res.status(500).json({error: {message: err.message}});
	  });
	})

});

router.post('/getUserId', (req, res) => {
	console.log('searching for username', req.body.username)
	Users.forge()
	.query({where: {username: req.body.username}})
	.fetch()
	.then((result) => {
		result = result.toJSON()[0].id
		console.log('result', result)
		res.json(result)
	})
	.catch((err) => {
    res.status(500).json({error: {message: err.message}});
  });
})


/////////////FILTERING////////////////////////////////////////////////////////////

router.post('/categories', (req, res) => { //filter by category
	console.log("REQ BODY", req.body)
	Posts.forge()
	.query({where: {category_id: req.body.categoryid}}) //(where: {k: 'v}, orWhere: {k: 'v'}), etc...
	.fetch({withRelated: ['user', 'category', 'tags']})
	.then((collection) => {
		let result = collection.toJSON();
		for(let i = 0; i < result.length; i++) {
			result[i] = _.pick(result[i],
				['title', 'created_at', 'updated_at', 'content', 'id',
				 'user.username', 'user.id','category.id', 'category.name', 'tags'])
			for(let j = 0; j < result[i].tags.length; j++) {
				delete result[i].tags[j]['_pivot_id'];
				delete result[i].tags[j]['_pivot_post_id'];
				delete result[i].tags[j]['_pivot_tag_id'];
			}
		}
		res.send(result)
	})
	.catch((err) => {
    res.status(500).json({error: {message: err.message}});
  });
});

router.post('/tags', (req, res) => { //filter by tag.....how
	//use join table to find all post_ids that have the tag id being queried by
	//then run something to send all those posts back

	console.log("REQ BODY", req.body)
	Tags.forge()
	.query({where: {name: req.body.tag}}) //(where: {k: 'v}, orWhere: {k: 'v'}), etc...
	//{withRelated: ['user', 'category', 'posts']}
	.fetch()
	.then((tag) => {
		tag = tag.toJSON()[0].id
		console.log(tag)

		res.json(tag)
	})
	.catch((err) => {
    res.status(500).json({error: {message: err.message}});
  });
});

//////////////////////////////////////////////////////////////////////////////////

router.post('/new', (req, res) => {
	const {content, title, user_id, category_id, tags} = req.body;
	Post.forge({content, title, user_id, category_id})
	.save()
	.then((post) => {
		Tags.forge()
		.fetch()
		.then((allTags) => {
			const allTagsNames = allTags.pluck('name');
			const promisedTags = _.difference(tags, allTagsNames)
			.map((tagName, index) => {
				return Tag.forge({name: tagName}).save();
			})
			return Promise.all(promisedTags)
			.then((result) => {
				Tags.forge()
				.query('whereIn', 'name', tags)
				.fetch()
				.then((some) => {
					return Promise.all(some.map((tag)=>{
						return post.tags().attach(tag);
					})).then(()=> {
							const resp = {};
							resp.tags = tags;
							resp.id = post.id;
							res.send(resp);
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


////////////////MATCHING
router.post('/matches', (req, res) => { //filter by category
	// console.log("REQ BODY FOR MATCHES", req.body)
	Posts.forge()
	.query({where: {category_id: req.body.post.category.id}})
	.fetch({withRelated: ['user', 'category', 'tags']})
	.then((collection) => {

		let mappedCollection = collection.toJSON()
		.filter((post) => {
			return req.body.post.id !== post.id && req.body.post.user.id !== post.user.id
		})
		.map((post) => {
			return {
				tags: post.tags.map((tag) => {
				return tag.name
				}),
				originalPost: post,
				post_id: post.id,
				openness : post.user.openness,
      	conscientiousness: post.user.conscientiousness,
      	extraversion: post.user.extraversion,
      	agreeableness: post.user.agreeableness,
      	emotionalRange: post.user.emotionalRange
			}
		})

		let queryTags = req.body.post.tags.map((tag) => {
			return tag.name
		})

		let RankedMatches = mappedCollection.map((post) => { //create personality score and tags score
			let compatibilityScore = Math.abs(req.body.conscientiousness - post.conscientiousness)
				+ Math.abs(req.body.extraversion - post.extraversion)
				+ Math.abs(req.body.agreeableness - post.agreeableness)
				+ Math.abs(req.body.emotionalRange - post.emotionalRange)
			let relevantTags = _.intersection(post.tags, queryTags).length
			let weightedScore = compatibilityScore - (relevantTags / 5) //subtract number of matching tags from compatibilityScore
			return {
				compatibilityScore,
				relevantTags,
				weightedScore,
				originalPost: post.originalPost
			}
		})
		.sort((a, b) => { //sort by lowest number
			return a.weightedScore - b.weightedScore
		})
		.slice(0, 5)
		console.log("MATHCES", RankedMatches)
		res.json(RankedMatches)
	})
	.catch((err) => {
    res.status(500).json({error: {message: err.message}});
  });
});

module.exports = router;