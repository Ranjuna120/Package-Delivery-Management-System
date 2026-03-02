import React, { useState } from 'react';
import axios from 'axios';

const UpdateExpenseForm = ({ expense, onUpdate, onClose }) => {
  const [itemName, setItemName] = useState(expense.itemName);
  const [price, setPrice] = useState(expense.price);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onUpdate(expense._id, { itemName, price: Number(price) });
   
      setTimeout(() => {
        setSuccessMessage('');
        onClose(); // Close the modal after a brief moment
      }, 3000);
    } catch (error) {
      console.error('Error updating expense', error);
    }
  };

  return (
    <div style={styles.formContainer}>
      <h2>Update Existing Expense</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Update Item Name"
          style={styles.input}
          required
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Update Price (RS)"
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Update Expense
        </button>
      </form>
      {successMessage && <p style={styles.successMessage}>{successMessage}</p>}
      <button onClick={onClose} style={styles.closeButton}>
        Close
      </button>
    </div>
  );
};

const styles = {
  formContainer: {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  },
  input: {
    display: 'block',
    padding: '10px',
    margin: '10px 0',
    width: '100%',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  successMessage: {
    marginTop: '10px',
    color: '#28a745',
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: '10px',
    backgroundColor: '#e74c3c',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default UpdateExpenseForm;