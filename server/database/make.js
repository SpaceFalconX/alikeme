knex.migrate.latest('./migrations')
.then(function() {
  return knex.seed.run('./seeds');
})
.then(function() {
	console.log('migrations are finished')
});