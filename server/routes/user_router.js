const express = require('express');
const router = express.Router();
const db = require('../database/config.js')


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

module.exports = router;