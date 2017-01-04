const db = require('../config');
const Posts_tag = require('../models/posts_tag.js');

const Posts_tags = db.Collection.extend({
  model: Posts_tag
});

module.exports = db.collection('Posts_tags', Posts_tags);
