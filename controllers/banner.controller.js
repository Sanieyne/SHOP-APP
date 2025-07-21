const Banner = require('../models/banner.model');

// GET all banners
exports.getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.findAll({ order: [['id', 'ASC']] });
    res.json(banners);
  } catch (err) {
    console.error('Error fetching banners:', err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// POST create banner
exports.createBanner = async (req, res) => {
  try {
    const { image, subtitle, title1, title2, buttonText } = req.body;
    const banner = await Banner.create({ image, subtitle, title1, title2, buttonText });
    res.status(201).json(banner);
  } catch (err) {
    console.error('Error creating banner:', err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};
