const { Op } = require('sequelize');     // ✅ import Op
const bcrypt = require('bcrypt');
const User = require('../models/user.model'); // fix import if needed

const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { fullname, email, username, password } = req.body;

  try {
    // Check both email and username using Op.or
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          { email },
          { username },
        ],
      },
    });

    if (existingUser) {
      if (existingUser.email === email && existingUser.provider === 'google') {
        return res.status(400).json({
          error: 'Email already used with Google. Please login with Gmail.',
        });
      }
      if (existingUser.email === email) {
        return res.status(400).json({ error: 'Email already exists' });
      }
      if (existingUser.username === username) {
        return res.status(400).json({ error: 'Username already exists' });
      }
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullname,
      email,
      username,
      password: hashed,
      provider: 'local',
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        username: user.username,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    if (user.provider === 'google') {
      return res.status(400).json({
        error: 'You registered with Gmail. Please login using Google.',
      });
    }

    if (!user.password) {
      return res.status(400).json({
        error: 'No password set. Please use Gmail login.',
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};