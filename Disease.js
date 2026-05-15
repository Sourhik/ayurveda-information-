const mongoose = require('mongoose');

const DiseaseSchema = new mongoose.Schema({
    no: {
        type: Number,
        required: true
    },
    commonName: {
        type: String,
        required: true,
        trim: true
    },
    ayurvedicName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    medicines: {
        type: String,
        required: true
    },
    medicineInfo: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Disease', DiseaseSchema);
