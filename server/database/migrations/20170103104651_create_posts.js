
exports.up = (knex, Promise) => {
  return knex.schema.createTable('posts', (post) => {
    post.increments('id').primary();
    post.string('author').references('username').inTable('users');
    post.string('category_name').references('name').inTable('categories');
    post.string('title', 100).notNullable();
    post.text('content', 'mediumtext').notNullable();
    post.timestamps();
  })
  .then(() => {
  	console.log('POSTS table created!')
  })
  ;
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