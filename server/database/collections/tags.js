const db = require('../config');
const Tag = require('../models/tag.js');

const Tags = db.Collection.extend({
  model: Tag
});

module.exports = Tags;
