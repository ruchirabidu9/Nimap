const express = require('express');
const cors = require('cors');
const config = require('config');
const { sequelize, User } = require('./models');
const category = require('./models/category');
const users = require('./routes/users');
const categories = require('./routes/categories');
const products = require('./routes/products');
const autho = require('./routes/autho');

const app = express();
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5000"
};
if (!config.get('jwtPrivateKey')) {
  console.error('Fatal error: jwtPrivateKey is not defined ');
  process.exit(1);
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome');
});

app.use('/api/categories', categories);
app.use('/api/products', products);
app.use('/api/users', users);
app.use('/api/autho', autho);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}.`);
  await sequelize.authenticate(); 
  console.log('Database Connected');
});




