const paymentService = require('../services/paymentService');
const path = require('path');

class PaymentController {
  async createCardPayment(req, res) {
    try {
      const payment = await paymentService.createCardPayment(req.body);
      res.status(201).json({ message: 'Card payment created successfully', payment });
    } catch (error) {
      res.status(500).json({ message: 'Error creating card payment', error: error.message });
    }
  }

  async createSlipPayment(req, res) {
    try {
      const { email, bankName } = req.body;

      // Validate required fields
      if (!email || !bankName) {
        return res.status(400).json({ message: 'Email and bank name are required.' });
      }

      // Check if the file was uploaded
      if (!req.file) {
        return res.status(400).json({ message: 'Slip file is required.' });
      }

      // Log the uploaded file for debugging
      console.log('File uploaded:', req.file);

      // Prepare the payment data
      const paymentData = {
        email,
        bankName,
        slipFile: path.normalize(req.file.path), // Normalize the file path
      };

      const payment = await paymentService.createSlipPayment(paymentData);
      res.status(201).json({ message: 'Slip payment created successfully', payment });
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ message: 'Error creating slip payment', error: error.message });
    }
  }

  async getPayments(req, res) {
    try {
      const payments = await paymentService.getPayments();
      res.status(200).json(payments);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving payments', error: error.message });
    }
  }

  async getPaymentById(req, res) {
    try {
      const payment = await paymentService.getPaymentById(req.params.id);
      if (!payment) {
        return res.status(404).json({ message: 'Payment not found' });
      }
      res.status(200).json(payment);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving payment', error: error.message });
    }
  }

  async updatePayment(req, res) {
    try {
      const updatedPayment = await paymentService.updatePayment(req.params.id, req.body);
      if (!updatedPayment) {
        return res.status(404).json({ message: 'Payment not found' });
      }
      res.status(200).json({ message: 'Payment updated successfully', updatedPayment });
    } catch (error) {
      res.status(500).json({ message: 'Error updating payment', error: error.message });
    }
  }

  async deletePayment(req, res) {
    try {
      const deletedPayment = await paymentService.deletePayment(req.params.id);
      if (!deletedPayment) {
        return res.status(404).json({ message: 'Payment not found' });
      }
      res.status(200).json({ message: 'Payment deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting payment', error: error.message });
    }
  }
}

module.exports = new PaymentController();