const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    feedback: { type: String, required: true },
    rating: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
}, { timestamps: true });

// module.exports = mongoose.model('Feedback', feedbackSchema);
const Feedback = mongoose.model('Feedback', feedbackSchema); // Correct version
module.exports = Feedback;
