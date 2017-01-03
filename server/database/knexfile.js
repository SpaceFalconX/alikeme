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

module.exports = db;