const Order = require('../Models/Order'); 


class OrderServices{

    async createOrder(OrderData) {
        return await Order.create(OrderData);
    }

    async getAllOrders(){
        return await Order.find();
    }

   
    async getOrderByID(id) {
        return await Order.findById(id);
    } 
    
    async updateOrder(id,updateData){
        return await Order.findByIdAndUpdate(id,updateData);

    }

    async deleteOrder(id){
        return await Order.findByIdAndDelete(id);
    }

}
module.exports = new OrderServices();