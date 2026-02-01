const PmProfileeService = require("../services/PMprofile"); // Ensure this path is correct

class PmProfileeController {
    async createPmProfilee(req, res) {
        try {
            const newProfile = await PmProfileeService.createPmProfilee(req.body);
            res.status(201).json(newProfile);
        } catch (error) {
            console.error("Error creating profile:", error);
            res.status(400).json({ message: error.message });
        }
    }

    async getAllPmProfilees(req, res) {
        try {
            const profiles = await PmProfileeService.getAllPmProfilee();
            res.status(200).json(profiles);
        } catch (error) {
            console.error("Error fetching profiles:", error);
            res.status(500).json({ message: error.message });
        }
    }

    async updatePmProfilee(req, res) {
        try {
            const updatedProfile = await PmProfileeService.updatePmProfilee(req.params.id, req.body);
            if (!updatedProfile) {
                return res.status(404).json({ message: "Profile not found" });
            }
            res.status(200).json(updatedProfile);
        } catch (error) {
            console.error("Error updating profile:", error);
            res.status(400).json({ message: error.message });
        }
    }

    async deletePmProfilee(req, res) {
        try {
            const deletedProfile = await PmProfileeService.deletePmProfilee(req.params.id);
            if (!deletedProfile) {
                return res.status(404).json({ message: "Profile not found" });
            }
            res.status(200).json({ message: "Profile deleted successfully" });
        } catch (error) {
            console.error("Error deleting profile:", error);
            res.status(500).json({ message: error.message });
        }
    }

    async getPmProfileeById(req, res) {
        try {
            const profile = await PmProfileeService.getPmProfileeById(req.params.id);
            if (!profile) {
                return res.status(404).json({ message: "Profile not found" });
            }
            res.status(200).json(profile);
        } catch (error) {
            console.error("Error fetching profile:", error);
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new PmProfileeController();