exports.up = function(knex, Promise) {
    return knex.schema.table('friends', function(friend) {
      friend.unique(['follower_id', 'followed_id'], 'alike_friends');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('friends', function(friend) {
      friend.dropUnique(['follower_id', 'followed_id'], 'alike_friends');
    });
};