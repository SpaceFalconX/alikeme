const personality_insights = require('../config/ibm_watson.js');
const twitter = require('../config/twitter.js');
const _ = require('underscore');

const readText = (text) => {
  return new Promise ((resolve, reject) => {
    personality_insights.profile({text: text}, (err, result) => {
      if(err || !result || !text.length) {
        resolve({})
      }
      else {
        personality = {};

        // trait.forEach(trait => personality[])
        let trait = result.tree.children[0].children[0];
        personality.openness = trait.children[0].percentage
        personality.conscientiousness = trait.children[1].percentage
        personality.extraversion = trait.children[2].percentage
        personality.agreeableness = trait.children[3].percentage
        personality.emotionalRange = trait.children[4].percentage
        resolve(personality)
      }
    })
  })
}

const getTwitterFeed = (twitterLink) => {
  const options = {
    screen_name: twitterLink,
    include_rts: false,
    count: 100
  }
  return twitter.get('statuses/user_timeline', options)
  .then((feed) => _.pluck(feed, 'text').join())
}

module.exports = {getTwitterFeed: getTwitterFeed, readText: readText};