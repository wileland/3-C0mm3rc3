require('dotenv').config();
const express = require('express');
const { json, urlencoded } = require('express');
const { sync } = require('./config/connection');
const userRoutes = require('./routes/userRoutes');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/api/users', userRoutes);
app.use(routes);

sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
}).catch(err => console.error('Error syncing sequelize models: ', err));
