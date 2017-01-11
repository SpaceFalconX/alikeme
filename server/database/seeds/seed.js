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
        knex('post_stars').del(),
        knex('users').del(),

        knex('users').insert({id: 1, username: 'sevda', email: 'sevda@g.com', password: '123', twitterLink: 'sevda_tw',
            openness: 0.60  ,conscientiousness: 0.10, extraversion: 0.40, agreeableness: 0.20, emotionalRange: 0.80}),
        knex('users').insert({id: 2, username: 'isaac', email: 'isaac@g.com', password: '123', twitterLink: 'isaac_tw',
        openness: 0.35 ,conscientiousness: 0.25, extraversion: 0.70, agreeableness: 0.45, emotionalRange: 0.55}),
        knex('users').insert({id: 3, username: 'wasiff', email: 'wassiff@g.com', password: '123',  twitterLink: 'wasiff_tw',
        openness: 0.90 ,conscientiousness: 0.49, extraversion: 0.58, agreeableness: 0.15, emotionalRange: 0.82}),
        knex('users').insert({id: 4, username: 'timUrban', email: 'tim_urban@g.com', password: '123',  twitterLink: 'waitbutwhy',
        openness: 0.90 ,conscientiousness: 0.49, extraversion: 0.58, agreeableness: 0.20, emotionalRange: 0.82}),
        knex('users').insert({id: 5, username: 'hackReactor', email: 'hack@g.com', password: '123',  twitterLink: 'HackReactor',
        openness: 0.45 ,conscientiousness: 0.36, extraversion: 0.53, agreeableness: 0.15, emotionalRange: 0.42}),

        knex('followers_following').insert({id: 1, follower_id: 1, followed_id: 3}),
        knex('followers_following').insert({id: 2, follower_id: 2, followed_id: 3}),
        knex('followers_following').insert({id: 3, follower_id: 3, followed_id: 2}),
        knex('followers_following').insert({id: 4, follower_id: 4, followed_id: 1}),
        knex('followers_following').insert({id: 5, follower_id: 5, followed_id: 1}),
        knex('followers_following').insert({id: 6, follower_id: 5, followed_id: 2}),
        knex('followers_following').insert({id: 7, follower_id: 5, followed_id: 3}),

        knex('categories').insert({id: 1, name: 'fruits'}),
        knex('categories').insert({id: 2, name: 'veggies'}),
        knex('categories').insert({id: 3, name: 'grains'}),

        knex('posts').insert({
          id: 1, 
          content: `As a young child in the capital of North Korea, Sungju Lee lived a pampered life. But by the time he was a teenager, he was starving and fighting for survival in a street gang. It was one of many twists of fate on a journey that has led him to postgraduate studies at a British university. In the early 1990s, Sungju Lee was living comfortably with his parents in a three-bedroom apartment in Pyongyang. He attended school and Taekwondo classes, visited parks and rode on Ferris wheels. He assumed that, like his father, he would grow up to become an officer in the North Korean army. But in 1994, this life came to an abrupt end with the death of North Korea's founding father, Kim Il-Sung.`, 
          title: 'FruitMania', user_id: 1, category_id: 1 
        }),
        knex('posts').insert({
          id: 2, 
          content: `Four and a half million Americans live in areas of these cities with the highest numbers of gun homicide, which are marked by intense poverty, low levels of education, and racial segregation. Geographically, these neighborhood areas are small: a total of about 1,200 neighborhood census tracts, which, laid side by side, would fit into an area just 42 miles wide by 42 miles long.`, 
          title: 'Orange!', user_id: 1, category_id: 1 
        }),
        knex('posts').insert({
          id: 3, 
          content: `Alexander Bastrykin, a close aide to President Vladimir Putin and head of the federal investigative agency, who has led campaigns against domestic dissidents and foreign NGOs working in Russia. US officials say he was complicit in the Magnitsky case`, 
          title: 'VeggieMania', user_id: 2, category_id: 2
        }),
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
        knex('posts_tags').insert({id: 7, post_id: 5, tag_id: 7}),

        knex('posts_stars').insert({star_id: 1, user_id: 3}),
        knex('posts_stars').insert({star_id: 4, user_id: 3}),
        knex('posts_stars').insert({star_id: 3, user_id: 2}),
        knex('posts_stars').insert({star_id: 4, user_id: 1}),
        knex('posts_stars').insert({star_id: 5, user_id: 1}),
        knex('posts_stars').insert({star_id: 5, user_id: 5}),
        knex('posts_stars').insert({star_id: 5, user_id: 3})
      )
      .then((seed) => {
        console.log(`Seeded db with ${seed.length} entries.`)
      })
      .catch((err) => {
        console.log(`Error: ${err}`)
      })

    }
  })
};






