const order_service = require("../service/orderqueue");

class MachineOrderqueuecontroller {

    async createorder(req, res) {
        try {
            const orderqueue = await order_service.createorder(req.body);
            res.status(201).json(orderqueue);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllorders(req, res) {
        try {
            const orderqueue = await order_service.getAllorders();
            res.status(200).json(orderqueue);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getorderById(req, res) {
        try {
            const orderqueue = await order_service.getorderByID(req.params.id);
            if (!orderqueue) {
                return res.status(404).json({ message: "order Not Found" });
            }
            res.status(200).json(orderqueue);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateorder(req, res) {
        try {
            const orderqueue = await order_service.updateorder(req.params.id, req.body);
            if (!orderqueue) {
                return res.status(404).json({ message: "order Not Found" });
            }
            res.status(200).json(orderqueue);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteorder(req, res) {
        try {
            const orderqueue = await order_service.deleteorder(req.params.id);
            if (!orderqueue) {
                return res.status(404).json({ message: "order Not Found" });
            }
            res.status(200).json({ message: "order deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new MachineOrderqueuecontroller();