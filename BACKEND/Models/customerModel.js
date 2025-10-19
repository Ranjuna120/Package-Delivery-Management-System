const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, trim: true },
  address: { type: String, required: true },
  age: { type: Number, required: true, min: 0 },
  gender: { type: String, required: true },
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  orders: { type: Number, default: 0 },
  pendingOrders: { type: Number, default: 0 },
  notifications: { type: Number, default: 0 },
  recentActivity: { type: [String], default: [] },
}, { timestamps: true });

// Hash password before saving
customerSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password
customerSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Customer', customerSchema);
