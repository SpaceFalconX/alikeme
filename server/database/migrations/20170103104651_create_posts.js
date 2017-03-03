
exports.up = (knex, Promise) => {
  return knex.schema.createTable('posts', (post) => {
    post.increments('id').primary();
    post.integer('user_id').unsigned().references('id').inTable('users');
    post.integer('category_id').unsigned().references('id').inTable('categories');
    post.string('title', 100).notNullable();
    post.text('content', 'mediumtext').notNullable();
    post.integer('stars_count').unsigned().notNullable().defaultTo(0);
    post.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    post.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());

  })
  .then(() => {
  	//console.log('POSTS table created!')
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