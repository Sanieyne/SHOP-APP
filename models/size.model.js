const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Size = sequelize.define('Size', {
  value: {
    type: DataTypes.STRING, // e.g., '44', 'XL'
    allowNull: false,
  },
}, {
  tableName: 'sizes',
  timestamps: false,
});

module.exports = Size;
