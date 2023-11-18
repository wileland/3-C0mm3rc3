const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection'); // Import sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// Sync sequelize models to the database
sequelize
  .sync({ force: false })
  .then(() => {
    // Start the server after syncing
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
  })
  .catch((err) => {
    console.error('Error syncing sequelize models: ', err);
  });
