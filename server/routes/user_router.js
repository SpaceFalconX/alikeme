const express = require('express');
const router = express.Router();
const auth = require('../config/jwt_auth.js')
const db = require('../database/config.js')

router.use(auth);


router.post('/post', (req, res) => {
	const newPost = req.body;
	db.Posts.create({
		text: newPost.content,
		user_id: newPost.user_id
	})
	.then((post) => {
		res.json({success: "post submitted"});
	})
	.catch((err) => {
		res.json({error: "failed to create post"});
	})
})




router.post('/users/pref/:username', (req, res) => {
	let username = req.params.username;
	let prefs = req.body
	db.Users.update(prefs, {where: {username: username}})
	.then((user) => ( res.send(user) )) 
})



// Get all users in DB
router.get('/users/all', (req, res) => {
	db.Users.findAll()
	.then((users) => ( res.send(users) ))
})

// Gets a specific user
router.get('/users/:username', (req, res) => {
	let username = req.params.username;
	db.Users.findOne({where: {username: username}})
	.then((user) => ( res.send(user) )) 
})

router.post('/users/pref/:username', (req, res) => {
	let username = req.params.username;
	let prefs = req.body
	db.Users.update(prefs, {where: {username: username}})
	.then((user) => ( res.send(user) )) 
})


module.exports = router;