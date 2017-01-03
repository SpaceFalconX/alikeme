const db = require('../config');
const Category = require('../models/category.js');

const Categories = db.Collection.extend({
  model: Category
});

module.exports = db.collection('Categories', Categories);
