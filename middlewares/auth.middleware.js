const jwt = require('jsonwebtoken');
const User = require('../models/user.model'); // 👈 correct path to your model

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('Auth Header:', authHeader);  // 👈 Debug this

  const token = authHeader?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized - No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded:', decoded);  // 👈 See what’s inside

    const user = await User.findByPk(decoded.id);

    if (!user) return res.status(401).json({ error: 'User not found' });

    req.user = user;
    next();
  } catch (err) {
    console.error('JWT Error:', err.message);  // 👈 Print exact error
    res.status(401).json({ error: 'Invalid token' });
  }
};

