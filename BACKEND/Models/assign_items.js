const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const assign_itemsSchema = new Schema({
    itemName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    assignDate: {
        type: Date,
        required: true,
    }
});

module.exports = mongoose.model('assign_items', assign_itemsSchema);