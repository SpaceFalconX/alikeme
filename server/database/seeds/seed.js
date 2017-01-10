const Promise = require('bluebird')

exports.seed = (knex, Promise) => {
  knex('users').count('id')
  .then((result) => {
    if(!result[0]['count(`id`)'])  {
      return Promise.join(
        knex('posts_tags').del(),
        knex('posts').del(),
        knex('tags').del(),
        knex('categories').del(),
        knex('followers_following').del(),
        knex('users').del(),

        knex('users').insert({id: 1, username: 'sevda', email: 'sevda@g.com', password: '123', twitterLink: 'sevda_tw',
            openness: 0.60  ,conscientiousness: 0.10, extraversion: 0.40, agreeableness: 0.20, emotionalRange: 0.80}),
        knex('users').insert({id: 2, username: 'isaac', email: 'isaac@g.com', password: '123', twitterLink: 'isaac_tw',
        openness: 0.35 ,conscientiousness: 0.25, extraversion: 0.70, agreeableness: 0.45, emotionalRange: 0.55}),
        knex('users').insert({id: 3, username: 'wasiff', email: 'wassiff@g.com', password: '123',  twitterLink: 'wasiff_tw',
        openness: 0.90 ,conscientiousness: 0.49, extraversion: 0.58, agreeableness: 0.15, emotionalRange: 0.82}),
        knex('users').insert({id: 4, username: 'timUrban', email: 'tim_urban@g.com', password: '123',  twitterLink: 'waitbutwhy'}),
        knex('users').insert({id: 5, username: 'hackReactor', email: 'hack@g.com', password: '123',  twitterLink: 'HackReactor'}),

        knex('categories').insert({id: 1, name: 'fruits'}),
        knex('categories').insert({id: 2, name: 'veggies'}),
        knex('categories').insert({id: 3, name: 'grains'}),

        knex('posts').insert({id: 1, content: 'an apple a day keeps the doctor away', title: 'FruitMania', user_id: 1, category_id: 1 }),
        knex('posts').insert({id: 2, content: 'orange me pretty', title: 'Orange!', user_id: 1, category_id: 1 }),
        knex('posts').insert({id: 3, content: 'anyone fancy an artcihoke?', title: 'VeggieMania', user_id: 2, category_id: 2}),
        knex('posts').insert({id: 4, content: 'Brussel Sprouts yoohooo', title: 'brussel', user_id: 1, category_id: 2}),
        knex('posts').insert({id: 5, content: 'wholegrains are good for you', title: 'GrainyPost', user_id: 2, category_id: 3}),
        knex('posts').insert({id: 6, content: 'SPINACH lover', title: 'verde', user_id: 1, category_id: 2}),
        knex('posts').insert({id: 7, content: 'Rice', title: 'Loving that rice!', user_id: 3, category_id: 3}),


        knex('tags').insert({id: 1, name: 'apples'}),
        knex('tags').insert({id: 2, name: 'oranges'}),
        knex('tags').insert({id: 3, name: 'kiwi'}),
        knex('tags').insert({id: 4, name: 'rice'}),
        knex('tags').insert({id: 5, name: 'sprouts'}),
        knex('tags').insert({id: 6, name: 'banana'}),
        knex('tags').insert({id: 7, name: 'artichoke'}),

        knex('posts_tags').insert({id: 1, post_id: 1, tag_id: 1}),
        knex('posts_tags').insert({id: 2, post_id: 2, tag_id: 2}),
        knex('posts_tags').insert({id: 3, post_id: 3, tag_id: 7}),
        knex('posts_tags').insert({id: 4, post_id: 4, tag_id: 5}),
        knex('posts_tags').insert({id: 5, post_id: 5, tag_id: 4}),
        knex('posts_tags').insert({id: 6, post_id: 5, tag_id: 5}),
        knex('posts_tags').insert({id: 7, post_id: 5, tag_id: 7})
      )
      .then((seed) => {
        console.log(`Seeded db with ${seed.length} entries.`)
      })
    }
  })
};
