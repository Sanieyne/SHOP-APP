const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Highlight = sequelize.define('Highlight', {
  icon: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subtitle: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'highlights',
  timestamps: false,
});

module.exports = Highlight;
