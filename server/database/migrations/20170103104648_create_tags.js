
exports.up = (knex, Promise) => {
  return knex.schema.createTable('tags', (tag) => {
    tag.increments('id').primary();
    tag.string('name', 100).unique().notNullable();
  })
  .then(() => {
  	console.log('TAGS table created!')
  })
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('tags');
};
