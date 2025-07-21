const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user.model');

const Address = sequelize.define('Address', {
  street: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isDefault: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Manual association without models/index.js
Address.belongsTo(User, { foreignKey: 'userId' });

// Auto-create the table if it doesn't exist
(async () => {
  try {
    await Address.sync({ alter: true }); // or { force: false }
    console.log('✅ address table synced');
  } catch (err) {
    console.error('❌ Failed to sync address table:', err.message);
  }
})();

module.exports = Address;
