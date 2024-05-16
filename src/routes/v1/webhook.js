const express = require('express');
const webhookController = require('../../controllers/v1/webhook');

const router = express.Router();

router.post('/net2phone', webhookController.net2phone);

module.exports = router;
