const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// Get all products
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [{ model: Category }, { model: Tag }],
    });
    res.status(200).json(productData);
  } catch (err) {
    console.error("Error getting all products: ", err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get one product by ID
router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }],
    });
    if (!productData) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    console.error("Error getting product by ID: ", err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create a new product
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return { product_id: product.id, tag_id };
      });
      await ProductTag.bulkCreate(productTagIdArr);
    }
    res.status(201).json(product);
  } catch (err) {
    console.error("Error creating a product: ", err);
    res.status(400).json({ message: 'Bad request' });
  }
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!productData) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }
    res.status(200).json({ message: 'Product deleted!' });
  } catch (err) {
    console.error("Error deleting a product: ", err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
