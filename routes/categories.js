// File: routes/categories.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');

// ✅ This must be a function
router.get('/', categoryController.getAllCategories);
router.post('/', categoryController.createCategory);

module.exports = router;
