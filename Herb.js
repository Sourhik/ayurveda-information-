const mongoose = require('mongoose');

const HerbSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Immunity', 'Digestion', 'Skin', 'Stress', 'General']
    },
    benefits: {
        type: String,
        required: true
    },
    uses: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Herb', HerbSchema);
