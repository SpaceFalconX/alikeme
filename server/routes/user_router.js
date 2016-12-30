const express = require('express');
const router = express.Router();

const db = require('../database/config.js')

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