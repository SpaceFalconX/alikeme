'use strict'

const PersonalityInsightsV2 = require('watson-developer-cloud/personality-insights/v2')

const personality_insights = new PersonalityInsightsV2({
  username: '2c91febf-7b31-4b47-9e27-18e69e2c2fe6',
  password: 'sJKhuK7kzzCN'
});

module.exports = personality_insights