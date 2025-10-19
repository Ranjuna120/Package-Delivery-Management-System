const express = require('express');
const customerController = require('../controllers/customerController');

const router = express.Router();

// Register a new customer
router.post('/register', customerController.registerCustomer);

// Login customer
router.post('/login', customerController.loginCustomer);

// Get all customers (Admin view)
router.get('/all', customerController.getAllCustomers);

// Update customer details
router.put('/:id', customerController.updateCustomer);

// Delete a customer
router.delete('/:id', customerController.deleteCustomer);

// Add response/notification to customer (Admin action)
router.post('/response/:id', customerController.addResponseToCustomer);

// Get customer profile (No authentication middleware used)
router.get('/profile', customerController.getCustomerProfile);


module.exports = router;
