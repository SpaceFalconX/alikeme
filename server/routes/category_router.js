const express = require('express');
const router = express.Router();
const Category = require('../database/models/category.js')
const Categories = require('../database/collections/categories.js')


router.route('/categories')
  // Fetch all categories - category collection
  .get((req, res) => {
    Categories.forge()
    .fetch()
    .then((collection) => {
      console.log(collection.toJSON())
      res.send(collection.toJSON());
    })
    .catch((err) => {
      res.status(500).json({error: err.message});
    });
  })
  // Create a new Category
  .post((req, res) => {
    Category.forge({name: req.body.name})
    .save()
    .then((category) => {
      res.json("Success!");
    })
    .catch((err) => {
      res.status(500).json({error: err.message});
    });
  })

// Delete a category (name params)
router.route('/categories/:name')
  .delete((req, res) => {
    Category.forge({name: req.params.name})
    .fetch({require: true})
    .then((category) => {
      category.destroy()
      .then(() => {
        res.json({data: {message: 'Category successfully deleted'}});
      })
      .catch((err) => {
        res.status(500).json({error: {message: err.message}});
      });
    })
    .catch((err) => {
      res.status(500).json({error: {message: err.message}});
    });
  });

// Get all categories and their related posts
router.route('/categories/posts')
  .get((req, res) => {
    Categories.forge()
    .fetch({withRelated: ['posts']})
    .then((collection) => {
      res.json({collection})
    })
  })


module.exports = router;