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


//TODO: Select soecific columns to make it more lightweight
router.get('/', (req, res) => {
	Posts.forge()
	.fetch({withRelated: ['user', 'category', 'tags', 'stars']})
	.then((collection) => {
		let result = collection.toJSON();
		for(let i = 0; i < result.length; i++) {
				result[i] = _.pick(result[i],
					['title', 'created_at', 'updated_at', 'content', 'id',
					 'user.username', 'user.id', 'user.gravatar', 'category.id',
					 'category.name', 'tags', 'stars_count', 'stars' ]
					)
				for(let j = 0; j < result[i].tags.length; j++) {
					delete result[i].tags[j]['_pivot_id'];
					delete result[i].tags[j]['_pivot_post_id'];
					delete result[i].tags[j]['_pivot_tag_id'];
				}
			}
			//console.log("RESULTS", result)
		res.json(result)
	})
	.catch((err) => {
    res.status(500).json({error: {message: err.message}});
  });
});

//TODO: Select soecific columns to make it more lightweight
router.get('/:username', (req, res) => {
	User.where('username', req.params.username)
	.fetch().then((user) => {
		if(!user) {
			res.status(404).send({err: 'Cannot find user'})
		}
		Posts.forge()
			.query({where: {user_id: user.id}})
			.fetch({withRelated: ['user', 'category', 'tags']})
			.then((collection) => {
			let result = collection.toJSON();
			for(let i = 0; i < result.length; i++) {
				result[i] = _.pick(result[i],
					['title', 'created_at', 'updated_at', 'content', 'id',
					 'user.username', 'user.id', 'user.gravatar','category.id', 'category.name', 'tags', 'stars_count', 'stars'])
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
	})

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
	//console.log("REQ BODY", req.body)
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
	Tags.forge()
	.query({where: {name: req.body.tag}}) //(where: {k: 'v}, orWhere: {k: 'v'}), etc...
	//{withRelated: ['user', 'category', 'posts']}
	.fetch()
	.then((tag) => {
		tag = tag.toJSON()[0].id
		//console.log(tag)
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
							resp['stars_count'] = 0;
							resp.tags = tags;
							resp.id = post.id;
							//console.log("RESP", resp)
							res.send(resp);
					})
					.catch((err) => res.status(500).send({error: {message: err.message}}));
				});
			});
		});
	});
});


////////////////MATCHING
router.get('/matches/:id', (req, res) => {
	//console.log("ID:",req.params.id)
	const originalPostId = req.params.id
	Post.where({id: originalPostId})
	.fetch({withRelated: ['tags', 'category', 'user.followers']})
	.then((originalPost) => {
		const {user, category_id, id, tags} = originalPost.toJSON();
		Posts.query({where: {category_id: category_id},
								whereNot: {id: id }})
		.fetch({withRelated:['user', 'tags', 'stars', 'category']})
		.then((posts) => {
			const traits = ['openness', 'conscientiousness', 'extraversion',
											'agreeableness', 'emotionalRange']
			posts.forEach((post) => {
				var personalityMatch = 0.0;
				traits.forEach((trait) =>
					personalityMatch += Math.pow((post.related('user').get(trait) - user[trait]), 2)
				);
				personalityMatch = (1 - (Math.sqrt(personalityMatch / traits.length)))
				const otherTags = post.related('tags').toJSON()
				const tagsMatch = _.intersectionBy(otherTags, tags, 'id').length / 5;
				// 3 : 1 - personalityMatch to tagMatch as category is laready considered
				const weightedMatch = (tagsMatch + personalityMatch * 3) / 3;
        post.id in user.followers? post.set({isfollower: true}) : '';
        post.set({distance: weightedMatch });
			})
			res.json(posts) })
	})
})

module.exports = router;
