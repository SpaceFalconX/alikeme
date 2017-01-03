// const db = require('./knexfile.js');

const _ = require('underscore');

const knex = require('knex')({
  client: 'mysql',
  connection: {
  	host     : 'localhost',
    user     : 'root',
    password : '123',
    database : 'alikeMe',
    charset  : 'utf8'
  }
});

const db = require('bookshelf')(knex);
db.plugin('registry');


db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('username', 100).unique();
      user.string('email', 254).unique();
      user.string('password', 100);
      user.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('categories').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('categories', function (category) {
      category.increments('id').primary();
      category.string('name', 100).unique();
      category.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});


db.knex.schema.hasTable('posts').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('posts', function (post) {
      post.increments('id').primary();
      post.integer('user_id')
      	// .references('id')
       //  .inTable('users');
      post.integer('category_id')
        // .references('id')
        // .inTable('categories');
      post.string('title', 100);
      post.text('content', 'mediumtext');
      post.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});



module.exports = db;



// DROP DATABASE alikeMe;
// CREATE DATABASE alikeMe;
// USE alikeMe;