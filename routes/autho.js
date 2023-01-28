'use strict';

const config = require('config');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const db = require('../models/index');
const express = require('express');
const router = express.Router();
// const role = require('../models/role');
// const authe = require('../middlewares/authe');

router.post('/', async (req, res) => {  
  let user = await db.users.findOne({ where:{
    email: req.body.email 
  }
  });
  if (!user) return res.status(400).send('Invalid email or password');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password');
 
  const token = jwt.sign({ id: user.id, role: user.role}, config.get('jwtPrivateKey'));
  res.send(token);
});

module.exports = router; 