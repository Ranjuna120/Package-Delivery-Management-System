const Delivery = require('../Models/Delivery');

// Service to get available drivers (mock data - can be replaced with actual driver database)
const getAvailableDrivers = async () => {
    try {
        // Get drivers who are not currently assigned or have less than 3 active deliveries
        const activeDeliveries = await Delivery.aggregate([
            { $match: { deliveryStatus: { $in: ['Assigned', 'Picked Up', 'In Transit'] } } },
            { $group: { _id: '$driverName', count: { $sum: 1 } } },
            { $match: { count: { $lt: 3 } } }
        ]);
        
        return activeDeliveries;
    } catch (error) {
        throw new Error('Error fetching available drivers: ' + error.message);
    }
};

// Service to calculate delivery metrics
const calculateDeliveryMetrics = async (driverName) => {
    try {
        const totalDeliveries = await Delivery.countDocuments({ driverName });
        const successfulDeliveries = await Delivery.countDocuments({ 
            driverName, 
            deliveryStatus: 'Delivered' 
        });
        const failedDeliveries = await Delivery.countDocuments({ 
            driverName, 
            deliveryStatus: 'Failed' 
        });
        
        const successRate = totalDeliveries > 0 
            ? ((successfulDeliveries / totalDeliveries) * 100).toFixed(2) 
            : 0;

        // Calculate average delivery time
        const deliveredOrders = await Delivery.find({
            driverName,
            deliveryStatus: 'Delivered',
            actualDeliveryTime: { $exists: true }
        });

        let avgDeliveryTime = 0;
        if (deliveredOrders.length > 0) {
            const totalTime = deliveredOrders.reduce((sum, delivery) => {
                const timeDiff = delivery.actualDeliveryTime - delivery.assignedDate;
                return sum + timeDiff;
            }, 0);
            avgDeliveryTime = (totalTime / deliveredOrders.length / (1000 * 60 * 60)).toFixed(2); // in hours
        }

        return {
            totalDeliveries,
            successfulDeliveries,
            failedDeliveries,
            successRate,
            avgDeliveryTime
        };
    } catch (error) {
        throw new Error('Error calculating delivery metrics: ' + error.message);
    }
};

// Service to get today's deliveries
const getTodayDeliveries = async () => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const deliveries = await Delivery.find({
            createdAt: { $gte: today }
        }).populate('orderId').sort({ createdAt: -1 });
        
        return deliveries;
    } catch (error) {
        throw new Error('Error fetching today\'s deliveries: ' + error.message);
    }
};

// Service to get overdue deliveries
const getOverdueDeliveries = async () => {
    try {
        const now = new Date();
        const deliveries = await Delivery.find({
            estimatedDeliveryTime: { $lt: now },
            deliveryStatus: { $nin: ['Delivered', 'Failed', 'Returned'] }
        }).populate('orderId').sort({ estimatedDeliveryTime: 1 });
        
        return deliveries;
    } catch (error) {
        throw new Error('Error fetching overdue deliveries: ' + error.message);
    }
};

module.exports = {
    getAvailableDrivers,
    calculateDeliveryMetrics,
    getTodayDeliveries,
    getOverdueDeliveries
};
