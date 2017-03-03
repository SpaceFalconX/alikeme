'use strict'

const PersonalityInsightsV2 = require('watson-developer-cloud/personality-insights/v2')

const personality_insights = new PersonalityInsightsV2({
  username: 'b1458fd6-2abc-4074-8bb6-',
  password: 'nXQpgyjzwyIl'
});
// const personality_insights = new PersonalityInsightsV2({
//   username: 'b1458fd6-2abc-4074-8bb6-1c1b89ce3e29',
//   password: 'nXQpgyjzwyIl'
// });

module.exports = personality_insights;
