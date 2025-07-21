const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  hasDiscount: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  discountPercentage: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      isFloat: true,
      customValidator(value) {
        if (this.hasDiscount && (value === null || value === undefined)) {
          throw new Error('discountPercentage cannot be null when hasDiscount is true');
        }
      }
    }
  }
}, {
  tableName: 'products',
  timestamps: false,
});

module.exports = Product;
