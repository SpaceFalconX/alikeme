const getTwitterFeed = require('../config/twitter.js')
const personality_insights = require('../config/ibm_watson.js');
const express = require('express');

const router = express.Router();

router.post('/personality', (req, res) => {
  console.log('req body', req.body.twitter)
  let options = {
	  screen_name: req.body.twitter,
	  include_rts: false,
    count: 100
  }
  getTwitterFeed(options).then((feed)=> {
    personality_insights.profile({ text: feed }, (err, result) => {
        if (err) {
          res.status(400).send({error: err.message})
        }
        personality = {};
        let trait = result.tree.children[0].children[0];
        personality.Openness = trait.children[0].percentage
        personality.Conscientiousness = trait.children[1].percentage
        personality.Extraversion = trait.children[2].percentage
        personality.Agreeableness = trait.children[3].percentage
        personality['Emotional range'] = trait.children[4].percentage
        res.status(200).send(personality)
    })
  })
  .catch((err) => {
    res.status(404).send({error: err.message})
  })
})

module.exports = router