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
        knex('users').insert({id: 4, username: 'elliott', email: 'elliott@g.com', password: '123',  twitterLink: 'eliott',
        openness: 0.93 ,conscientiousness: 0.69, extraversion: 0.78, agreeableness: 0.65, emotionalRange: 0.92}),
        knex('users').insert({id: 5, username: 'dan', email: 'dan@g.com', password: '123',  twitterLink: 'dan_tw',
        openness: 0.30 ,conscientiousness: 0.49, extraversion: 0.58, agreeableness: 0.54, emotionalRange: 0.82}),
        knex('users').insert({id: 6, username: 'eric', email: 'eric@g.com', password: '123',  twitterLink: 'eric_tw',
        openness: 0.80 ,conscientiousness: 0.39, extraversion: 0.18, agreeableness: 0.92, emotionalRange: 0.72}),
        knex('users').insert({id: 7, username: 'val', email: 'val@g.com', password: '123',  twitterLink: 'val_tw',
        openness: 0.90 ,conscientiousness: 0.79, extraversion: 0.28, agreeableness: 0.22, emotionalRange: 0.82}),
        knex('users').insert({id: 8, username: 'nate', email: 'ate@g.com', password: '123',  twitterLink: 'at_tw',
        openness: 0.20 ,conscientiousness: 0.99, extraversion: 0.38, agreeableness: 0.21, emotionalRange: 0.52}),
        knex('users').insert({id: 9, username: 'collin', email: 'col@g.com', password: '123',  twitterLink: 'collin_tw',
        openness: 0.30 ,conscientiousness: 0.49, extraversion: 0.58, agreeableness: 0.20, emotionalRange: 0.42}),
        knex('users').insert({id: 10, username: 'alisa', email: 'alisa@g.com', password: '123',  twitterLink: 'alisa_tw',
        openness: 0.40 ,conscientiousness: 0.39, extraversion: 0.98, agreeableness: 0.19, emotionalRange: 0.92}),
        knex('users').insert({id: 11, username: 'neil', email: 'neil@g.com', password: '123',  twitterLink: 'nico_tw',
        openness: 0.50 ,conscientiousness: 0.79, extraversion: 0.88, agreeableness: 0.18, emotionalRange: 0.82}),
        knex('users').insert({id: 12, username: 'paul', email: 'paul@g.com', password: '123',  twitterLink: 'paul_tw',
        openness: 0.60 ,conscientiousness: 0.29, extraversion: 0.78, agreeableness: 0.17, emotionalRange: 0.72}),
        knex('users').insert({id: 13, username: 'bei', email: 'bei@g.com', password: '123',  twitterLink: 'bei_tw',
        openness: 0.70 ,conscientiousness: 0.39, extraversion: 0.68, agreeableness: 0.16, emotionalRange: 0.62}),
        knex('users').insert({id: 14, username: 'nikshila', email: 'nic@g.com', password: '123',  twitterLink: 'nic_tw',
        openness: 0.80 ,conscientiousness: 0.29, extraversion: 0.58, agreeableness: 0.15, emotionalRange: 0.52}),
        knex('users').insert({id: 15, username: 'barktek', email: 'bartek@g.com', password: '123',  twitterLink: 'bartek_tw',
        openness: 0.90 ,conscientiousness: 0.79, extraversion: 0.48, agreeableness: 0.14, emotionalRange: 0.42}),
        knex('users').insert({id: 16, username: 'whiteshadow', email: 'whiteshadow@g.com', password: '123',  twitterLink: 'ws_tw',
        openness: 0.01 ,conscientiousness: 0.01, extraversion: 0.01, agreeableness: 0.13, emotionalRange: 0.32}),
        knex('users').insert({id: 17, username: 'bei', email: 'bei@g.com', password: '123',  twitterLink: 'bei_tw',
        openness: 0.30 ,conscientiousness: 0.49, extraversion: 0.38, agreeableness: 0.12, emotionalRange: 0.22}),
        knex('users').insert({id: 18, username: 'bei', email: 'bei@g.com', password: '123',  twitterLink: 'bei_tw',
        openness: 0.20 ,conscientiousness: 0.89, extraversion: 0.28, agreeableness: 0.11, emotionalRange: 0.12}),


        knex('followers_following').insert({id: 1, follower_id: 1, followed_id: 3}),
        knex('followers_following').insert({id: 2, follower_id: 2, followed_id: 3}),
        knex('followers_following').insert({id: 3, follower_id: 3, followed_id: 2}),
        knex('followers_following').insert({id: 4, follower_id: 4, followed_id: 1}),
        knex('followers_following').insert({id: 5, follower_id: 5, followed_id: 1}),
        knex('followers_following').insert({id: 6, follower_id: 5, followed_id: 2}),
        knex('followers_following').insert({id: 7, follower_id: 5, followed_id: 3}),

        knex('categories').insert({id: 1, name: 'coffee'}),
        knex('categories').insert({id: 2, name: 'software'}),
        knex('categories').insert({id: 3, name: 'javascript'}),
        knex('categories').insert({id: 4, name: 'developer'}),
        knex('categories').insert({id: 5, name: 'developer'}),
        knex('categories').insert({id: 6, name: 'concert'}),
        knex('categories').insert({id: 7, name: 'coffee'}),
        knex('categories').insert({id: 8, name: 'javascript'}),
        knex('categories').insert({id: 9, name: 'javascript'}),
        knex('categories').insert({id: 10, name: 'javascript'}),
        knex('categories').insert({id: 12, name: 'rent'}),
        knex('categories').insert({id: 13, name: 'business'}),

        knex('posts').insert({id: 1, content: `As a young child in the capital of North Korea, Sungju Lee lived a pampered life. 
        But by the time he was a teenager, he was starving and fighting for survival in a street gang. 
        It was one of many twists of fate on a journey that has led him to postgraduate studies at a British university. 
        In the early 1990s, Sungju Lee was living comfortably with his parents in a three-bedroom apartment in Pyongyang. 
        He attended school and Taekwondo classes, visited parks and rode on Ferris wheels. He assumed that, like his father, 
        he would grow up to become an officer in the North Korean army. But in 1994, this life came to an abrupt end with the death of North Korea's founding father, Kim Il-Sung.`, title: 'Life', user_id: 1, category_id: 1}),
        knex('posts').insert({id: 2, content: `Four and a half million Americans live in areas of these cities with the highes numbers of gun homicide, which are marked by intense poverty, low levels of education, and racial segregation. 
        Geographically, these neighborhood areas are small: a total of about 1,200 neighborhood census tracts, which, 
        laid side by side, would fit into an area just 42 miles wide by 42 miles long.`, title: 'Orange!', user_id: 1, category_id:1}),
        knex('posts').insert({id: 3, content: `Alexander Bastrykin, a close aide to President Vladimir Putin and head of the federal investigative agency, who has led campaigns against domestic dissidents and foreign NGOs working in Russia. US officials say he was complicit in the Magnitsky case`, title: 'Code!', user_id: 2, category_id: 2}),
        knex('posts').insert({id: 4, content: 'Woody equal ask saw sir weeks aware decay. Entrance prospect removing we packages strictly is no smallest he. For hopes may chief get hours day rooms. Oh no turned behind polite piqued enough at. Forbade few through inquiry blushes you. Cousin no itself eldest it in dinner latter missed no. Boisterous estimating interested collecting get conviction friendship say boy. Him mrs shy article smiling respect opinion excited. Welcomed humoured rejoiced peculiar to in an. ', title: 'What is a closure?', user_id: 3, category_id: 2}),
        knex('posts').insert({id: 5, content: 'Indulgence announcing uncommonly met she continuing two unpleasing terminated. Now busy say down the shed eyes roof paid her. Of shameless collected suspicion existence in. Share walls stuff think but the arise guest. Course suffer to do he sussex it window advice. Yet matter enable misery end extent common men should. Her indulgence but assistance favourable cultivated everything collecting. ', title: 'You Dont know JS', user_id: 4, category_id: 3}),
        knex('posts').insert({id: 6, content: 'Entire any had depend and figure winter. Change stairs and men likely wisdom new happen piqued six. Now taken him timed sex world get. Enjoyed married an feeling delight pursuit as offered. As admire roused length likely played pretty to no. Means had joy miles her merry solid order. ', title: 'software dev', user_id: 5, category_id: 8}),
        knex('posts').insert({id: 7, content: 'By in no ecstatic wondered disposal my speaking. Direct wholly valley or uneasy it at really. Sir wish like said dull and need make. Sportsman one bed departure rapturous situation disposing his. Off say yet ample ten ought hence. Depending in newspaper an september do existence strangers. Total great saw water had mirth happy new. Projecting pianoforte no of partiality is on. Nay besides joy society him totally six. ', title: 'The bad parts', user_id: 6, category_id: 9}),
        knex('posts').insert({id: 8, content: 'Pleased him another was settled for. Moreover end horrible endeavor entrance any families. Income appear extent on of thrown in admire. Stanhill on we if vicinity material in. Saw him smallest you provided ecstatic supplied. Garret wanted expect remain as mr. Covered parlors concern we express in visited to do. Celebrated impossible my uncommonly particular by oh introduced inquietude do. ', title: 'Eiche!!', user_id: 7, category_id: 10},
        knex('posts').insert({id: 9, content: 'Prepared do an dissuade be so whatever steepest. Yet her beyond looked either day wished nay. By doubtful disposed do juvenile an. Now curiosity you explained immediate why behaviour. An dispatched impossible of of melancholy favourable. Our quiet not heart along scale sense timed. Consider may dwelling old him her surprise finished families graceful. Gave led past poor met fine was new. ', title: 'return null', user_id: 8, category_id: 3}),
        knex('posts').insert({id: 10, content: 'Warmly little before cousin sussex entire men set. Blessing it ladyship on sensible judgment settling outweigh. Worse linen an of civil jokes leave offer. Parties all clothes removal cheered calling prudent her. And residence for met the estimable disposing. Mean if he they been no hold mr. Is at much do made took held help. Latter person am secure of estate genius at.', title: 'instant', user_id: 9, category_id: 7}),
        knex('posts').insert({id: 11, content: 'Scarcely on striking packages by so property in delicate. Up or well must less rent read walk so be. Easy sold at do hour sing spot. Any meant has cease too the decay. Since party burst am it match. By or blushes between besides offices noisier as. Sending do brought winding compass in. Paid day till shed only fact age its end. ',title: 'Raising Arizona', user_id: 10, category_id: 12}),
        knex('posts').insert({id: 12, content: 'She who arrival end how fertile enabled. Brother she add yet see minuter natural smiling article painted. Themselves at dispatched interested insensible am be prosperous reasonably it. In either so spring wished. Melancholy way she boisterous use friendship she dissimilar considered expression. Sex quick arose mrs lived. Mr things do plenty others an vanity myself waited to. Always parish tastes at as mr father dining at. ', title: 'Looking for a JS developer to build burgers', user_id: 11, category_id: 13}),
        knex('posts').insert({id: 13, content: 'Whole every miles as tiled at seven or. Wished he entire esteem mr oh by. Possible bed you pleasure civility boy elegance ham. He prevent request by if in pleased. Picture too and concern has was comfort. Ten difficult resembled eagerness nor. Same park bore on be. Warmth his law design say are person. Pronounce suspected in belonging conveying ye repulsive. ', title: 'File system', user_id: 12, category_id: 5}),
        knex('posts').insert({id: 14, content: 'By in no ecstatic wondered disposal my speaking. Direct wholly valley or uneasy it at really. Sir wish like said dull and need make. Sportsman one bed departure rapturous situation disposing his. Off say yet ample ten ought hence. Depending in newspaper an september do existence strangers. Total great saw water had mirth happy new. Projecting pianoforte no of partiality is on. Nay besides joy society him totally six. ', title: 'Atomic operations', user_id: 13, category_id: 3}),


        knex('tags').insert({id: 1, name: 'instant'}),
        knex('tags').insert({id: 2, name: 'react'}),
        knex('tags').insert({id: 3, name: 'jquery'}),
        knex('tags').insert({id: 4, name: 'angular'}),
        knex('tags').insert({id: 5, name: 'js'}),
        knex('tags').insert({id: 6, name: 'pink floyd'}),
        knex('tags').insert({id: 7, name: 'peets'}),
        knex('tags').insert({id: 10, name: 'css'}),
        knex('tags').insert({id: 12, name: 'room'}),
        knex('tags').insert({id: 13, name: 'startup'}),
        knex('tags').insert({id: 4, name: 'router'}),
        knex('tags').insert({id: 5, name: 'redux'}),
        knex('tags').insert({id: 6, name: 'oasis'}),
        knex('tags').insert({id: 7, name: 'starbucks'}),
        knex('tags').insert({id: 9, name: 'javascript'}),
        knex('tags').insert({id: 12, name: 'room'}),
        knex('tags').insert({id: 13, name: 'startup'}),
        knex('tags').insert({id: 4, name: 'router'}),
        knex('tags').insert({id: 5, name: 'redux'}),
        knex('tags').insert({id: 6, name: 'oasis'}),
        knex('tags').insert({id: 7, name: 'starbucks'}),

        knex('posts_tags').insert({id: 1, post_id: 1, tag_id: 1}),
        knex('posts_tags').insert({id: 2, post_id: 2, tag_id: 2}),
        knex('posts_tags').insert({id: 3, post_id: 3, tag_id: 7}),
        knex('posts_tags').insert({id: 4, post_id: 4, tag_id: 5}),
        knex('posts_tags').insert({id: 5, post_id: 5, tag_id: 4}),
        knex('posts_tags').insert({id: 6, post_id: 5, tag_id: 5}),
        knex('posts_tags').insert({id: 7, post_id: 5, tag_id: 7}),
        knex('posts_tags').insert({id: 8, post_id: 7, tag_id: 9}),
        knex('posts_tags').insert({id: 9, post_id: 8, tag_id: 10}),
        knex('posts_tags').insert({id: 10, post_id: 9, tag_id: 11}),
        knex('posts_tags').insert({id: 11, post_id: 10, tag_id: 12}),
        knex('posts_tags').insert({id: 12, post_id: 11, tag_id: 13}),
        knex('posts_tags').insert({id: 13, post_id: 12, tag_id: 14}),
        knex('posts_tags').insert({id: 14, post_id: 13, tag_id: 3}),

        knex('posts_stars').insert({star_id: 1, user_id: 3}),
        knex('posts_stars').insert({star_id: 4, user_id: 3}),
        knex('posts_stars').insert({star_id: 3, user_id: 2}),
        knex('posts_stars').insert({star_id: 4, user_id: 1}),
        knex('posts_stars').insert({star_id: 5, user_id: 1}),
        knex('posts_stars').insert({star_id: 5, user_id: 5}),
        knex('posts_stars').insert({star_id: 5, user_id: 3}),
        
      )
      .then((seed) => {
        console.log(`Seeded db with ${seed.length} entries.`)
      })
      .catch((err) => {
        console.log(`Error: ${err}`)
      })
     )}
   })
  }