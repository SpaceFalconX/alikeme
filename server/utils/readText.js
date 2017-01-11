const personality_insights = require('../config/ibm_watson.js');

module.exports = (options) => {
  return new Promise ((resolve, reject) => {
      personality_insights.profile({ text: options }, (err, result) => {
        console.log("is this null?", result)
        if (result === null || result === undefined) {
          resolve("error")
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
  .catch((err) => {
    // reject("error")
    //res.status(404).send({error: err.message})
    console.log('error', err)
    resolve("error")
  })
}

