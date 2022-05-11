const express = require('express');
const router = express.Router();
const users = require('../services/users');

router.get('/', async function(req, res, next) {
  try {
    res.json(await users.GetUsers(req.query));
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});
router.post('/', async function(req, res, next) {
    try {
      res.json(await users.CreateUser(req.body));
    } catch (err) {
      console.error(`Error while creating a user`, err.message);
      next(err);
    }
  });
  router.put('/:id', async function(req, res, next) {
    try {
      res.json(await users.UpdateUser(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating the user`, err.message);
      next(err);
    }
  });
  router.delete('/:id', async function(req, res, next) {
    try {
      res.json(await users.RemoveUser(req.params.id));
    } catch (err) {
      console.error(`Error while deleting the user`, err.message);
      next(err);
    }
  });

module.exports = router;