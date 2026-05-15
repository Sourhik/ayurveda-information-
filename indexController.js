const Herb = require('../models/Herb');
const { validationResult } = require('express-validator');
const Message = require('../models/Message');

exports.getHomePage = async (req, res) => {
    try {
        // Fetch a few featured herbs (e.g., 3 standard ones)
        const featuredHerbs = await Herb.find().limit(3);
        res.render('index', {
            title: 'AyurVeda Wisdom - Ancient Healing',
            path: '/',
            featuredHerbs
        });
    } catch (err) {
        console.error(err);
        res.status(500).render('error/500');
    }
};

exports.getAboutPage = (req, res) => {
    res.render('about', {
        title: 'About Ayurveda - AyurVeda Wisdom',
        path: '/about'
    });
};

exports.getContactPage = (req, res) => {
    res.render('contact', {
        title: 'Contact Us - AyurVeda Wisdom',
        path: '/contact',
        successMsg: null,
        errors: []
    });
};

exports.getConsultPage = (req, res) => {
    res.render('consult', {
        title: 'Consult a Doctor - AyurVeda Wisdom',
        path: '/consult'
    });
};

exports.getLocatorPage = (req, res) => {
    res.render('locator', {
        title: 'Locate Clinics & Stores - AyurVeda Wisdom',
        path: '/locator'
    });
};

exports.postContact = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('contact', {
            title: 'Contact Us - AyurVeda Wisdom',
            path: '/contact',
            successMsg: null,
            errors: errors.array()
        });
    }

    try {
        const { name, email, message } = req.body;
        const newMessage = new Message({ name, email, message });
        await newMessage.save();

        res.render('contact', {
            title: 'Contact Us - AyurVeda Wisdom',
            path: '/contact',
            successMsg: 'Thank you for reaching out! Your message has been received.',
            errors: []
        });
    } catch (err) {
        console.error(err);
        res.status(500).render('error/500');
    }
};
