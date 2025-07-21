const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Color = sequelize.define('Color', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'colors',
  timestamps: false,
});

module.exports = Color;
