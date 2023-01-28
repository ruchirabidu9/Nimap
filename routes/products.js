'use strict';
//const authe = require('../middlewares/authe');
const db = require('../models/index');
const express = require('express');
const Category = require('../models/category');
const Product = require('../models/product');
const autho = require('../middlewares/autho');
//onst supervisior = require('../middlewares/supervisior.js');
const router = express.Router();

router.get('/', async (req, res) => {
    const products = await db.products.findAll({
      include: [{
        model: db.categories,
        attributes: ['name']
      }]
    });
    res.send(products);
});  

router.post('/', autho, async (req, res) => {
  const product = new db.products({
               name: req.body.name,
               price: req.body.price
             });
  await product.save();
  res.send(product);
});

router.put('/:id', autho, async (req, res) => {
  const product = await db.products.update({
                name: req.body.name,
                price: req.body.price,
              }, {
    where: {id: req.params.id},
    returning: true
  });
  if (!product) return res.status(404).send('The preferred product was not found'); 
  res.send(product);
});

router.delete('/:id', autho, async (req, res) => {
  const product = await db.products.destroy({
    where: { id: req.params.id},
    returning: true
  });
  if (!product) return res.status(400).send('The product was not found');
  res.send(product);
});

module.exports = router;