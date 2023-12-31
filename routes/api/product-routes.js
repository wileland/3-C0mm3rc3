const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// Helper function to manage product tags
const updateProductTags = async (productId, tagIds) => {
  const productTags = await ProductTag.findAll({ where: { product_id: productId } });
  const productTagIds = productTags.map(({ tag_id }) => tag_id);

  // Determine which tags to add and which to remove
  const newProductTags = tagIds
    .filter(tag_id => !productTagIds.includes(tag_id))
    .map(tag_id => ({ product_id: productId, tag_id }));
  const productTagsToRemove = productTags
    .filter(({ tag_id }) => !tagIds.includes(tag_id))
    .map(({ id }) => id);

  // Execute both actions
  await Promise.all([
    ProductTag.destroy({ where: { id: productTagsToRemove } }),
    ProductTag.bulkCreate(newProductTags),
  ]);
};

// Create a new product
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    if (req.body.tagIds && req.body.tagIds.length) {
      await updateProductTags(product.id, req.body.tagIds);
    }
    res.status(201).json(product);
  } catch (err) {
    console.error("Error creating a product: ", err);
    res.status(400).json({ message: 'Bad request' });
  }
});

// Update a product by ID
router.put('/:id', async (req, res) => {
  try {
    const productUpdateResponse = await Product.update(req.body, {
      where: { id: req.params.id },
    });

    if (productUpdateResponse[0] === 0) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }

    if (req.body.tagIds) {
      await updateProductTags(req.params.id, req.body.tagIds);
    }

    res.status(200).json({ message: 'Product updated!' });
  } catch (err) {
    console.error("Error updating a product: ", err);
    res.status(400).json({ message: 'Bad request' });
  }
});

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

// Update a product by ID
router.put('/:id', async (req, res) => {
  try {
    const productUpdateResponse = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (productUpdateResponse[0] === 0) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }

    // Update product tags if tagIds are provided in the request
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTags = await ProductTag.findAll({
        where: { product_id: req.params.id },
      });
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return { product_id: req.params.id, tag_id };
        });
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // Execute both actions
      await Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    }

    res.status(200).json({ message: 'Product updated!' });
  } catch (err) {
    console.error("Error updating a product: ", err);
    res.status(400).json({ message: 'Bad request' });
  }
});

module.exports = router;
