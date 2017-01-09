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

router.get('/:userid', (req, res) => {
	console.log("REQ.PARAMS", req.params.userid)
	Posts.forge()
	.query({where: {user_id: req.params.userid}})
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

router.post('/getUserId', (req, res) => {
	//console.log('searching for username', req.body.username)
	Users.forge()
	.query({where: {username: req.body.username}})
	.fetch()
	.then((result) => {
		result = result.toJSON()[0].id
		//console.log('result', result)
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
	console.log("req.body", req.body)
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
				post.tags().attach(result);
				const resp = {};
				resp.tags = result
				resp.id = post.id
				resp['created_at'] = post['created_at']
				resp['created_at'] = post['created_at']
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
  	res.status(400).send({error: {message: err.message}});
	});
})

module.exports = router;