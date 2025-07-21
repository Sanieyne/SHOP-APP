const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Product = require('./product.model'); // adjust path if needed

const Cart = sequelize.define('Cart', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
}, {
  timestamps: true,
});

// Association
Cart.belongsTo(Product, {
  foreignKey: 'productId',
  as: 'product',
});


// Sync table
(async () => {
  try {
    await Cart.sync({ alter: true });
    console.log('✅ Cart table synced');
  } catch (err) {
    console.error('❌ Failed to sync Cart table:', err.message);
  }
})();

module.exports = Cart;
