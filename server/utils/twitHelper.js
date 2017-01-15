const getTwitterFeed = require('../config/twitter.js')
const personality_insights = require('../config/ibm_watson.js');

module.exports = (options) => {
  return new Promise ((resolve, reject) => {
    getTwitterFeed(options).then((feed, err)=> {
      console.log("Twitter Feed SUCCCESS - length:", feed.length, err)
      resolve(feed)
    })
    .catch((err) => {
      resolve(false);
    })
  })
}


