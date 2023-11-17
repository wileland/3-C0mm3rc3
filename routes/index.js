const router = require('express').Router();
const apiRoutes = require('./api');

// Use API routes
router.use('/api', apiRoutes);

// Fallback for any other request that doesn't match
router.use((req, res) => {
  res.status(404).send("<h1>Wrong Route!</h1>")
});

module.exports = router;
