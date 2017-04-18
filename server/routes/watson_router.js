const express = require('express');
const util = require('../utils/util.js')
const router = express.Router();

router.post('/twitter/personality', (req, res) => {
  const options = {
    screen_name: req.body.twitter,
    include_rts: false,
    count: 100
  }
  util.readTwitter(options).then((personality) => {
    res.status(201).send(personality)
  })
})

router.post('/text/personality', (req, res) => {
  util.readText(req.body.text).then((personality) => {
    util.readPersonality(options)
    .then((personality, err) => {
      if(err) {
        return res.sendStatus(401).json({error})
      }
      res.status(201).send(personality)
    })
    .catch(() => {
      return res.status(403);
    })
  })
})

module.exports = router
