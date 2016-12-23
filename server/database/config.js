var Sequelize = require('sequelize')

var db = new Sequelize('mysql://localhost:3306/database', {})


module.exports = db;