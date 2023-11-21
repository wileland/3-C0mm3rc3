// config/auth.js

const jwt = require('jsonwebtoken');

// Function to generate JWT token
const generateToken = (user) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  return jwt.sign({ id: user.id, email: user.email }, secretKey, {
    expiresIn: '24h', // Token expires in 24 hours
  });
};

module.exports = { generateToken };
