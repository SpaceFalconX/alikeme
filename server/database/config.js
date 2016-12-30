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
const Posts_Categories = require('./joins/posts_categories_join.js');


db.Users = User(connection, Sequelize);
db.Comments = Comment(connection, Sequelize);
db.Posts = Post(connection, Sequelize);
db.Categories = Category(connection, Sequelize);

// Relations 
db.Posts.belongsToMany(db.Categories, {through: "posts_categories"});
db.Categories.belongsToMany(db.Posts, {through: "posts_categories"});

db.Comments.belongsTo(db.Posts);
db.Posts.hasMany(db.Comments);

db.Posts.belongsTo(db.Users);
db.Users.hasMany(db.Posts);

module.exports = db;











