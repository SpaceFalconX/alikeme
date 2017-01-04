
exports.up = (knex, Promise) => {
  return knex.schema.createTable('posts_tags', (joinTable) => {
    joinTable.increments('id').primary();
    joinTable.integer('post_id').unsigned().notNullable();
    joinTable.integer('tag_id').unsigned().notNullable();
  })
  .then(()=>{
  	console.log('POSTS_TAGS table created!')
  })
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('posts_tags');
};
