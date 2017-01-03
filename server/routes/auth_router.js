const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');


const User = require('../database/models/user.js');
const Users = require('../database/collections/users.js');
const config = require('../config/config.js');

const express = require('express');
const router = express.Router();

router.post('/signup', (req, res) => {
	const {username, password, email} = req.body
	console.log('REQ.BODY', req.body)
	new User ({username: username})
	.fetch()
	.then((user) => {
		if(user) {
			return res.sendStatus(401);
		} else {
			const newUser = new User({ username, email, password})
			.save()
			.then((user) => {
				const token = jwt.sign({
    				user: _.omit(user.attributes, 'password'),
    			}, config.jwtSecret)
				console.log(`NEW USER: ${user.get('username')}`)
				res.status(201).send({token});
			})
		} 
	})
})

// app.post('/signup', function(req, res) {
//   var username = req.body.username;
//   var password = req.body.password;

//   new User({ username: username })
//     .fetch()
//     .then(function(user) {
//       if (!user) {
//         // ADVANCED VERSION -- see user model
//         var newUser = new User({
//           username: username,
//           password: password
//         });
//         newUser.save()
//           .then(function(newUser) {
//             util.createSession(req, res, newUser);
//           });
//       } else {
//         console.log('Account already exists');
//         res.redirect('/signup');
//       }
//     });
// });

// router.post('/login', (req, res) => {
// 	let {username, password} = req.body;
// 	User.findOne({where: {username: username}})
// 	.then((user) => {
// 		if(!user) {
// 			res.status(400).json({error: "go to signup"})
// 		} else {
// 			bcrypt.compare(password, user.password, (err, match) => {
//     		if(!match) {
//     			res.sendStatus(401)
//     		} else {
//     			const token = jwt.sign({
//     				user: _.omit(user.dataValues, 'password'),
//     			}, config.jwtSecret)
// 					console.log(`LOGGED IN USER: ${user.username} has logged in`)
// 					res.status(200).send({token});
// 				}
//     	})
// 		} 
// 	})
// })

module.exports = router;
