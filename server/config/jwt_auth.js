const jwt = require('jsonwebtoken');
const config = require('./config.js')


const authenticate = (req, res, next) => {
	const authorization = req.headers['authorization']
	let token;
	if(authorization) {
		token = authorization.split(' ')[1];
	}
	console.log('TOKEN AUTH', token)
	if(token) {
		jwt.verify(token, config.jwtSecret, (err, decoded) => {
			console.log("ERR", err, "DECODED", decoded)
			if(err) {
				res.status(401).json({error: "token could not be verified"});
			} else {
				next();
			}
		})
	}
}

module.exports = authenticate;