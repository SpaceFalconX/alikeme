const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const _ = require('underscore');
const connection = require('../config.js')

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
			_.each(users, (user) => (user.password = bcrypt.hashSync(user.password, 8)));
		},
    beforeCreate (user) {
      user.password = bcrypt.hashSync(user.password, 8);
    }
	}
})


connection.sync({
  force: true,
  logging: console.log
})
.then(() => (
  User.bulkCreate([{
    username: "wasiff",
    email: "wasiff@gmail.com",
    password: "1"
  }, {
    username: "isaac",
    email: "isaac@gmail.com",
    password: "1"
  }, {
    username: "sevda",
    email: "sevda@gmail.com",
    password: "1"
  }], {
    validate: true,
    ignoreDuplicates: true
  })
  .then((users) => (
    _.each(users, (user)=>( console.log('Created user:', user.dataValues.username)))
  ))
))
.catch((error) => (
  console.log(error)
))

module.exports = User;