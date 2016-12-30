const jwt = require('jsonwebtoken');
const config = require('./config.js')

const authenticate = (req, res, next) => {
	const {authorization} = req.headers;

	if(authorization) {
		token = authorization.split(' ')[1];
	}

	if(token) {
		jwt.verify(token, config.jwtSecret, (err, decoded) => {
			if(err) {
				res.status(401).json({error: "token could not be verified"});
			} else {
				console.log(decoded);
				next();
			}
		})
	}
}

module.exports = authenticate;