const express = require('express');
const router = express.Router();
const deliveryController = require('../controllers/deliveryController');

// Get all deliveries
router.get('/', deliveryController.getAllDeliveries);

// Get delivery statistics
router.get('/stats', deliveryController.getDeliveryStats);

// Get delivery by ID
router.get('/:id', deliveryController.getDeliveryById);

// Get deliveries by driver name
router.get('/driver/:driverName', deliveryController.getDeliveriesByDriver);

// Get deliveries by status
router.get('/status/:status', deliveryController.getDeliveriesByStatus);

// Create a new delivery
router.post('/', deliveryController.createDelivery);

// Update delivery
router.put('/:id', deliveryController.updateDelivery);

// Update delivery status
router.patch('/:id/status', deliveryController.updateDeliveryStatus);

// Assign delivery to driver
router.patch('/:id/assign', deliveryController.assignDelivery);

// Delete delivery
router.delete('/:id', deliveryController.deleteDelivery);

module.exports = router;
