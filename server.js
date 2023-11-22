require('dotenv').config();
const express = require('express');
const sequelize = require('./config/connection');
const userRoutes = require('./routes/userRoutes');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the 3 C0mm3rc3 API!');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRoutes);

app.use('/api/users', userRoutes); // 
app.use(routes); // 

// Synchronize the models with the database
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
}).catch(err => console.error('Error syncing sequelize models: ', err));
