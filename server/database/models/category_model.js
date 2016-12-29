// const Sequelize = require('sequelize');
// const _ = require('underscore');
// const connection = require('../config.js')
// const User = require('./user_model.js')
// const Post = require('./post_model.js')

// const Category = connection.define('category', {
//   name: { type: Sequelize.STRING, unique: true }
//   value: { type: Sequelize.BOOLEAN, defaultValue: false } 
// })

// Category.hasMany(Post)

// Category.sync({
//   force: true
//   // logging: console.log
// })
// .then(() => (
  
// ))
// .catch((error) => (
//   console.log(error)
// ))

// module.exports = Category;


//   // coffee: {type: Sequelize.BOOLEAN, defaultValue: false, allowNull: false},
//   // founder: {type: Sequelize.BOOLEAN, defaultValue: false, allowNull: false},
//   // developer: {type: Sequelize.BOOLEAN, defaultValue: false, allowNull: false},
//   // clubbing: {type: Sequelize.BOOLEAN, defaultValue: false, allowNull: false},
//   // concerts: {type: Sequelize.BOOLEAN, defaultValue: false, allowNull: false},
//   // dating: {type: Sequelize.BOOLEAN, defaultValue: false, allowNull: false}