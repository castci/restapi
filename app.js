require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const { startDatabase } = require('./src/utils/mongodb');
const  ads = require('./src/controller/ad');
const login = require('./src/controller/auth/login');

const app = express();

const PORT = process.env.PORT || 3000;
const apiVersion = '/api/v1';

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.use(apiVersion, ads);
app.use(apiVersion, login);

startDatabase().then(async () => {
  console.log('Database started');
  app.listen(PORT, () => {
    console.log(`Server running under port: ${PORT}`);
  });
});
