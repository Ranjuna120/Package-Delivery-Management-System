const mongoose = require('mongoose');

const order = new mongoose.Schema({
    Cus_name: {
        type: String,
        required: true
    },
    Cus_email: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    package_type: {
        type: String,
        required: true
    },
    Cus_note: {
        type: String,
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
    },
    Or_tracking:{
        type:String,
    }
});

module.exports = mongoose.model('Order', order);