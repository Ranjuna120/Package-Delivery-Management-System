const Customer = require('../Models/customerModel');
const customerService = require('../services/customerServices');

class customerController {
  // Register new customer
  async registerCustomer(req, res) {
    try {
      const { name,email,address, age, gender, username, password } = req.body;
      const customer = await customerService.createCustomer({ name,email, address,age, gender, username, password });
      res.status(201).json(customer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Login customer
  async loginCustomer(req, res) {
    try {
      const { username, password } = req.body;
      const customer = await Customer.findOne({ username });
      if (!customer || !(await customer.comparePassword(password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      res.status(200).json({ success: true, customer });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get all customers (Admin view)
  async getAllCustomers(req, res) {
    try {
      const customers = await customerService.getAllCustomers();
      res.status(200).json(customers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Update customer data
  async updateCustomer(req, res) {
    try {
      const customerId = req.params.id;
      const updatedData = req.body;
      const updatedCustomer = await customerService.updateCustomer(customerId, updatedData);
      res.status(200).json(updatedCustomer);
    } catch (error) {
      res.status (500).json({ error: error.message });
    }
  }

  // Delete customer
  async deleteCustomer(req, res) {
    try {
      const customerId = req.params.id;
      await customerService.deleteCustomer(customerId);
      res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Add response to customer (Admin sends notifications/feedback)
  async addResponseToCustomer(req, res) {
    try {
      const { id } = req.params;
      const { notification } = req.body;
      const updatedCustomer = await customerService.addResponseToCustomer(id, notification);
      res.status(200).json(updatedCustomer);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get Customer Profile (Modified: Removed JWT-related code)
  async getCustomerProfile(req, res) {
    try {
      const customerId = req.params.id; // Use customerId from route params instead of req.user.id
      const customer = await Customer.findById(customerId);
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
      res.json({
        name: customer.name,
        lastLogin: customer.updatedAt,
        orders: customer.orders,
        pendingOrders: customer.pendingOrders,
        notifications: customer.notifications,
        recentActivity: customer.recentActivity,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  }
}


module.exports = new customerController();
