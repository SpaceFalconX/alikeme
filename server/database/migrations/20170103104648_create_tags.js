
exports.up = (knex, Promise) => {
  return knex.schema.createTable('tags', (tag) => {
    tag.increments('id').primary().notNullable();
    tag.string('name', 100).unique().notNullable();
  })
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('tags');
};
