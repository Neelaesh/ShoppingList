const express = require('express');
const router = express.Router();
const consumerController = require('../Controllers/consumerController');

router.get('/getConsumers', consumerController.getConsumers);

module.exports = router;