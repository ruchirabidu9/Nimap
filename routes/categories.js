'use strict';

const db = require('../models/index');
const express = require('express');
const Category = require('../models/category');
const autho = require('../middlewares/autho');
const router = express.Router();

router.get('/', async (req, res) => {
  const categories = await db.categories.findAll();
  res.send(categories);
});

router.post('/', autho, async (req, res) => {
  const category = new db.categories({ name: req.body.name});
  await category.save();
  res.send(category);
});

router.put('/:id', autho, async (req, res) => {
  const category = await db.categories.update({name: req.body.name}, {
    where: {id: req.params.id}
  });
  res.send(category);
});

router.delete('/:id', autho, async (req, res) => {
  const category = await db.categories.destroy({
    where: { id: req.params.id}
  });
  if(!category) return res.sendStatus(400).send('The catergory was not found');
  res.sendStatus(200).send(category);
});

module.exports = router;