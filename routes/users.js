const autho = require('../middlewares/autho');
const config = require('config');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const db = require('../models');
const router = express.Router();

router.get('/me', autho, async (req, res) => {
  const user = await db.users.findOne({ where: {
    id: req.user.id},
    attributes: {
      exclude: ['password']
    }
  });
    res.send(user);
});

router.post('/', async (req, res) => {
  
  let user = await db.users.findOne({ where: {
    email: req.body.email 
  }
});
  if (user) return res.status(400).send('User already registered');

  user = new db.users(_.pick(req.body, ['name', 'email', 'phone', 'password', 'role'])); 
  
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  const token = jwt.sign({ id: user.id, role: user.role}, config.get('jwtPrivateKey'));
  res.header('x-auth-token', token).send( _.pick(user, ['name', 'email', 'role']));
});
 
module.exports = router;

