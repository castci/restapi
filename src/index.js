require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.send([{
    title: 'Hello world',
  }]);
});

app.listen(PORT, () =>{
  console.log(`Server running under port: ${PORT}`);
});
