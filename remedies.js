const express = require('express');
const router = express.Router();
const remedyController = require('../controllers/remedyController');

// @route   GET /remedies
// @desc    Show all diseases and remedies
router.get('/', remedyController.getRemedies);

module.exports = router;
