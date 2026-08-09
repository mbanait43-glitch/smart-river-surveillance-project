const express = require('express');
const router = express.Router();
const dataController = require('../controllers/data.controller');

router.get('/live-data', dataController.getLiveData);

module.exports = router;
