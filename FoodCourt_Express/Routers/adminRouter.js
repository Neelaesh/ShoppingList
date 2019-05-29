const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminController');

router.get('/getAdmins', adminController.getAdmins);

module.exports = router;