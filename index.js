const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const { body } = require('express-validator');

router.get('/', indexController.getHomePage);
router.get('/about', indexController.getAboutPage);
router.get('/contact', indexController.getContactPage);
router.get('/consult', indexController.getConsultPage);
router.get('/locator', indexController.getLocatorPage);
router.post('/contact', [
    body('name').trim().notEmpty().withMessage('Name is required.'),
    body('email').isEmail().withMessage('Please provide a valid email.'),
    body('message').trim().notEmpty().withMessage('Message cannot be empty.')
], indexController.postContact);

module.exports = router;
