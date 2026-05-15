const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    products: [{
        productRef: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Herb' // We will expand Herb into Product in Phase 2
        },
        name: String, // store denormalized product details
        quantity: { type: Number, default: 1 },
        price: { type: Number, required: true }
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed'],
        default: 'Pending'
    },
    orderStatus: {
        type: String,
        enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Processing'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', OrderSchema);
