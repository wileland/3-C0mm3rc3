const { Product } = require('../models');

const productData = [
  {
    product_name: 'Plain T-Shirt',
    price: 14.99,
    stock: 14,
    category_id: 1, // Shirts
  },
  {
    product_name: 'Running Sneakers',
    price: 90.0,
    stock: 25,
    category_id: 5, // Shoes
  },
  {
    product_name: 'Branded Baseball Hat',
    price: 22.99,
    stock: 12,
    category_id: 4, // Hats
  },
  {
    product_name: 'Top 40 Music Compilation Vinyl Record',
    price: 12.99,
    stock: 50,
    category_id: 3, // Music
  },
  {
    product_name: 'Cargo Shorts',
    price: 29.99,
    stock: 22,
    category_id: 2, // Shorts
  },
];

const seedProducts = async () => {
  try {
    await Product.bulkCreate(productData);
    console.log('\n----- PRODUCTS SEEDED -----\n');
  } catch (err) {
    console.error('Error seeding products: ', err);
  }
};

module.exports = seedProducts;
