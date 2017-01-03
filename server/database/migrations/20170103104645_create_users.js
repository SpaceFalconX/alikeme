
exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', (user) => {
    user.increments('id').primary().notNullable();
    user.string('username', 100).unique().notNullable();
    user.string('email', 254).unique().notNullable();
    user.string('password', 100).notNullable();
    user.timestamps();
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('users');
};
