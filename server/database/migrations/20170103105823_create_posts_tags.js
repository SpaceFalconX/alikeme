
exports.up = (knex, Promise) => {
  return knex.schema.createTable('posts_tags', (joinTable) => {
    joinTable.increments('id').primary();
    joinTable.integer('post_id').unsigned().references('id').inTable('posts');
    joinTable.integer('tag_id').unsigned().references('id').inTable('tags');
  })
  .then(() => {
  	console.log('POSTS_TAGS table created!')
  })
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('posts_tags');
};
