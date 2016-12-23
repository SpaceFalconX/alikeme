const Sequelize = require('sequelize')
const dbConnection = new Sequelize('alikeMe','root','123');

const User = dbConnection.define('user', {
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
})

dbConnection.sync({
	force: true,
	logging: console.log
})
.then(() => (
	User.create({
		username: "clara",
		email: "clara@gmail.com",
		password: 1
	})
))
.catch((error) => (
	console.log(error)
))

module.exports = dbConnection;