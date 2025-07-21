const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('cookie-session');
const passport = require('passport');
require('./config/passport'); // Load passport strategies

// Route Imports
const productRoutes = require('./routes/product.routes');
const bannerRoutes = require('./routes/banners');
const highlightRoutes = require('./routes/highlights');
const categoryRoutes = require('./routes/categories');
const authRoutes = require('./routes/auth.routes');
const addressRoutes = require('./routes/address.routes'); // ✅ Added Address Routes
const cartRoutes = require('./routes/cart.routes'); // <- Require the cart route

// Sequelize Connection
const sequelize = require('./config/db');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Session for OAuth (Google login)
app.use(session({
  secret: 'session_secret',
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/highlights', highlightRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/addresses', addressRoutes); // ✅ Mounted Address API
app.use('/api/cart', cartRoutes); // <- Mount cart route

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Global error logging
process.on('unhandledRejection', (reason) => {
  console.error('❌ Unhandled Rejection:', reason);
});
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1);
});

// Connect DB and start server
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ DB connection established.');

    app.listen(PORT, HOST, () => {
      console.log(`🚀 Server running at http://${HOST}:${PORT}`);
    });
  } catch (err) {
    console.error('❌ DB connection failed:', err.message);
  }
})();
