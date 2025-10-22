const machine_service = require("../service/machine");

class Machinecontroller {

    async createmachine(req, res) {
        try {
            const machine = await machine_service.createmachine(req.body);
            res.status(201).json(machine);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllmachines(req, res) {
        try {
            const machines = await machine_service.getAllmachines();
            res.status(200).json(machines);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getmachineById(req, res) {
        try {
            const machine = await machine_service.getmachineByID(req.params.id);
            if (!machine) {
                return res.status(404).json({ message: "Machine Not Found" });
            }
            res.status(200).json(machine);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updatemachine(req, res) {
        try {
            const machine = await machine_service.updatemachine(req.params.id, req.body);
            if (!machine) {
                return res.status(404).json({ message: "Machine Not Found" });
            }
            res.status(200).json(machine);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deletemachine(req, res) {
        try {
            const machine = await machine_service.deletemachine(req.params.id);
            if (!machine) {
                return res.status(404).json({ message: "Machine Not Found" });
            }
            res.status(200).json({ message: "Machine deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new Machinecontroller();