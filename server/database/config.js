const Sequelize = require('sequelize');
const _ = require('underscore');

const connection = new Sequelize('alike_me','root','123',  {
	define: {
    underscored: true
  },
  pool: false
});

// DB connection
const db = {};
db.Sequelize = Sequelize;
db.connection = connection;

// Models
const User = require('./models/user_model.js');
const Comment = require('./models/comment_model.js');
const Post = require('./models/post_model.js');
const Category = require('./models/category_model.js');

db.User = User(connection, Sequelize);
db.Comment = Comment(connection, Sequelize);
db.Post = Post(connection, Sequelize);
db.Category = Category(connection, Sequelize);

const posts_categories = db.connection.define('posts_categories', {
  id: {
    type: db.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
}, {
	underscored: true
})


// Relations 
db.Post.belongsToMany(db.Category, {through: posts_categories});
db.Category.belongsToMany(db.Post, {through: posts_categories});

db['posts_categories'] = posts_categories;


db.Comment.belongsTo(db.Post);
db.Post.hasMany(db.Comment);

db.Post.belongsTo(db.User);
db.User.hasMany(db.Post);

// db.Category.belongsToMany(db.User, {through: "users_categories"});
// db.User.belongsToMany(db.Category, {through: "users_categories"});


module.exports = db;











