import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../style/payment/PaymentForm.css'; 

const PaymentForm = () => {
  const navigate = useNavigate();
  const [paymentType, setPaymentType] = useState('Card Payment');
  const [cardFormData, setCardFormData] = useState({
    email: '',
    cardHolderName: '',
    cardNumber: '',
    expires: '',
    cvv: '',
  });
  const [slipFormData, setSlipFormData] = useState({
    email: '',
    bankName: '',
    remark: '',
    slipFile: null,
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleCardChange = (e) => {
    setCardFormData({ ...cardFormData, [e.target.id]: e.target.value });
  };

  const handleSlipChange = (e) => {
    setSlipFormData({ ...slipFormData, [e.target.id]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSlipFormData({ ...slipFormData, slipFile: file });
    }
  };

  // Validation Functions
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
  
  const validateCardNumber = (cardNumber) => cardNumber.length === 16 && /^\d+$/.test(cardNumber);
  
  const validateExpiryDate = (expires) => {
    const [month, year] = expires.split('/');
    const currentYear = new Date().getFullYear() % 100; // Last two digits of the year
    const currentMonth = new Date().getMonth() + 1;

    return (
      /^\d{2}\/\d{2}$/.test(expires) &&
      parseInt(month, 10) > 0 &&
      parseInt(month, 10) <= 12 &&
      (parseInt(year, 10) > currentYear ||
        (parseInt(year, 10) === currentYear && parseInt(month, 10) >= currentMonth))
    );
  };

  const validateCVV = (cvv) => /^\d{3,4}$/.test(cvv); // CVV is typically 3 or 4 digits

  const validateCardForm = () => {
    let formErrors = {};
    setSubmitError('');

    if (!validateEmail(cardFormData.email)) {
      formErrors.email = 'Please enter a valid email address.';
    }
    if (!cardFormData.cardHolderName.trim()) {
      formErrors.cardHolderName = 'Cardholder name is required.';
    }
    if (!validateCardNumber(cardFormData.cardNumber)) {
      formErrors.cardNumber = 'Card number must be 16 digits and numeric.';
    }
    if (!validateExpiryDate(cardFormData.expires)) {
      formErrors.expires = 'Expiry date must be in the format MM/YY and must be in the future.';
    }
    if (!validateCVV(cardFormData.cvv)) {
      formErrors.cvv = 'CVV must be 3 or 4 digits.';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const validateSlipForm = () => {
    let formErrors = {};
    setSubmitError('');

    if (!validateEmail(slipFormData.email)) {
      formErrors.email = 'Please enter a valid email address.';
    }
    if (!slipFormData.bankName.trim()) {
      formErrors.bankName = 'Bank name is required.';
    }
    if (!slipFormData.slipFile) {
      formErrors.slipFile = 'Please upload the payment slip.';
    } else if (!['image/jpeg', 'image/png', 'application/pdf'].includes(slipFormData.slipFile.type)) {
      formErrors.slipFile = 'Only JPEG, PNG, or PDF formats are allowed.';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleCardPaymentSubmit = async (e) => {
    e.preventDefault();
    if (!validateCardForm()) return;

    setIsLoading(true); // Start loading

    try {
      const response = await axios.post('http://localhost:8070/payments/add', {
        email: cardFormData.email,
        cardHolderName: cardFormData.cardHolderName,
        cardNumber: cardFormData.cardNumber,
        expires: cardFormData.expires,
        cvv: cardFormData.cvv,
      });
      alert('Card Payment successful!');
      console.log(response.data);
      // Clear form after successful submission
      setCardFormData({
        email: '',
        cardHolderName: '',
        cardNumber: '',
        expires: '',
        cvv: '',
      });
      setErrors({});
    } catch (error) {
      console.error('Error during card payment:', error);
      const errorMessage = error.response?.data?.message || 'An unknown error occurred.';
      setSubmitError(errorMessage);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleSlipUploadSubmit = async (e) => {
    e.preventDefault();
    if (!validateSlipForm()) return;

    const slipData = new FormData();
    slipData.append('email', slipFormData.email); // Ensure email is sent with the slip data
    slipData.append('bankName', slipFormData.bankName);
    slipData.append('remark', slipFormData.remark);
    slipData.append('slipFile', slipFormData.slipFile);

    setIsLoading(true); // Start loading

    try {
      const response = await axios.post('http://localhost:8070/payments/upload', slipData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Slip uploaded successfully!');
      console.log(response.data);
      // Clear form after successful submission
      setSlipFormData({
        email: '',
        bankName: '',
        remark: '',
        slipFile: null,
      });
      setErrors({});
    } catch (error) {
      console.error('Error uploading slip:', error.response?.data);
      const errorMessage = error.response?.data?.message || 'An unknown error occurred.';
      setSubmitError(errorMessage);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const renderForm = () => {
    if (paymentType === 'Card Payment') {
      return (
        <form className="payment-form" onSubmit={handleCardPaymentSubmit}>
          <h3>Card Payment Details</h3>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              value={cardFormData.email}
              onChange={handleCardChange}
              required
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="cardHolderName">Card Holder Name</label>
            <input
              type="text"
              id="cardHolderName"
              placeholder="Card Holder Name"
              value={cardFormData.cardHolderName}
              onChange={handleCardChange}
              required
            />
            {errors.cardHolderName && <p className="error">{errors.cardHolderName}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              placeholder="1234 5678 1234 5678"
              value={cardFormData.cardNumber}
              onChange={handleCardChange}
              required
            />
            {errors.cardNumber && <p className="error">{errors.cardNumber}</p>}
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="expires">Expires (MM/YY)</label>
              <input
                type="text"
                id="expires"
                placeholder="MM/YY"
                value={cardFormData.expires}
                onChange={handleCardChange}
                required
              />
              {errors.expires && <p className="error">{errors.expires}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <input
                type="text"
                id="cvv"
                placeholder="123"
                value={cardFormData.cvv}
                onChange={handleCardChange}
                required
              />
              {errors.cvv && <p className="error">{errors.cvv}</p>}
            </div>
          </div>
          {submitError && <p className="error">{submitError}</p>}
          <button type="submit" className="btn-red" disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Pay Now'}
          </button>
        </form>
      );
    } else {
      return (
        <form className="payment-form" onSubmit={handleSlipUploadSubmit}>
          <h3>Slip Upload Details</h3>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              value={slipFormData.email}
              onChange={handleSlipChange}
              required
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="bankName">Bank Name</label>
            <input
              type="text"
              id="bankName"
              placeholder="Bank Name"
              value={slipFormData.bankName}
              onChange={handleSlipChange}
              required
            />
            {errors.bankName && <p className="error">{errors.bankName}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="remark">Remark (Optional)</label>
            <input
              type="text"
              id="remark"
              placeholder="Add a remark"
              value={slipFormData.remark}
              onChange={handleSlipChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="slipFile">Upload Payment Slip</label>
            <input
              type="file"
              id="slipFile"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleFileChange}
              required
            />
            {errors.slipFile && <p className="error">{errors.slipFile}</p>}
          </div>
          {submitError && <p className="error">{submitError}</p>}
          <button type="submit" className="btn-red" disabled={isLoading}>
            {isLoading ? 'Uploading...' : 'Upload Slip'}
          </button>
        </form>
      );
    }
  };

  return (
    <div className="payment-form-wrapper">
      <div className="payment-form-container">
        <button className="back-button" onClick={() => navigate('/Handlepayment')}>
          ← Back
        </button>
        <h2 className="payment-title">Payment Form</h2>
        <p className="payment-subtitle">Select your preferred payment method</p>
        <div className="payment-methods">
          <button
            className={`btn-toggle ${paymentType === 'Card Payment' ? 'active' : ''}`}
            onClick={() => setPaymentType('Card Payment')}
          >
            💳 Card Payment
          </button>
          <button
            className={`btn-toggle ${paymentType === 'Slip Upload' ? 'active' : ''}`}
            onClick={() => setPaymentType('Slip Upload')}
          >
            📄 Slip Upload
          </button>
        </div>
        {renderForm()}
      </div>
    </div>
  );
};

export default PaymentForm;