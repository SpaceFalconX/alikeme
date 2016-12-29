// const bcrypt = require('bcryptjs');
// const Sequelize = require('sequelize');
// const _ = require('underscore');
// const connection = require('../config.js')
// const User = require('./user_model.js')
// // const Category = require('./category_model.js')

// const Post = connection.define('post', {
//   text: {type: Sequelize.STRING, allowNull: false}  
// })

// Post.hasOne(User)

// Post.sync({
//   force: true
// })
// .then(() => (
//   Post.create({
//     text: 'this is my first post!'
//   })
// ))
// .then((post) => (
//   console.log('Created user:', post.dataValues)
// ))

// // Post.belongsTo(User);
// // Post.belongsTo(Category)


// // .then(() => (

// // ))
// // .catch((error) => (
// //   console.log(error)
// // ))

// module.exports = Post;