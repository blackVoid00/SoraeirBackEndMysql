const express = require('express');
const router = express.Router();
const products = require('../services/products');

router.get('/', async function(req, res, next) {
  try {
    res.json(await products.GetProducts(req.query));
  } catch (err) {
    console.error(`Error while getting products `, err.message);
    next(err);
  }
});
router.post('/', async function(req, res, next) {
    try {
      res.json(await products.CreateProduct(req.body));
    } catch (err) {
      console.error(`Error while creating a product`, err.message);
      next(err);
    }
  });
  router.put('/:id', async function(req, res, next) {
    try {
      res.json(await products.UpdateProduct(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating the product`, err.message);
      next(err);
    }
  });
  router.delete('/:id', async function(req, res, next) {
    try {
      res.json(await products.RemoveProduct(req.params.id));
    } catch (err) {
      console.error(`Error while deleting the product`, err.message);
      next(err);
    }
  });

module.exports = router;