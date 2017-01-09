const Category = require('../database/models/category.js')
const Categories = require('../database/collections/categories.js')

const express = require('express');
const router = express.Router();

router.route('/')
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
router.route('/:name')
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

//GET MATCHES --does not have related tags, moving to post router
// router.route('/matches')
//   .post((req, res) => {
//     console.log('matches body', req.body)
//     console.log('category id', req.body.post.category.id)
//     Categories.forge()
//     .query({where: {id: req.body.post.category.id}})
//     .fetch({withRelated: ['posts']})
//     .then((collection) => {
//       collection = collection.toJSON()[0].posts
//       //todo - GET TAGS!
//       //put this back in a post forge so you can have related tags and avoid extra logic

//       // let maxCount = 0;
//       // let currentMax;
//       // collection.forEach((post) => {
//       //   let tempMax = 0
//       //   post.
//       // })
//       res.json(collection)
//     })
//   })

module.exports = router;