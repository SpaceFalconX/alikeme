const knexfile = require('./knexfile.js');
const path = require('path')
const knex = require('knex')(knexfile.development);
const db = require('bookshelf')(knex);
const cascadeDelete = require('bookshelf-cascade-delete');
db.plugin(cascadeDelete);
db.plugin('registry');

knex.migrate.latest({directory: path.resolve(__dirname, 'migrations')})
.then(() => {
  knex.seed.run({directory: path.resolve(__dirname, 'seeds')})
  .then(() => {
  	//console.log("Migration completed.")
	});
})

module.exports = db;


// table.unique(['LoginID', 'Email']);



// const _ = require('underscore');

// const knex = require('knex')({
//   client: 'mysql',
//   connection: {
//     host     : 'localhost',
//     user     : 'root',
//     password : '123',
//     database : 'alikeMe',
//     charset  : 'utf8'
//   }
// });

// var knexfile = require('./knexfile.js');
// var knex = require('knex')(knexfile.development);

// var bookshelf = require('bookshelf')(knex);
// bookshelf.plugin('registry');

// module.exports = bookshelf;

// db.knex.schema.hasTable('users').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('users', function (user) {
//       user.increments('id').primary();
//       user.string('username', 100).unique();
//       user.string('email', 254).unique();
//       user.string('password', 100);
//       user.timestamps();
//     }).then(function (table) {
//       //console.log('Created Table', table);
//     });
//   }
// });

// db.knex.schema.hasTable('categories').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('categories', function (category) {
//       category.increments('id').primary();
//       category.string('name', 100).unique();
//       category.timestamps();
//     }).then(function (table) {
//       //console.log('Created Table', table);
//     });
//   }
// });


// db.knex.schema.hasTable('posts').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('posts', function (post) {
//       post.increments('id').primary();
//       post.integer('user_id')
//        // .references('id')
//         // .inTable('users');
//       post.integer('category_id')
//         // .references('id')
//         // .inTable('categories');
//       post.string('title', 100);
//       post.text('content', 'mediumtext');
//       post.timestamps();
//     }).then(function (table) {
//       //console.log('Created Table', table);
//     });
//   }
// });

// db.knex.schema.hasTable('tags').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('tags', function (tag) {
//       tag.increments('id').primary();
//       tag.string('name', 100).unique();
//       tag.timestamps();
//     }).then(function (table) {
//       //console.log('Created Table', table);
//     });
//   }
// });






// DROP DATABASE alikeMe;
// CREATE DATABASE alikeMe;
// USE alikeMe;
