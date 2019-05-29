const express = require('express');
const router = express.Router();
const vendorController = require('../Controllers/vendorController');

router.get('/getVendors', vendorController.getVendors);

module.exports = router;