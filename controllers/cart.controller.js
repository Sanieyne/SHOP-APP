const Cart = require('../models/cart.model');
const Product = require('../models/product.model');
const ProductImage = require('../models/productImage.model');

// Get all cart items
exports.getCart = async (req, res) => {
  try {
    const cartItems = await Cart.findAll({
      where: { userId: req.user.id },
      include: [{
        model: Product,
        as: 'product',
        attributes: ['name', 'price'],
        include: [{
          model: ProductImage,
          as: 'images',
          attributes: ['url'],
        }]
      }],
    });

    if (cartItems.length === 0) {
      return res.json({ message: 'Cart is empty', cartItems: [] });
    }

    res.json({ cartItems });
  } catch (err) {
    console.error('❌ Error fetching cart items:', err);
    res.status(500).json({
      error: 'Failed to fetch cart items',
      details: err.message,
    });
  }
};



// Add item to cart
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const [item, created] = await Cart.findOrCreate({
      where: { userId: req.user.id, productId },
      defaults: { quantity },
    });

    if (!created) {
      item.quantity += quantity;
      await item.save();
    }

    res.status(201).json({ message: 'Item added to cart' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
};

// Update quantity
exports.updateQuantity = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    await Cart.update({ quantity }, {
      where: { userId: req.user.id, productId },
    });

    res.json({ message: 'Cart updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update cart' });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  const { id } = req.params;

  try {
    await Cart.destroy({ where: { id, userId: req.user.id } });
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove item' });
  }
};
