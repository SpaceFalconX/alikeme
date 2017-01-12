exports.up = (knex, Promise) => {
  return knex.schema.createTable('posts_stars', (joinTable) => {
    joinTable.integer('star_id').unsigned().references('id').inTable('posts');
    joinTable.integer('user_id').unsigned().references('id').inTable('users');
  })
  .then(() => {
    console.log('posts_stars table created!')
  })
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('posts_stars');
};
