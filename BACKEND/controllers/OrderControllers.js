const or_service = require("../services/orders");
const mails =  require("../helpers/SendMail");


class OrderController {
    async createOrder(req, res) {
        try {
            const order = await or_service.createOrder(req.body);
            res.status(201).json(order);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllOrders(req, res) {
        try {
            const orders = await or_service.getAllOrders();
            res.status(200).json(orders);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getOrderById(req, res) {
        try {
            const order = await or_service.getOrderByID(req.params.id);
            res.status(200).json(order);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateOrder(req, res) {
        try {
            const updatedOrder = await or_service.updateOrder(req.params.id, req.body);
            const gmail = req.body.Cus_email;
             const or_status = req.body.status;
            if(or_status == 'Approval'){
            mails.sendOrderConfirmation(gmail);
           }

            res.status(200).json(updatedOrder);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    
    async deleteorder(req, res) {
        try {
            await or_service.deleteOrder(req.params.id);
            res.status(200).json({ message: "Order deleted successfully" });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

}

module.exports = new OrderController();