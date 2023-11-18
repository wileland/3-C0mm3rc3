require('dotenv').config();
const Sequelize = require('sequelize');

let sequelize;

if (process.env.NODE_ENV === "test") {
  // Configuration for test environment
  sequelize = new Sequelize('your_test_database_name', 'testuser', 'B30wulf7', {
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
      decimalNumbers: true,
    },
    // You can add other options here specific to the test environment
  });
} else if (process.env.JAWSDB_URL) {
  // Configuration for production environment with JAWSDB
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // Configuration for development environment
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
      decimalNumbers: true,
    },
    // You can add other options here specific to the development environment
  });
}

module.exports = sequelize;
