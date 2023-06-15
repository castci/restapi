const jwt = require('jsonwebtoken');

const tokenSecret = process.env.TOKEN_SECRET;

const verifyAuth = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: " token not valid" });
  }

  console.log(token);

  jwt.verify(token, tokenSecret, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ error: 'token not authorized' });
    }

    req.user = decoded;
    next();    
  });
};

module.exports = verifyAuth;
