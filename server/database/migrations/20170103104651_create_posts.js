
exports.up = (knex, Promise) => {
  return knex.schema.createTable('posts', (post) => {
    post.increments('id').primary().notNullable();
    post.integer('user_id').notNullable();
    post.integer('category_id').notNullable();
    post.string('title', 100).notNullable();
    post.text('content', 'mediumtext').notNullable();
    post.timestamps();
  });
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('posts');
};




/* Maybe add references later */
// post.integer('user_id')
//   .references('id')
//   .inTable('users');
// post.integer('category_id')
//   .references('id')
//   .inTable('categories');