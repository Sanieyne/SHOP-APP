const express = require('express');
const router = express.Router();
const addressController = require('../controllers/address.controller');
const authenticate = require('../middlewares/auth.middleware');

router.use(authenticate);

router.post('/', addressController.createAddress);
router.get('/', addressController.getAddresses);
router.patch('/:id/default', addressController.setDefaultAddress);
router.delete('/:id', addressController.deleteAddress);
router.get('/default', addressController.getDefaultAddress);


module.exports = router;
