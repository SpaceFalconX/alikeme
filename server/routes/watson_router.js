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
        res.status(200).send(result)
    })
  })
  .catch((err) => {
    res.status(404).send({error: err.message})
  })
})

module.exports = router