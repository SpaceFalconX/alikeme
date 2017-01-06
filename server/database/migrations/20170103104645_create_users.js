
exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', (user) => {
    user.increments('id').primary();
    user.string('username', 254).unique().notNullable();
    user.string('email', 254).unique().notNullable();
    user.string('password', 254).notNullable();
    user.string('twitterLink', 254).unique();
    user.string('facebookLink', 254).unique();
    user.timestamps();
  })
  .then(() => {
  	console.log('USERS table created!')
  })
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('users');
};
