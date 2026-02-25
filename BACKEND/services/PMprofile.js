const PmProfile = require('../Models/PMprofilemodels'); // Ensure this path is correct

class PmProfileeService {
    async createPmProfilee(data) {
        try {
            const newProfile = new PmProfile(data);
            return await newProfile.save();
        } catch (error) {
            throw new Error("Error creating profile: " + error.message);
        }
    }

    async getAllPmProfilee() {
        try {
            return await PmProfile.find();
        } catch (error) {
            throw new Error("Error fetching profiles: " + error.message);
        }
    }

    async updatePmProfilee(id, data) {
        try {
            const updatedProfile = await PmProfile.findByIdAndUpdate(id, data, { new: true });
            if (!updatedProfile) {
                throw new Error("Profile not found");
            }
            return updatedProfile;
        } catch (error) {
            throw new Error("Error updating profile: " + error.message);
        }
    }

    async deletePmProfilee(id) {
        try {
            const deletedProfile = await PmProfile.findByIdAndDelete(id);
            if (!deletedProfile) {
                throw new Error("Profile not found");
            }
            return deletedProfile;
        } catch (error) {
            throw new Error("Error deleting profile: " + error.message);
        }
    }

    async getPmProfileeById(id) {
        try {
            return await PmProfile.findById(id);
        } catch (error) {
            throw new Error("Error fetching profile: " + error.message);
        }
    }
}

module.exports = new PmProfileeService(); // Ensure this exports the instance correctly