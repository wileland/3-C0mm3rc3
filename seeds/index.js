const seedCategories = require('./category-seeds');
const seedProducts = require('./product-seeds');
const seedTags = require('./tag-seeds');
const seedProductTags = require('./product-tag-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    await seedCategories();
    await seedProducts();
    await seedTags();
    await seedProductTags();
    console.log('\n----- SEEDING COMPLETE -----\n');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database: ', err);
    process.exit(1);
  }
};

seedAll();
