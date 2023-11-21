require('dotenv').config();
const express = require('express');
const sequelize = require('./config/connection');
const userRoutes = require('./routes/userRoutes');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes); // Assuming this includes the registration and login routes
app.use(routes); // Assuming this handles all other routes

// Synchronize the models with the database
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
}).catch(err => console.error('Error syncing sequelize models: ', err));
