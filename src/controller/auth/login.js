const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

let adminUser = {
  username: 'admin',
  pass: 'admin',
};

const tokenSecret = process.env.TOKEN_SECRET;

router.post('/login', (req, res) => {
  const { username, pass } = req.body;

  if(adminUser.username !== username || adminUser.pass !== pass) {
    return res.status(401).json({ error: 'User not authorized' });
  }

  const token = jwt.sign({ username }, tokenSecret, { expiresIn: 180 });

  res.json(token);
});

module.exports = router;
