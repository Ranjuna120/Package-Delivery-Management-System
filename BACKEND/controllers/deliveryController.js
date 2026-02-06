const Delivery = require('../Models/Delivery');

// Get all deliveries
const getAllDeliveries = async (req, res) => {
    try {
        const deliveries = await Delivery.find().populate('orderId').sort({ createdAt: -1 });
        res.status(200).json(deliveries);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching deliveries', error: error.message });
    }
};

// Get delivery by ID
const getDeliveryById = async (req, res) => {
    try {
        const delivery = await Delivery.findById(req.params.id).populate('orderId');
        if (!delivery) {
            return res.status(404).json({ message: 'Delivery not found' });
        }
        res.status(200).json(delivery);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching delivery', error: error.message });
    }
};

// Get deliveries by driver name
const getDeliveriesByDriver = async (req, res) => {
    try {
        const deliveries = await Delivery.find({ driverName: req.params.driverName })
            .populate('orderId')
            .sort({ createdAt: -1 });
        res.status(200).json(deliveries);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching driver deliveries', error: error.message });
    }
};

// Get deliveries by status
const getDeliveriesByStatus = async (req, res) => {
    try {
        const deliveries = await Delivery.find({ deliveryStatus: req.params.status })
            .populate('orderId')
            .sort({ createdAt: -1 });
        res.status(200).json(deliveries);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching deliveries by status', error: error.message });
    }
};

// Create a new delivery
const createDelivery = async (req, res) => {
    try {
        const newDelivery = new Delivery({
            ...req.body,
            statusHistory: [{
                status: req.body.deliveryStatus || 'Pending',
                timestamp: new Date(),
                notes: 'Delivery created'
            }]
        });
        
        const savedDelivery = await newDelivery.save();
        res.status(201).json({ 
            message: 'Delivery created successfully', 
            delivery: savedDelivery 
        });
    } catch (error) {
        res.status(400).json({ message: 'Error creating delivery', error: error.message });
    }
};

// Update delivery
const updateDelivery = async (req, res) => {
    try {
        const delivery = await Delivery.findById(req.params.id);
        
        if (!delivery) {
            return res.status(404).json({ message: 'Delivery not found' });
        }

        // If status is being updated, add to status history
        if (req.body.deliveryStatus && req.body.deliveryStatus !== delivery.deliveryStatus) {
            delivery.statusHistory.push({
                status: req.body.deliveryStatus,
                timestamp: new Date(),
                notes: req.body.statusNotes || 'Status updated'
            });
        }

        // Update delivery fields
        Object.keys(req.body).forEach(key => {
            if (key !== 'statusNotes') {
                delivery[key] = req.body[key];
            }
        });

        const updatedDelivery = await delivery.save();
        res.status(200).json({ 
            message: 'Delivery updated successfully', 
            delivery: updatedDelivery 
        });
    } catch (error) {
        res.status(400).json({ message: 'Error updating delivery', error: error.message });
    }
};

// Update delivery status
const updateDeliveryStatus = async (req, res) => {
    try {
        const { status, notes } = req.body;
        const delivery = await Delivery.findById(req.params.id);
        
        if (!delivery) {
            return res.status(404).json({ message: 'Delivery not found' });
        }

        delivery.deliveryStatus = status;
        delivery.statusHistory.push({
            status: status,
            timestamp: new Date(),
            notes: notes || 'Status updated'
        });

        // If delivered, set actual delivery time
        if (status === 'Delivered') {
            delivery.actualDeliveryTime = new Date();
        }

        const updatedDelivery = await delivery.save();
        res.status(200).json({ 
            message: 'Delivery status updated successfully', 
            delivery: updatedDelivery 
        });
    } catch (error) {
        res.status(400).json({ message: 'Error updating delivery status', error: error.message });
    }
};

// Delete delivery
const deleteDelivery = async (req, res) => {
    try {
        const deletedDelivery = await Delivery.findByIdAndDelete(req.params.id);
        
        if (!deletedDelivery) {
            return res.status(404).json({ message: 'Delivery not found' });
        }

        res.status(200).json({ message: 'Delivery deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting delivery', error: error.message });
    }
};

// Get delivery statistics
const getDeliveryStats = async (req, res) => {
    try {
        const total = await Delivery.countDocuments();
        const pending = await Delivery.countDocuments({ deliveryStatus: 'Pending' });
        const assigned = await Delivery.countDocuments({ deliveryStatus: 'Assigned' });
        const inTransit = await Delivery.countDocuments({ deliveryStatus: 'In Transit' });
        const delivered = await Delivery.countDocuments({ deliveryStatus: 'Delivered' });
        const failed = await Delivery.countDocuments({ deliveryStatus: 'Failed' });

        res.status(200).json({
            total,
            pending,
            assigned,
            inTransit,
            delivered,
            failed
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching delivery statistics', error: error.message });
    }
};

// Assign delivery to driver
const assignDelivery = async (req, res) => {
    try {
        const { driverName, driverContact, vehicleNumber, vehicleType } = req.body;
        const delivery = await Delivery.findById(req.params.id);
        
        if (!delivery) {
            return res.status(404).json({ message: 'Delivery not found' });
        }

        delivery.driverName = driverName;
        delivery.driverContact = driverContact;
        delivery.vehicleNumber = vehicleNumber;
        delivery.vehicleType = vehicleType;
        delivery.deliveryStatus = 'Assigned';
        delivery.assignedDate = new Date();
        
        delivery.statusHistory.push({
            status: 'Assigned',
            timestamp: new Date(),
            notes: `Assigned to driver: ${driverName}`
        });

        const updatedDelivery = await delivery.save();
        res.status(200).json({ 
            message: 'Delivery assigned successfully', 
            delivery: updatedDelivery 
        });
    } catch (error) {
        res.status(400).json({ message: 'Error assigning delivery', error: error.message });
    }
};

module.exports = {
    getAllDeliveries,
    getDeliveryById,
    getDeliveriesByDriver,
    getDeliveriesByStatus,
    createDelivery,
    updateDelivery,
    updateDeliveryStatus,
    deleteDelivery,
    getDeliveryStats,
    assignDelivery
};
