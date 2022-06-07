const express = require('express');
const router = express.Router();
const admin = require('../services/admin');

router.get('/', async function(req, res, next) {
  try {
    res.json(await admin.GetAdmin(req.query));
  } catch (err) {
    console.error(`Error while getting admin `, err.message);
    next(err);
  }
});
router.post('/', async function(req, res, next) {
    try {
      res.json(await admin.CreateAdmin(req.body));
    } catch (err) {
      console.error(`Error while creating a product`, err.message);
      next(err);
    }
  });
  router.put('/:id', async function(req, res, next) {
    try {
      res.json(await admin.UpdateAdmin(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating the product`, err.message);
      next(err);
    }
  });
  router.delete('/:id', async function(req, res, next) {
    try {
      res.json(await admin.RemoveAdmin(req.params.id));
    } catch (err) {
      console.error(`Error while deleting the product`, err.message);
      next(err);
    }
  });

module.exports = router;