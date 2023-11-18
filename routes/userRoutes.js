const router = require('express').Router();
const { User } = require('../models');

router.post('/register', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user || !user.checkPassword(req.body.password)) {
      res.status(401).json({ message: 'Incorrect email or password' });
      return;
    }

    // Session or token logic here

    res.status(200).json({ user, message: 'You are now logged in!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
