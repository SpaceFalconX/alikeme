const express = require('express');
const router = express.Router();


router.post('/signup', (req, res) => {
	let username = req.body.username;
	let password = req.body.password;
	User.findOne({where: {username: username}})
	.then((user) => {
		if(user) {
			req.flash('user already exists')
			res.send()
		}
	})
})

router.post('/signin', (req, res) => (
	res.send('Signin POST req successful')
))

module.exports = router;