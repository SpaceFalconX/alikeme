const personality_insights = require('../config/ibm_watson.js');

module.exports = (text) => {
  return new Promise ((resolve, reject) => {
    personality_insights.profile({ text: text }, (err, result) => {
      if(err) {
        resolve(false)
      }
      if (!result) {
        console.log("RESULT NULL", result)
        resolve(false)
      }
      else {
        personality = {};
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

