// Import the Feedback model
const Feedback = require('../Models/Feedback'); // Ensure the path is correct

class FeedbackService {
    // Service to create new feedback
    async createFeedback(data) {
        try {
            const feedback = new Feedback(data);
            return await feedback.save();   // This saves the feedback in the database
        } catch (error) {
            throw new Error('Error creating feedback: ' + error.message);
        }
    }

    // Service to get all feedbacks
    async getAllFeedback() {
        try {
            return await Feedback.find(); // Returns all feedback from the database
        } catch (error) {
            throw new Error('Error fetching feedback: ' + error.message);
        }
    }

    // Service to update feedback status
    async updateFeedbackStatus(id, status) {
        try {
            return await Feedback.findByIdAndUpdate(
                id, 
                { status }, 
                { new: true } // Returns the updated document
            );
        } catch (error) {
            throw new Error('Error updating feedback status: ' + error.message);
        }
    }

    // Service to delete feedback
    async deleteFeedback(id) {
        try {
            return await Feedback.findByIdAndDelete(id); // Deletes the feedback from the database
        } catch (error) {
            throw new Error('Error deleting feedback: ' + error.message);
        }
    }
}

// Export the service instance
module.exports = new FeedbackService();
