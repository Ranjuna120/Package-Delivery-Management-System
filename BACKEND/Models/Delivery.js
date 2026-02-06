const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: false
    },
    driverName: {
        type: String,
        required: true,
        trim: true
    },
    driverContact: {
        type: String,
        required: true,
        trim: true
    },
    vehicleNumber: {
        type: String,
        required: true,
        trim: true
    },
    vehicleType: {
        type: String,
        required: true,
        enum: ['Bike', 'Van', 'Truck', 'Car'],
        default: 'Van'
    },
    deliveryStatus: {
        type: String,
        required: true,
        enum: ['Pending', 'Assigned', 'Picked Up', 'In Transit', 'Out for Delivery', 'Delivered', 'Failed', 'Returned'],
        default: 'Pending'
    },
    pickupAddress: {
        type: String,
        required: true
    },
    deliveryAddress: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    customerContact: {
        type: String,
        required: true
    },
    packageDetails: {
        type: String,
        required: true
    },
    estimatedDeliveryTime: {
        type: Date,
        required: true
    },
    actualDeliveryTime: {
        type: Date
    },
    assignedDate: {
        type: Date,
        default: Date.now
    },
    deliveryNotes: {
        type: String,
        trim: true
    },
    proofOfDelivery: {
        type: String, // URL or path to uploaded image
        trim: true
    },
    signature: {
        type: String, // URL or path to signature image
        trim: true
    },
    distance: {
        type: Number, // in kilometers
        default: 0
    },
    deliveryFee: {
        type: Number,
        required: true,
        default: 0
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Urgent'],
        default: 'Medium'
    },
    attempts: {
        type: Number,
        default: 0
    },
    statusHistory: [{
        status: String,
        timestamp: {
            type: Date,
            default: Date.now
        },
        notes: String
    }]
}, {
    timestamps: true
});

// Add index for faster queries
deliverySchema.index({ orderId: 1, deliveryStatus: 1 });
deliverySchema.index({ driverName: 1, deliveryStatus: 1 });

const Delivery = mongoose.model('Delivery', deliverySchema);

module.exports = Delivery;
