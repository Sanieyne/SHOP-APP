const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Banner = sequelize.define('Banner', {
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subtitle: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  title1: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  title2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  buttonText: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'button_text' // matches DB column name
  }
}, {
  tableName: 'banners',
  timestamps: false,
});

module.exports = Banner;
