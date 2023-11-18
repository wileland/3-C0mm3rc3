require('dotenv').config();

const Sequelize = require('sequelize');

let sequelize;

if (process.env.NODE_ENV === "test") {
  // Configuration for the test environment
  sequelize = new Sequelize(
    process.env.DB_NAME, // Test database name
    process.env.DB_USER, // Test database user
    process.env.DB_PW,   // Test database password
    {
      host: process.env.DB_HOST, // Test database host
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
      logging: false, // Disable logging for the test environment
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
  );
} else if (process.env.JAWSDB_URL) {
  // Configuration for the production environment with JAWSDB
  sequelize = new Sequelize(process.env.JAWSDB_URL, {
    dialectOptions: {
      decimalNumbers: true,
    },
    logging: false, // Disable or limit logging in production
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
} else {
  // Configuration for the development environment
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PW,
    {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
      logging: true, // Enable logging for the development environment
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
  );
}

module.exports = sequelize;
