const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  // Card payment fields
  cardHolderName: {
    type: String,
  },
  cardNumber: {
    type: String,
  },
  expires: {
    type: String,
  },
  cvv: {
    type: String,
  },
  // Slip payment fields
  bankName: {
    type: String,
  },
  slipFile: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Optional: Methods to check payment type
paymentSchema.methods.isCardPayment = function() {
  return this.cardNumber != null; // Check if it's a card payment
};

paymentSchema.methods.isSlipPayment = function() {
  return this.slipFile != null; // Check if it's a slip payment
};

module.exports = mongoose.model('Payment', paymentSchema);