const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Product = require('./product.model');

const ProductImage = sequelize.define('ProductImage', {
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'products',
      key: 'id',
    },
  },
}, {
  tableName: 'product_images',
  timestamps: false,
});

// Define association
Product.hasMany(ProductImage, {
  foreignKey: 'productId',
  as: 'images',
});

ProductImage.belongsTo(Product, {
  foreignKey: 'productId',
});

module.exports = ProductImage;
