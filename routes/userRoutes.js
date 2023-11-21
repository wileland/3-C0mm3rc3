const router = require('express').Router();
const { User } = require('../models');
const jwt = require('jsonwebtoken');

// Function for consistent error response
const sendErrorResponse = (res, statusCode, message) => {
  console.error(message);
  res.status(statusCode).json({ message });
};

// Function to generate JWT token
const generateToken = (user) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  const token = jwt.sign({ id: user.id, email: user.email }, secretKey, {
    expiresIn: '24h',
  });
  return token;
};

// Function for validating email and password
const validateEmailAndPassword = (email, password) => {
  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const isValidPassword = (password) => password && password.length >= 8;

  return isValidEmail(email) && isValidPassword(password);
};

// Endpoint for user registration
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!validateEmailAndPassword(email, password)) {
      return sendErrorResponse(res, 400, 'Invalid email or password');
    }

    const newUser = await User.create(req.body);
    const userResponse = newUser.get({ plain: true });
    delete userResponse.password;
    res.status(200).json(userResponse);
  } catch (err) {
    console.error("Registration Error: ", err);
    res.status(500).json(err);
  }
});

// Endpoint for user login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!validateEmailAndPassword(email, password)) {
      return sendErrorResponse(res, 400, 'Invalid email or password');
    }

    const user = await User.findOne({ where: { email } });
    if (!user || !user.checkPassword(password)) {
      return sendErrorResponse(res, 401, 'Incorrect email or password');
    }

    const token = generateToken(user);
    res.status(200).json({
      user: { id: user.id, email: user.email, username: user.username },
      token,
      message: 'You are now logged in!'
    });
  } catch (err) {
    sendErrorResponse(res, 500, 'Internal server error');
  }
});

module.exports = router;
