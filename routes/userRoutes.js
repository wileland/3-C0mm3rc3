const router = require('express').Router();
const { User } = require('../models');

// Endpoint for user registration
router.post('/register', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    // Exclude the password field from the response
    const userResponse = newUser.get({ plain: true });
    delete userResponse.password;
    res.status(200).json(userResponse);
  } catch (err) {
    // Log the error in development environment
    console.error("Registration Error: ", err);
    res.status(500).json(err);
  }
});

// Endpoint for user login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user || !user.checkPassword(req.body.password)) {
      res.status(401).json({ message: 'Incorrect email or password' });
      return;
    }

    // TODO: Implement session or token logic here
    // For example, generate and return a JWT token

    res.status(200).json({ user: { id: user.id, email: user.email, username: user.username }, message: 'You are now logged in!' });
  } catch (err) {
    // Log the error in development environment
    console.error("Login Error: ", err);
    res.status(500).json(err);
  }
});

module.exports = router;
