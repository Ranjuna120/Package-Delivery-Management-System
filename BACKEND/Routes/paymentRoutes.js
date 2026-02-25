const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const paymentController = require('../controllers/paymentController');
const router = express.Router();

// Ensure the uploads folder exists
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Directory where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Rename the file to avoid duplicates
  }
});

// File filter to allow only specific file types (e.g., images or pdfs)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf']; // Example allowed types
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and PDF are allowed.'), false); // Reject the file
  }
};

// Initialize Multer with the storage configuration and file filter
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 } // Limit file size to 5MB
});

// Routes
router.post('/add', paymentController.createCardPayment); // Endpoint for card payments
router.post('/upload', (req, res, next) => {
  upload.single('slipFile')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: 'Multer error: ' + err.message });
    } else if (err) {
      return res.status(400).json({ message: 'Error: ' + err.message });
    }
    next();
  });
}, paymentController.createSlipPayment); // Endpoint for slip uploads

router.get('/', paymentController.getPayments); // Get all payments
router.get('/:id', paymentController.getPaymentById); // Get payment by ID
router.put('/:id', paymentController.updatePayment); // Update payment
router.delete('/:id', paymentController.deletePayment); // Delete payment

module.exports = router;