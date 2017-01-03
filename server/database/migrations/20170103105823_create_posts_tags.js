
exports.up = (knex, Promise) => {
  return knex.schema.createTable('posts_tags', (joinTable) => {
    joinTable.increments('id').primary();
    joinTable.integer('post_id').unique().notNullable();
    joinTable.integer('tag_id').unique().notNullable();
  })
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('posts_tags');
};
