const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('underscore');

const db = require('../database/config.js');
const config = require('../config/config.js');

const express = require('express');
const router = express.Router();

router.post('/signup', (req, res) => {
	const {username, password, email} = req.body
	db.Users.findOne({where: {username: username}})
	.then((user) => {
		if(user) {
			return res.sendStatus(401);
		} else {
			db.Users.create({
				username: username,
				email: email,
				password: password
			}).then((user, err) => {
				if(err) { 
					res.status(400).send('please fill in information as per instructions')}
				console.log(`NEW USER: ${user.username} has just been added to the user table.`)
				user = _.omit(user.dataValues, 'password')
				res.status(201).send({user});
			})
		} 
	})
})

router.post('/login', (req, res) => {
	let {username, password} = req.body;
	db.Users.findOne({where: {username: username}})
	.then((user) => {
		if(!user) {
			res.status(400).json({error: "go to signup"})
		} else {
			bcrypt.compare(password, user.password, (err, match) => {
    		if(!match) {
    			res.sendStatus(401)
    		} else {
    			const token = jwt.sign({
    				user: _.omit(user.dataValues, 'password'),
    			}, config.jwtSecret)
					console.log(`LOGGED IN USER: ${user.username} has logged in`)
					res.status(200).send({token});
				}
    	})
		} 
	})
})

module.exports = router;
