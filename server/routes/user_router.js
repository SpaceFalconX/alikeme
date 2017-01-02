const express = require('express');
const router = express.Router();
const auth = require('../config/jwt_auth.js')
const db = require('../database/config.js')

// router.use(auth);


router.post('/post', (req, res) => {
	const newPost = req.body;
	// db.Post.create({
	// 	text: newPost.content,
	// 	user_id: newPost.user_id,
	// })
	// .then((post) => {
	// 	db.Category.findOrCreate({where: {name: newPost.category}})
	// 	.spread(function(category, created) {
	// 		console.log("CATEGORY", category.dataValues, created)
	// 		post.addCategory(category).then((result) => {console.log('added cat')})
	// 		category.addPost(category).then((result) => {console.log('added post')})
	// 		res.json({success: "post submitted"});
	// 	})
	// })
	res.sendStatus(200)
	// .catch((err) => {
	// 	// console.log(err)
	// 	res.json({error: "failed to create post"});
	// })
})

// router.get('/posts', (req, res) => {
// 	db.Post.findAll({ 
// 		include: [{
// 			model: db.Category
// 		}]
// 	})
// 	.then((posts) => {
// 		// console.log(posts)
// 		res.json({posts})
// 	})
// 	.catch((err) => {
// 		res.json({err})
// 		console.log(err)	
// 	})
// })


router.get('/posts/:cat', (req, res) => {
	console.log("REQ PAR", req.params.cat);
	db.Post.findAll({
		include: [{
			model: db.Category,
			// through: {
  	// 		where: {
			// 		id: req.params.cat
			// 	}
	  //   }
		}]
	})
	.then((posts) => {
		res.json({posts})
	})
	.catch((err) => {
		res.json({err})
		console.log(err)	
	})
})


// router.get('/categories', (req, res) => {
// 	db.Category.findAll({include: [{ 
// 		model: db.Post, 
// 		where: {
// 			text: db.Sequelize.col('posts_categories')
// 		}
// 	}]})
// 	.then((category) => {
// 		res.json({category})
// 	})
// 	.catch((err) => {
// 		console.log(err)	
// 	})
// })



router.post('/users/pref/:username', (req, res) => {
	let username = req.params.username;
	let prefs = req.body
	db.User.update(prefs, {where: {username: username}})
	.then((user) => ( res.send(user) )) 
})



// Get all users in DB
router.get('/users/all', (req, res) => {
	db.User.findAll()
	.then((users) => ( res.send(users) ))
})

// Gets a specific user
router.get('/users/:username', (req, res) => {
	let username = req.params.username;
	db.User.findOne({where: {username: username}})
	.then((user) => ( res.send(user) )) 
})

router.post('/users/pref/:username', (req, res) => {
	let username = req.params.username;
	let prefs = req.body
	db.User.update(prefs, {where: {username: username}})
	.then((user) => ( res.send(user) )) 
})


module.exports = router;