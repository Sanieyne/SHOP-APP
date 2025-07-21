const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = require('./product.model');
const Size = require('./size.model');
const Color = require('./color.model');

const ProductDetail = sequelize.define('ProductDetail', {
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sizeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  colorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'product_details',
  timestamps: false,
});

// 🧩 Associations
Product.hasMany(ProductDetail, { foreignKey: 'productId', as: 'details' });
ProductDetail.belongsTo(Product, { foreignKey: 'productId' });

Size.hasMany(ProductDetail, { foreignKey: 'sizeId' });
ProductDetail.belongsTo(Size, { foreignKey: 'sizeId' });

Color.hasMany(ProductDetail, { foreignKey: 'colorId' });
ProductDetail.belongsTo(Color, { foreignKey: 'colorId' });

module.exports = ProductDetail;
