const { ProductTag } = require('../models');

const productTagData = [
  { product_id: 1, tag_id: 6 }, // Plain T-Shirt with 'white' tag
  { product_id: 1, tag_id: 7 }, // Plain T-Shirt with 'gold' tag
  { product_id: 2, tag_id: 6 }, // Running Sneakers with 'white' tag
  { product_id: 2, tag_id: 8 }, // Running Sneakers with 'pop culture' tag
  { product_id: 3, tag_id: 1 }, // Branded Baseball Hat with 'rock music' tag
  { product_id: 3, tag_id: 4 }, // Branded Baseball Hat with 'red' tag
  { product_id: 3, tag_id: 5 }, // Branded Baseball Hat with 'green' tag
  { product_id: 4, tag_id: 1 }, // Top 40 Music Compilation Vinyl Record with 'rock music' tag
  { product_id: 4, tag_id: 2 }, // Top 40 Music Compilation Vinyl Record with 'pop music' tag
  { product_id: 4, tag_id: 8 }, // Top 40 Music Compilation Vinyl Record with 'pop culture' tag
  { product_id: 5, tag_id: 3 }, // Cargo Shorts with 'blue' tag
  { product_id: 5, tag_id: 7 }, // Cargo Shorts with 'gold' tag
];

const seedProductTags = async () => {
  try {
    await ProductTag.bulkCreate(productTagData);
    console.log('\n----- PRODUCT TAGS SEEDED -----\n');
  } catch (err) {
    console.error('Error seeding product tags: ', err);
  }
};

module.exports = seedProductTags;
