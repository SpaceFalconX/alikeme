const express = require('express');
const router = express.Router();
const auth = require('../config/jwt_auth.js')
const db = require('../database/config.js')

router.use(auth);


router.post('/setup/:userid', (req, res) => {
  const prefs = req.body;
  console.log('id', req.params.userId)
  console.log('body', req.body);
  res.sendStatus(201);
});

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