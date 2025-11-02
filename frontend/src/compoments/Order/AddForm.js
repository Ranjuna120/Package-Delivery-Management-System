import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderForm = () => {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [packageType, setPackageType] = useState('');
  const [customerNote, setCustomerNote] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!customerName) {
      newErrors.customerName = 'Please enter your name.';
    }

    if (!customerEmail || !/\S+@\S+\.\S+/.test(customerEmail)) {
      newErrors.customerEmail = 'Please enter a valid email.';
    }

    if (quantity < 1) {
      newErrors.quantity = 'Quantity must be at least 1.';
    }

    if (!packageType) {
      newErrors.packageType = 'Please select a package type.';
    }

    if (!customerNote) {
      newErrors.customerNote = 'Please add a customer note.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateForm()) {
      return;
    }

    const orderData = {
      customerName,
      customerEmail,
      quantity,
      packageType,
      customerNote,
      date,
    };

    localStorage.setItem('orderData', JSON.stringify(orderData));
    navigate(`/Or_Add/order-details`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={() => navigate('/OrderDashBoardPage')}>
          ← Back
        </button>
      </div>
      <div style={styles.card}>
        <div style={styles.iconHeader}>
          <div style={styles.iconCircle}>📋</div>
        </div>
        <h2 style={styles.title}>Place Your Order</h2>
        <p style={styles.subtitle}>Fill in the details below to create a new order</p>
        <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="customerName">
              <span style={styles.labelIcon}>👤</span> Customer Name
            </label>
            <input
              style={styles.input}
              type="text"
              id="customerName"
              placeholder="Enter your full name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              onFocus={(e) => e.target.style.borderColor = '#2193b0'}
              onBlur={(e) => e.target.style.borderColor = '#e1e8ed'}
              required
            />
            {errors.customerName && <div style={styles.errorMessage}>⚠ {errors.customerName}</div>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="customerEmail">
              <span style={styles.labelIcon}>✉️</span> Email Address
            </label>
            <input
              style={styles.input}
              type="email"
              id="customerEmail"
              placeholder="your.email@example.com"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              onFocus={(e) => e.target.style.borderColor = '#2193b0'}
              onBlur={(e) => e.target.style.borderColor = '#e1e8ed'}
              required
            />
            {errors.customerEmail && <div style={styles.errorMessage}>⚠ {errors.customerEmail}</div>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="quantity">
              <span style={styles.labelIcon}>🔢</span> Quantity
            </label>
            <input
              style={styles.input}
              type="number"
              id="quantity"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              onFocus={(e) => e.target.style.borderColor = '#2193b0'}
              onBlur={(e) => e.target.style.borderColor = '#e1e8ed'}
              min="1"
              required
            />
            {errors.quantity && <div style={styles.errorMessage}>⚠ {errors.quantity}</div>}
          </div>

          <input
            hidden
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="packageType">
              <span style={styles.labelIcon}>📦</span> Package Type
            </label>
            <select
              style={styles.input}
              id="packageType"
              value={packageType}
              onChange={(e) => setPackageType(e.target.value)}
              onFocus={(e) => e.target.style.borderColor = '#2193b0'}
              onBlur={(e) => e.target.style.borderColor = '#e1e8ed'}
              required
            >
              <option value="">Select a package type</option>
              <option value="standard">📦 Standard Package</option>
              <option value="premium">⭐ Premium Package</option>
              <option value="custom">🎨 Custom Package</option>
            </select>
            {errors.packageType && <div style={styles.errorMessage}>⚠ {errors.packageType}</div>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="customerNote">
              <span style={styles.labelIcon}>📝</span> Additional Notes
            </label>
            <textarea
              style={{...styles.input, height: '100px', resize: 'vertical'}}
              id="customerNote"
              placeholder="Add any special instructions or notes..."
              value={customerNote}
              onChange={(e) => setCustomerNote(e.target.value)}
              onFocus={(e) => e.target.style.borderColor = '#2193b0'}
              onBlur={(e) => e.target.style.borderColor = '#e1e8ed'}
              required
            />
            {errors.customerNote && <div style={styles.errorMessage}>⚠ {errors.customerNote}</div>}
          </div>

          <button 
            style={styles.button} 
            type="submit" 
            onClick={handleNext}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(33,147,176,0.35)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 12px rgba(33,147,176,0.25)';
            }}
          >
            Continue to Review →
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #ffffff 0%, #f7f9fc 100%)',
  },
  header: {
    maxWidth: '700px',
    margin: '0 auto 20px',
  },
  backButton: {
    padding: '10px 16px',
    background: 'linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.3s ease',
  },
  card: {
    maxWidth: '700px',
    margin: '0 auto',
    padding: '40px',
    background: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 8px 24px rgba(33,147,176,0.12)',
  },
  iconHeader: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  iconCircle: {
    width: '80px',
    height: '80px',
    margin: '0 auto',
    background: 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '40px',
    boxShadow: '0 6px 20px rgba(33,147,176,0.25)',
  },
  title: {
    margin: 0,
    color: '#2193b0',
    fontSize: '28px',
    fontWeight: 800,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 32,
    color: '#5f6b7a',
    fontSize: 14,
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '24px',
  },
  label: {
    fontWeight: 600,
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#2c3e50',
    fontSize: '15px',
  },
  labelIcon: {
    fontSize: '18px',
  },
  input: {
    padding: '14px 16px',
    borderRadius: '10px',
    border: '2px solid #e1e8ed',
    width: '100%',
    fontSize: '15px',
    transition: 'all 0.3s ease',
    outline: 'none',
    boxSizing: 'border-box',
    backgroundColor: '#f8f9fa',
  },
  button: {
    padding: '16px 28px',
    border: 'none',
    background: 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)',
    color: '#fff',
    borderRadius: '10px',
    fontSize: '17px',
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(33,147,176,0.25)',
    marginTop: '12px',
  },
  errorMessage: {
    color: '#e74c3c',
    fontSize: '13px',
    marginTop: '8px',
    padding: '10px 14px',
    border: '1px solid #e74c3c',
    borderRadius: '8px',
    backgroundColor: '#fdecea',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
};

export default OrderForm;