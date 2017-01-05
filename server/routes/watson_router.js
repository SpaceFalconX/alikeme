const getTwitterFeed = require('../config/twitter.js')
const personality_insights = require('../config/ibm_watson.js');
const express = require('express');

const router = express.Router();

router.get('/personality', (req, res) => {
  getTwitterFeed().then((feed)=> {
    let traits = {}
    personality_insights.profile({ text: feed }, (err, result) => {
        if (err) { 
          res.status(400).send({error: err.message})
        }
        res.status(200).send(result)
    })
  })
  .catch((err) => {
    res.status(404).send({error: err.message})
  })
})

module.exports = router


        //   traits.Openness = response.tree.children[0].children[0].children[0].percentage
        //   traits.Conscientiousness = response.tree.children[0].children[0].children[1].percentage
        //   traits.Extraversion = response.tree.children[0].children[0].children[2].percentage
        //   traits.Agreeableness = response.tree.children[0].children[0].children[3].percentage
        //   traits['Emotional range'] = response.tree.children[0].children[0].children[4].percentage
        //   /** CHECKING CONSOLE */
        //   console.log(`***IBM WATSON***`)
        // //console.log(JSON.stringify(response, null, 2))
        //   console.log(`Openness, ${response.tree.children[0].children[0].children[0].percentage}`)
        //   console.log(`Conscientiousness, ${response.tree.children[0].children[0].children[1].percentage}`)
        //   console.log(`Extraversion', ${response.tree.children[0].children[0].children[2].percentage}`)
        //   console.log(`Agreeableness', ${response.tree.children[0].children[0].children[3].percentage}`)
        //   console.log(`Emotional range', ${response.tree.children[0].children[0].children[4].percentage}`)