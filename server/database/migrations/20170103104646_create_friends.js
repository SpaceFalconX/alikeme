
exports.up = (knex, Promise) => {
  return knex.schema.createTable('friends', (friend) => {
    friend.increments('id').primary();
    friend.integer('followed_id').unsigned().references('id').inTable('users');
    friend.integer('follower_id').unsigned().references('id').inTable('users');
  })

  .then(() => {
  	console.log('FRIENDS table created!')
  })
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('friends');
};
