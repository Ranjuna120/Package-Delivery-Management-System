const assign_itemsServices = require('../services/assign_itemsServices');

class assign_itemsCtrl {
    async createAssign_items(req, res) {
        try {
            const assign_itemsData = req.body;
            const assign_items = await assign_itemsServices.createAssign_items(assign_itemsData);
            res.status(201).json(assign_items);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllAssign_items(req, res) {
        try {
            const assign_items = await assign_itemsServices.getAllAssign_items();
            res.status(200).json(assign_items);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAssign_itemsByID(req, res) {
        try {
            const { id } = req.params;
            const assign_items = await assign_itemsServices.getAssign_itemsByID(id);
            res.status(200).json(assign_items);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async updateAssign_items(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const assign_items = await assign_itemsServices.updateAssign_items(id, updateData);
            res.status(200).json(assign_items);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteAssign_items(req, res) {
        try {
            const { id } = req.params;
            const assign_items = await assign_itemsServices.deleteAssign_items(id);
            res.status(200).json(assign_items);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new assign_itemsCtrl();