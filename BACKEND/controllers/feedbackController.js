const FeedbackService = require("../services/feedback");
const PDFDocument = require('pdfkit'); // Import pdfkit
const fs = require('fs'); // For file handling

class feedbackController {
  // Create Feedback
  async createFeedback(req, res) {
    try {
      const { fullName, email, feedback, rating } = req.body;

      // Call the service to create feedback
      const newFeedback = await FeedbackService.createFeedback({ fullName, email, feedback, rating });

      res.status(201).json(newFeedback);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }


    // Get all feedback
    async getAllFeedback(req, res) {
        try {
            const feedbacks = await FeedbackService.getAllFeedback();
            res.status(200).json(feedbacks);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }


     // Update feedback status
     async updateFeedbackStatus(req, res) {
        try {
            const feedbackId = req.params.id;
            const { status } = req.body;
            const updatedFeedback = await FeedbackService.updateFeedbackStatus(feedbackId, status);

            if (!updatedFeedback) {
                return res.status(404).json({ message: "Feedback not found" });
            }

            res.status(200).json(updatedFeedback);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }


        // Delete feedback
        async deleteFeedback(req, res) {
            try {
                const feedbackId = req.params.id;
                const deletedFeedback = await FeedbackService.deleteFeedback(feedbackId);
    
                if (!deletedFeedback) {
                    return res.status(404).json({ message: "Feedback not found" });
                }
    
                res.status(200).json({ message: "Feedback deleted successfully" });
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        }
    
    

        

  // Generate PDF report for feedback
  // async generatePDFReport(req, res) {
  //   try {
  //     const feedbacks = await FeedbackService.getAllFeedback();

  //     // Create a new PDF document
  //     const doc = new PDFDocument();

  //     // Pipe the PDF into a writable stream to store it on the server
  //     const filePath = 'feedback_report.pdf';
  //     doc.pipe(fs.createWriteStream(filePath));
  //     console.log("PDF generation started...");


  //     // PDF Title
  //     doc.fontSize(20).text('Feedback Report', { align: 'center' });
  //     doc.moveDown();

  //     // Add feedback details in tabular format
  //     feedbacks.forEach((feedback, index) => {
  //       doc.fontSize(12).text(`Customer Name: ${feedback.fullName}`);
  //       doc.text(`Email: ${feedback.email}`);
  //       doc.text(`Feedback: ${feedback.feedback}`);
  //       doc.text(`Rating: ${feedback.rating}`);
  //       doc.text(`Status: ${feedback.status}`);
  //       doc.moveDown();
  //     });

  //     // End and save the PDF
  //     doc.end();

  //     // Respond to the client with a link to download the report
  //     res.status(200).json({ message: 'PDF report generated', path: 'feedback_report.pdf' });
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  // }
}

module.exports = new feedbackController();
