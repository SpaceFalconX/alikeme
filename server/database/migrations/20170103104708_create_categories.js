
exports.up = (knex, Promise) => {
  return knex.schema.createTable('categories', (category) => {
    category.increments('id').primary().notNullable().notNullable();
    category.string('name', 100).unique().notNullable().notNullable();
  })
  .then(()=>{
  	console.log('CATEGORIES table created!')
  })
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('categories');
};
