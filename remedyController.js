const Disease = require('../models/Disease');

exports.getRemedies = async (req, res) => {
    try {
        const remedies = await Disease.find().sort({ no: 1 });
        res.render('remedies/index', {
            title: 'Ayurvedic Remedies',
            path: '/remedies',
            remedies
        });
    } catch (err) {
        console.error(err);
        res.status(500).render('error/500', { title: 'Server Error', path: req.path });
    }
};
