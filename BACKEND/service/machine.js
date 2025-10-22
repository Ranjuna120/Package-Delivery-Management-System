const Machine = require("../Models/Machine");

class MachineService {

    async createmachine(machineData) {
        try {
            const machine = new Machine(machineData);
            return await machine.save();
        } catch (error) {
            throw new Error(`Error creating machine: ${error.message}`);
        }
    }

    async getAllmachines() {
        try {
            return await Machine.find();
        } catch (error) {
            throw new Error(`Error fetching machines: ${error.message}`);
        }
    }

    async getmachineByID(id) {
        try {
            return await Machine.findById(id);
        } catch (error) {
            throw new Error(`Error fetching machine by ID: ${error.message}`);
        }
    }

    async updatemachine(id, machineData) {
        try {
            return await Machine.findByIdAndUpdate(id, machineData, { new: true });
        } catch (error) {
            throw new Error(`Error updating machine: ${error.message}`);
        }
    }

    async deletemachine(id) {
        try {
            return await Machine.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(`Error deleting machine: ${error.message}`);
        }
    }
}

module.exports = new MachineService();
