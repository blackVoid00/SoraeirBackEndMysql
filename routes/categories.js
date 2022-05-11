const express = require('express');
const router = express.Router();
const categories = require('../services/categories');

router.get('/', async function(req, res, next) {
  try {
    res.json(await categories.GetCategories(req.query));
  } catch (err) {
    console.error(`Error while getting categories `, err.message);
    next(err);
  }
});
router.post('/', async function(req, res, next) {
    try {
      res.json(await categories.CreateCategory(req.body));
    } catch (err) {
      console.error(`Error while creating a category`, err.message);
      next(err);
    }
  });
  router.put('/:id', async function(req, res, next) {
    try {
      res.json(await categories.UpdateCategory(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating the category`, err.message);
      next(err);
    }
  });
  router.delete('/:id', async function(req, res, next) {
    try {
      res.json(await categories.RemoveCategory(req.params.id));
    } catch (err) {
      console.error(`Error while deleting the category`, err.message);
      next(err);
    }
  });

module.exports = router;