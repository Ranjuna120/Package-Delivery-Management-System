import React, { useState } from 'react';
import axios from 'axios';

const ExpenseForm = ({ onExpenseAdded }) => {
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newExpense = { itemName, price: Number(price) };
      await axios.post('http://localhost:8070/expenses/add', newExpense);
      alert('Expenses added successfully');
      onExpenseAdded(); // Notify parent to refresh the expense list
      setItemName(''); // Clear input fields
      setPrice('');
      setSuccessMessage('Expense added successfully!');
      setTimeout(() => setSuccessMessage(''), 3000); // Clear success message after 3 seconds
    } catch (error) {
      console.error('Error adding expense', error);
    }
  };

  return (
    <div style={styles.formContainer} className="expense-form-container">
      <h2 style={styles.formTitle}>Add New Expense</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Item Name"
          style={styles.input}
          className="expense-input"
          required
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price (RS)"
          style={styles.input}
          className="expense-input"
          required
        />
        <button type="submit" style={styles.button} className="expense-submit-btn">
          Add Expense
        </button>
      </form>
      {successMessage && <p style={styles.successMessage}>{successMessage}</p>}
    </div>
  );
};

const styles = {
  formContainer: {
    padding: '30px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    width: '100%',
    border: '1px solid #e9ecef',
  },
  input: {
    display: 'block',
    padding: '14px 16px',
    margin: '12px 0',
    width: '100%',
    boxSizing: 'border-box',
    borderRadius: '8px',
    border: '2px solid #e0e0e0',
    fontSize: '15px',
    transition: 'all 0.3s ease',
    outline: 'none',
    fontFamily: "'Roboto', sans-serif",
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '14px 24px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    width: '100%',
    marginTop: '12px',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  successMessage: {
    marginTop: '16px',
    padding: '12px 16px',
    backgroundColor: '#d4edda',
    color: '#155724',
    borderRadius: '8px',
    border: '1px solid #c3e6cb',
    fontWeight: '600',
    textAlign: 'center',
  },
  formTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#2C3E50',
    marginTop: 0,
    marginBottom: '24px',
  },
};

export default ExpenseForm;