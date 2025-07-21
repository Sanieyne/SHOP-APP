const express = require('express');
const router = express.Router();
const highlightController = require('../controllers/highlight.controller');

router.get('/', highlightController.getAllHighlights);
router.post('/', highlightController.createHighlight); // Optional

module.exports = router;
