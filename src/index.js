require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const { startDatabase } = require('./model/mongodb');
const { insertAd, getAds } = require('./model/ads');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.get('/', async (req, res) => {
  res.send(await getAds());
});

startDatabase().then(async () => {
  await insertAd({ tittle: 'Hello from database' });
  app.listen(PORT, () => {
    console.log(`Server running under port: ${PORT}`);
  });
});
