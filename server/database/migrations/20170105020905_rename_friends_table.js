exports.up = function(knex, Promise) {
  return knex.schema.renameTable('friends', 'followers_following')

};

exports.down = function(knex, Promise) {
	return knex.schema.renameTable('followers_following', 'friends')
};
