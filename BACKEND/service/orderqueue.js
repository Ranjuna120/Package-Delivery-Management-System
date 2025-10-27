const Orderqueue = require('../Models/orderqueue'); 

class OrderqueueService {

    async createorder(orderData) {
        return await Orderqueue.create(orderData);
    }

    async getAllorders() {
        return await Orderqueue.find();
    }

    async getorderByID(id) {
        return await Orderqueue.findById(id);
    } 
    
    async updateorder(id, updateData) {
        return await Orderqueue.findByIdAndUpdate(id, updateData, { new: true });
    }

    async deleteorder(id) {
        return await Orderqueue.findByIdAndDelete(id);
    }

}

module.exports = new OrderqueueService();
