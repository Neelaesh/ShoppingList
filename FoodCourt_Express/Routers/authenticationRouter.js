const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/authenticationController');

router.get('/getUsers', adminController.getUsers);

module.exports = router;