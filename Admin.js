const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        default: 'admin@gmail.com'
    },
    fullName: {
        type: String,
        default: 'Administrator'
    },
    lastLogin: {
        type: Date
    },
    role: {
        type: String,
        enum: ['Super Admin', 'Staff'],
        default: 'Super Admin'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Admin', AdminSchema);
