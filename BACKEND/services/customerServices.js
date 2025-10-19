const Customer = require('../Models/customerModel');

// Create a new customer
exports.createCustomer = async ({ name,email, address,age, gender, username, password }) => {
  const newCustomer = new Customer({ name, email,address,age, gender, username, password });
  return await newCustomer.save();
};

// Get all customers (Admin view)
exports.getAllCustomers = async () => {
  return await Customer.find();
};

// Update customer details
exports.updateCustomer = async (customerId, updatedData) => {
  return await Customer.findByIdAndUpdate(customerId, updatedData, { new: true });
};

// Delete a customer
exports.deleteCustomer = async (customerId) => {
  return await Customer.findByIdAndDelete(customerId);
};

// Add response/notification to a customer
exports.addResponseToCustomer = async (customerId, notification) => {
  return await Customer.findByIdAndUpdate(
    customerId,
    { $push: { recentActivity: notification }, $inc: { notifications: 1 } },
    { new: true }
  );
};
