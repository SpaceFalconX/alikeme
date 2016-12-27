const express = require('express');
const router = express.Router();
const User = require('../database/models/user_model.js')


// Get all users in DB
router.get('/users/all', (req, res) => {
	User.findAll()
	.then((users) => ( res.send(users) ))
})

// Gets a specific user
router.get('/users/:username', (req, res) => {
	let username = req.params.username;
	User.findOne({where: {username: username}})
	.then((user) => ( res.send(user) )) 
})

router.post('/users/pref/:username', (req, res) => {
	let username = req.params.username;
	let prefs = req.body
	User.update(prefs, {where: {username: username}})
	.then((user) => ( res.send(user) )) 
})

module.exports = router;