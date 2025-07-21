const Category = require('../models/category.model');

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({ order: [['id', 'ASC']] });
    res.json(categories);
  } catch (err) {
    console.error('Error fetching categories:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new category
exports.createCategory = async (req, res) => {
  try {
    const { name, image } = req.body;
    const newCategory = await Category.create({ name, image });
    res.status(201).json(newCategory);
  } catch (err) {
    console.error('Error creating category:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
