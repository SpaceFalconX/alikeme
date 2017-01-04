const Promise = require('bluebird')

exports.seed = (knex, Promise) => {
  return Promise.join(
    knex('users').del(),
    knex('users').insert({id: 1, username: 'sevda', email: 'sevda@g.com', password: '123' }),
    knex('users').insert({id: 2, username: 'isaac', email: 'isaac@g.com', password: '123' }),
    knex('users').insert({id: 3, username: 'wasiff', email: 'wassiff@g.com', password: '123' }),
   
    knex('categories').del(),
    knex('categories').insert({id: 1, name: 'fruits'}),
    knex('categories').insert({id: 2, name: 'veggies'}),
    knex('categories').insert({id: 3, name: 'grains'}),
   
    knex('posts').del(),
    knex('posts').insert({id: 1, content: 'an apple a day keeps the doctor away', title: 'FruitMania', user_id: 1, category_id: 1 }),
    knex('posts').insert({id: 2, content: 'orange me pretty', title: 'Orange!', user_id: 1, category_id: 1 }),
    knex('posts').insert({id: 3, content: 'anyone fancy an artcihoke?', title: 'VeggieMania', user_id: 2, category_id: 2}),
    knex('posts').insert({id: 4, content: 'Brussel Sprouts yoohooo', title: 'brussel', user_id: 1, category_id: 2}),
    knex('posts').insert({id: 5, content: 'wholegrains are good for you', title: 'GrainyPost', user_id: 2, category_id: 3}),
    
    knex('tags').del(),
    knex('tags').insert({id: 1, name: 'apples'}),
    knex('tags').insert({id: 2, name: 'oranges'}),
    knex('tags').insert({id: 3, name: 'kiwi'}),
    knex('tags').insert({id: 4, name: 'rice'}),
    knex('tags').insert({id: 5, name: 'sprouts'}),
    knex('tags').insert({id: 6, name: 'banana'}),
    knex('tags').insert({id: 7, name: 'artichoke'}),

    knex('posts_tags').del(),
    knex('posts_tags').insert({id: 1, post_id: 1, tag_id: 1}),
    knex('posts_tags').insert({id: 2, post_id: 2, tag_id: 2}),
    knex('posts_tags').insert({id: 3, post_id: 3, tag_id: 7}),
    knex('posts_tags').insert({id: 4, post_id: 4, tag_id: 5}),
    knex('posts_tags').insert({id: 5, post_id: 5, tag_id: 4}),
    knex('posts_tags').insert({id: 6, post_id: 5, tag_id: 5}),
    knex('posts_tags').insert({id: 7, post_id: 5, tag_id: 7})
  )
};
