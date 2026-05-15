const express = require('express');
const router = express.Router();
const treatmentController = require('../controllers/treatmentController');

router.get('/', treatmentController.getTreatmentsList);

module.exports = router;
