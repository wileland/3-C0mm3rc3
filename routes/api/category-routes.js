const router = require('express').Router();
const { Category, Product } = require('../../models');

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    console.error("Error getting all categories: ", err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get one category by its `id` value
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    console.error("Error getting category by ID: ", err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(201).json(categoryData);
  } catch (err) {
    console.error("Error creating a category: ", err);
    res.status(400).json({ message: 'Bad request' });
  }
});

// Update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const categoryUpdateResponse = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (categoryUpdateResponse[0] === 0) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json({ message: 'Category updated!' });
  } catch (err) {
    console.error("Error updating a category: ", err);
    res.status(400).json({ message: 'Bad request' });
  }
});

// Delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json({ message: 'Category deleted!' });
  } catch (err) {
    console.error("Error deleting a category: ", err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
