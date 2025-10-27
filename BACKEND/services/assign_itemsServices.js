const assign_items = require('../Models/assign_items');

class assign_itemsServices {
    async createAssign_items(assign_itemsData) {
        try {
        return await assign_items.create(assign_itemsData);
        } catch (error) {
        throw new Error(`Error creating assign_items: ${error.message}`);
        }
    }
    
    async getAllAssign_items() {
        try {
        return await assign_items.find();
        } catch (error) {
        throw new Error(`Error fetching assign_items: ${error.message}`);
        }
    }
    
    async getAssign_itemsByID(id) {
        try {
        return await assign_items.findById(id);
        } catch (error) {
        throw new Error(`assign_items with ID ${id} not found: ${error.message}`);
        }
    }
    
    async updateAssign_items(id, updateData) {
        try {
        return await assign_items.findByIdAndUpdate(id, updateData, { new: true });
        } catch (error) {
        throw new Error(`Error updating assign_items with ID ${id}: ${error.message}`);
        }
    }
    
    async deleteAssign_items(id) {
        try {
        return await assign_items.findByIdAndDelete(id);
        } catch (error) {
        throw new Error(`Error deleting assign_items with ID ${id}: ${error.message}`);
        }
    }
    }

module.exports = new assign_itemsServices();