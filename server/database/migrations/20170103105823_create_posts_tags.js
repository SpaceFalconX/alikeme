
exports.up = (knex, Promise) => {
  return knex.schema.createTable('posts_tags', (joinTable) => {
    joinTable.increments('id').primary().notNullable();
    joinTable.integer('post_id').notNullable();
    joinTable.integer('tag_id').notNullable();
  })
  .then(()=>{
  	console.log('POSTS_TAGS table created!')
  })
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('posts_tags');
};
