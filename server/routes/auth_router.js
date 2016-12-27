const express = require('express');
const router = express.Router();
const User = require('../database/models/user_model.js')


router.post('/signup', (req, res) => {
	console.log('REQ BODY', req.body)
	let username = req.body.username;
	let password = req.body.password;
	let email = req.body.email;
	User.findOne({where: {username: username}})
	.then((err, user) => {
		console
		if(err) { return res.sendStatus(500) }
		if(user) {
			req.flash('user already exists');
			return res.sendStatus(401);
		} else {
			User.create({
				username: username,
				email: email,
				password: password
			}).then((user, err) => {
				console.log("ERR", err)
				console.log("USER", user)
				if(err) { 
					return res.status(400).send('please fill in information as per instructions')}
					console.log('USER', user)
				console.log(`${user.username} has just been added to the user table.`)
				res.status(201).send(user);
			})
		} 
	})
})

router.post('/signin', (req, res) => (
	res.send('Signin POST req successful')
))

module.exports = router;
