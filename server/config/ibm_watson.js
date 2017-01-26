'use strict'

const PersonalityInsightsV2 = require('watson-developer-cloud/personality-insights/v2')

const personality_insights = new PersonalityInsightsV2({
  username: 'd8d0e835-769e-479b-bfa4-0c04dadaef54',
  password: 'a4VxUegCFz1z'
});

module.exports = personality_insights