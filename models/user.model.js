const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // ✅ using shared connection

const User = sequelize.define('User', {
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: true, // allow null if using Google login
  },
  provider: {
    type: DataTypes.STRING,
    defaultValue: 'local', // local | google | github (future-proof)
  },
  googleId: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
}, {
  timestamps: true,
  tableName: 'users', // Optional: define table name explicitly
});

// Auto-create the table if it doesn't exist
(async () => {
  try {
    await User.sync({ alter: true }); // or { force: false }
    console.log('✅ User table synced');
  } catch (err) {
    console.error('❌ Failed to sync User table:', err.message);
  }
})();

module.exports = User;
