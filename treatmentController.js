const Treatment = require('../models/Treatment');

exports.getTreatmentsList = async (req, res) => {
    try {
        const treatments = await Treatment.find().sort({ createdAt: -1 });
        res.render('treatments', {
            title: 'Ayurvedic Treatments - AyurVeda Wisdom',
            path: '/treatments',
            treatments
        });
    } catch (err) {
        console.error("Treatment Error:", err);
        res.status(500).render('error/500', { title: 'Server Error', path: req.path });
    }
};
