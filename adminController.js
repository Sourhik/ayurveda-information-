const Admin = require('../models/Admin');
const Herb = require('../models/Herb');
const Treatment = require('../models/Treatment');
const Message = require('../models/Message');
const bcrypt = require('bcrypt');

exports.getLogin = (req, res) => {
    if (req.session.admin) return res.redirect('/admin/dashboard');
    res.render('admin/login', { title: 'Admin Login', layout: false, error: null });
};

exports.postLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await Admin.findOne({ username });
        if (!admin) return res.render('admin/login', { title: 'Admin Login', layout: false, error: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.render('admin/login', { title: 'Admin Login', layout: false, error: 'Invalid credentials' });

        admin.lastLogin = new Date();
        await admin.save();

        req.session.admin = {
            id: admin._id,
            username: admin.username,
            email: admin.email,
            fullName: admin.fullName,
            lastLogin: admin.lastLogin
        };
        return res.redirect('/admin/dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/admin/login');
};

exports.getDashboard = async (req, res) => {
    try {
        const herbsCount = await Herb.countDocuments();
        const messagesCount = await Message.countDocuments();
        const herbs = await Herb.find().sort({ createdAt: -1 });

        res.render('admin/dashboard', {
            title: 'Admin Dashboard',
            path: '/admin',
            herbsCount,
            messagesCount,
            herbs
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getAddHerb = (req, res) => {
    res.render('admin/addHerb', { title: 'Add Herb', path: '/admin' });
};

exports.postAddHerb = async (req, res) => {
    try {
        const newHerb = new Herb(req.body);
        await newHerb.save();
        res.redirect('/admin/dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getEditHerb = async (req, res) => {
    try {
        const herb = await Herb.findById(req.params.id);
        if (!herb) return res.redirect('/admin/dashboard');
        res.render('admin/editHerb', { title: 'Edit Herb', path: '/admin', herb });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.postEditHerb = async (req, res) => {
    try {
        await Herb.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/admin/dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.deleteHerb = async (req, res) => {
    try {
        await Herb.findByIdAndDelete(req.params.id);
        res.redirect('/admin/dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getAddTreatment = (req, res) => {
    res.render('admin/addTreatment', { title: 'Add Treatment', path: '/admin' });
};

exports.postAddTreatment = async (req, res) => {
    try {
        const newTreatment = new Treatment(req.body);
        await newTreatment.save();
        res.redirect('/admin/dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
