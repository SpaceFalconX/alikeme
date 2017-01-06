
exports.up = (knex, Promise) => {
  return knex.schema.createTable('categories', (category) => {
    category.increments('id').primary();
    category.string('name').unique().notNullable();
  })
  .then(()=>{
  	console.log('CATEGORIES table created!')
  })
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('categories');
};
