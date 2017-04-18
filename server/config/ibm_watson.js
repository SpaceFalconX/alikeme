'use strict'

const PersonalityInsightsV2 = require('watson-developer-cloud/personality-insights/v2')

const personality_insights = new PersonalityInsightsV2({
  username: '2c9e3a74-f465-497d-93ab-59b11afe5cfe',
  password: 'I7uzL5wrJOHB'
});

module.exports = personality_insights;
