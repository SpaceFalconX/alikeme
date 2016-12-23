const express = require('express');
const router = express.Router();


router.post('/signup', (req, res) => (
	res.send({username: 'sevdaaa'})
))

router.post('/signin', (req, res) => (
	res.send('Signin POST req successful')
))

module.exports = router;