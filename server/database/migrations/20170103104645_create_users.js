
exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', (user) => {
    user.increments('id').primary();
    user.string('username', 254).unique().notNullable();
    user.string('email', 254).unique().notNullable();
    user.string('password', 254).notNullable();
    user.string('twitterLink', 254);
    user.string('facebookLink', 254);
    user.float('openness').unsigned();
    user.float('conscientiousness').unsigned();
    user.float('extraversion').unsigned();
    user.float('agreeableness').unsigned();
    user.float('emotionalRange').unsigned();
    user.timestamps();
  })
  .then(() => {
  	console.log('USERS table created!')
  })
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('users');
};
