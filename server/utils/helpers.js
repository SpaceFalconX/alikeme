const getTwitterFeed = require('../config/twitter.js')
const personality_insights = require('../config/ibm_watson.js');

module.exports = (options) => {
  return new Promise ((resolve, reject) => {
    getTwitterFeed(options).then((feed)=> {
      personality_insights.profile({ text: feed }, (err, result) => {
        if (err || !result ) {
          reject({error: err.message})
        }
        personality = {};
        let trait = result.tree.children[0].children[0];
        personality.openness = trait.children[0].percentage
        personality.conscientiousness = trait.children[1].percentage
        personality.extraversion = trait.children[2].percentage
        personality.agreeableness = trait.children[3].percentage
        personality.emotionalRange = trait.children[4].percentage
        resolve(personality)
      })
    })
    .catch((err) => {
      reject(err)
    })
  })
  .catch((err) => {
    return err;
  })
}


