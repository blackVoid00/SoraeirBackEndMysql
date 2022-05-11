const express = require('express');
const router = express.Router();
const drones = require('../services/drones');

router.get('/', async function(req, res, next) {
  try {
    res.json(await drones.GetDrones(req.query));
  } catch (err) {
    console.error(`Error while getting drones `, err.message);
    next(err);
  }
});
router.post('/', async function(req, res, next) {
    try {
      res.json(await drones.Createdrone(req.body));
    } catch (err) {
      console.error(`Error while creating a drone`, err.message);
      next(err);
    }
  });
  router.put('/:id', async function(req, res, next) {
    try {
      res.json(await drones.Updatedrone(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating the drone`, err.message);
      next(err);
    }
  });
  router.delete('/:id', async function(req, res, next) {
    try {
      res.json(await drones.Removedrone(req.params.id));
    } catch (err) {
      console.error(`Error while deleting the drone`, err.message);
      next(err);
    }
  });

module.exports = router;