const mongoose = require('mongoose');

const ConsultationSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    symptoms: {
        type: String,
        required: true
    },
    assignedDoctor: {
        type: String,
        default: 'Not Assigned'
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed'],
        default: 'Pending'
    },
    prescription: {
        herbs: [{ type: String }],
        dietPlan: { type: String },
        lifestyleAdvice: { type: String }
    },
    reportUrl: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Consultation', ConsultationSchema);
