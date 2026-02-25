const Payment = require('../Models/PaymentModel');

class PaymentService {
  async createCardPayment(data) {
    try {
      const payment = new Payment(data);
      return await payment.save();
    } catch (error) {
      throw new Error(`Error creating card payment: ${error.message}`);
    }
  }

  async createSlipPayment(data) {
    try {
      const payment = new Payment(data);
      return await payment.save();
    } catch (error) {
      throw new Error(`Error creating slip payment: ${error.message}`);
    }
  }

  async getPayments() {
    try {
      return await Payment.find({});
    } catch (error) {
      throw new Error(`Error retrieving payments: ${error.message}`);
    }
  }

  async getPaymentById(id) {
    try {
      const payment = await Payment.findById(id);
      if (!payment) {
        throw new Error('Payment not found');
      }
      return payment;
    } catch (error) {
      throw new Error(`Error retrieving payment: ${error.message}`);
    }
  }

  async updatePayment(id, data) {
    try {
      const updatedPayment = await Payment.findByIdAndUpdate(id, data, { new: true });
      if (!updatedPayment) {
        throw new Error('Payment not found');
      }
      return updatedPayment;
    } catch (error) {
      throw new Error(`Error updating payment: ${error.message}`);
    }
  }

  async deletePayment(id) {
    try {
      const deletedPayment = await Payment.findByIdAndDelete(id);
      if (!deletedPayment) {
        throw new Error('Payment not found');
      }
      return deletedPayment;
    } catch (error) {
      throw new Error(`Error deleting payment: ${error.message}`);
    }
  }
}

module.exports = new PaymentService();