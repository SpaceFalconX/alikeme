
exports.up = (knex, Promise) => {
  return knex.schema.createTable('followers_following', (friend) => {
    friend.increments('id').primary();
    friend.integer('followed_id').unsigned().references('id').inTable('users');
    friend.integer('follower_id').unsigned().references('id').inTable('users');
    friend.unique(['follower_id', 'followed_id'], 'alike_friends');
  })

  .then(() => {
  	console.log('FOLLOWERS_FOLLOWING table created!')
  })
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('followers_following');
};
