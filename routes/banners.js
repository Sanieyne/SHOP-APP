// File: routes/banners.js
const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/banner.controller');

router.get('/', bannerController.getAllBanners);
router.post('/', bannerController.createBanner); // optional for admin usage

module.exports = router;
