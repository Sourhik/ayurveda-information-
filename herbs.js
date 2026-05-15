const express = require('express');
const router = express.Router();
const herbController = require('../controllers/herbController');

router.get('/', herbController.getHerbsList);
router.get('/:id', herbController.getHerbDetails);

module.exports = router;
