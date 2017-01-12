
const express = require('express');
const readTwitter = require('../utils/helpers.js')
const readText = require('../utils/readText.js')
const router = express.Router();

router.post('/twitter/personality', (req, res) => {
  const options = {
    screen_name: req.body.twitter,
    include_rts: false,
    count: 100
  }
  readTwitter(options).then((personality) => {
    res.status(201).send(personality)
  })
})

router.post('/text/personality', (req, res) => {
  readText(req.body.text).then((personality) => {
    readPersonality(options)
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

// router.post('/getUserId', (req, res) => {
// 	//console.log('searching for username', req.body.username)
// 	Users.forge()
// 	.query({where: {username: req.body.username}})
// 	.fetch()
// 	.then((result) => {
// 		result = result.toJSON()[0].id
// 		//console.log('result', result)
// 		res.json(result)
// 	})
// 	.catch((err) => {
//     res.status(500).json({error: {message: err.message}});
//   });
// })

module.exports = router


// (req, res) => {
//   console.log('req body', req.body.twitter)
//   let options = {
//     screen_name: req.body.twitter,
//     include_rts: false,
//     count: 100
//   }
//   getTwitterFeed(options).then((feed)=> {
//     personality_insights.profile({ text: feed }, (err, result) => {
//         if (err) {
//           res.status(400).send({error: err.message})
//         }
//         personality = {};
//         let trait = result.tree.children[0].children[0];
//         personality.openness = trait.children[0].percentage
//         personality.conscientiousness = trait.children[1].percentage
//         personality.extraversion = trait.children[2].percentage
//         personality.agreeableness = trait.children[3].percentage
//         personality.emotionalRange = trait.children[4].percentage
//         res.status(200).send(personality)
//     })
//   })
//   .catch((err) => {
//     res.status(404).send({error: err.message})
//   })

