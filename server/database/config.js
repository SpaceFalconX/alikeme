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
  	console.log("Migration completed.")
	});
})

module.exports = db;
