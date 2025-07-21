const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');
const authenticate = require('../middlewares/auth.middleware');
// Get all cart items
router.get('/', authenticate, cartController.getCart);

// Add item to cart
router.post('/', authenticate, cartController.addToCart);

// Update cart quantity
router.put('/', authenticate, cartController.updateQuantity);

// Remove item from cart
router.delete('/:id', authenticate, cartController.removeFromCart);

module.exports = router;
