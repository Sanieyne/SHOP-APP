const Highlight = require('../models/highlight.model');

// GET all highlights
exports.getAllHighlights = async (req, res) => {
  try {
    const highlights = await Highlight.findAll({ order: [['id', 'ASC']] });
    res.json(highlights);
  } catch (err) {
    console.error('Error fetching highlights:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST create new highlight
exports.createHighlight = async (req, res) => {
  try {
    const { icon, title, subtitle } = req.body;
    const highlight = await Highlight.create({ icon, title, subtitle });
    res.status(201).json(highlight);
  } catch (err) {
    console.error('Error creating highlight:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
