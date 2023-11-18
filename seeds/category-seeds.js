const { Category } = require('../models');

const categoryData = [
  {
    category_name: 'Shirts',
  },
  {
    category_name: 'Shorts',
  },
  {
    category_name: 'Music',
  },
  {
    category_name: 'Hats',
  },
  {
    category_name: 'Shoes',
  },
];

const seedCategories = async () => {
  try {
    await Category.bulkCreate(categoryData);
    console.log('\n----- CATEGORIES SEEDED -----\n');
  } catch (err) {
    console.error('Error seeding categories: ', err);
  }
};

module.exports = seedCategories;
