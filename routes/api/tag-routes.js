const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// Function for consistent error response
const sendErrorResponse = (res, statusCode, message) => {
  console.error(message);
  res.status(statusCode).json({ message });
};

// Get all tags
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({ include: [{ model: Product }] });
    res.status(200).json(tagData);
  } catch (err) {
    sendErrorResponse(res, 500, 'Internal server error');
  }
});

// Get one tag by its `id`
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    console.error("Error getting tag by ID: ", err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create a new tag
router.post('/', async (req, res) => {
  try {
    // Basic validation for request body
    if (!req.body.name) {
      sendErrorResponse(res, 400, 'Tag name is required');
      return;
    }
    const tagData = await Tag.create(req.body);
    res.status(201).json(tagData);
  } catch (err) {
    sendErrorResponse(res, 400, 'Bad request');
  }
});

// Update a tag
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagData[0]) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.status(200).json({ message: 'Tag updated!' });
  } catch (err) {
    console.error("Error updating a tag: ", err);
    res.status(400).json({ message: 'Bad request' });
  }
});

// Delete a tag
router.delete('/:id', async (req, res) => {
  try {
    // Delete associated entries in ProductTag first
    await ProductTag.destroy({ where: { tag_id: req.params.id } });

    // Then delete the tag itself
    const tagData = await Tag.destroy({
      where: { id: req.params.id },
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.status(200).json({ message: 'Tag deleted!' });
  } catch (err) {
    console.error("Error deleting a tag: ", err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
