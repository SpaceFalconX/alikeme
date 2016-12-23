const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const _ = require('underscore');

const User = connection.define('user', {
  username: {
  	type: Sequelize.STRING, 
  	allowNull: false, 
  	unique: true,
  	validate : {
  		len: {
  			args: [2,10],
  			msg: 'Username must be between 2 and 10 characters long'
  		},
  		isAlphanumeric: {
  			args: true,
  			msg: 'Username must contain letters and numbers only'
  		}
  	}
  },
  password: {
  	type: Sequelize.STRING, 
  	allowNull: false
  },
  email: {
  	type: Sequelize.STRING, 
  	allowNull: false, 
  	unique: true,
  	validate: {
  		isEmail: true
  	}
  }
}, {
	hooks: {
		beforeBulkCreate (users) {
			_.each(users, (user) => (user.password = bcrypt.hashSync(user.password, 8)))
		}
	}
})