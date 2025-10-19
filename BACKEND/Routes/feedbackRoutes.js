const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');


// Route to create a new feedback
router.post('/add', feedbackController.createFeedback);

// Route to get all feedbacks
router.get('/', feedbackController.getAllFeedback);

// Route to update feedback status (accept or reject)
router.put('/:id', feedbackController.updateFeedbackStatus);

// Route to delete feedback
router.delete('/:id', feedbackController.deleteFeedback);

// Route to generate PDF report
//  router.get('/generate-pdf', feedbackController.generatePDFReport);

module.exports = router;