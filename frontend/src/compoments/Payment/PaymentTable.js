import React from 'react';

const PaymentTable = ({ payments, onVerify, onReject, onView }) => {
  return (
    <table style={styles.table} className="payment-table">
      <thead>
        <tr>
          <th style={styles.th}>Customer Name</th>
          <th style={styles.th}>Payment ID</th>
          <th style={styles.th}>Email</th>
          <th style={styles.th}>Date</th>
          <th style={styles.th}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {payments.length > 0 ? (
          payments.map((payment) => (
            <tr key={payment._id}>
              <td style={styles.td}>{payment.cardHolderName}</td>
              <td style={styles.td}>{payment._id}</td>
              <td style={styles.td}>{payment.email}</td>
              <td style={styles.td}>{payment.date}</td>
              <td style={styles.td}>
                <button style={styles.verifyButton} className="payment-verify-btn" onClick={() => onVerify(payment._id)}>Verify</button>
                <button style={styles.rejectButton} className="payment-reject-btn" onClick={() => onReject(payment._id)}>Reject</button>
                <button style={styles.viewButton} className="payment-view-btn" onClick={() => onView(payment._id)}>View</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" style={styles.td}>No payments found.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

const styles = {
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: 0,
    marginTop: '20px',
    overflow: 'hidden',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
  },
  th: {
    padding: '16px',
    backgroundColor: '#2C3E50',
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: '15px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  td: {
    padding: '16px',
    borderBottom: '1px solid #e9ecef',
    textAlign: 'center',
    fontSize: '14px',
    color: '#495057',
  },
  verifyButton: {
    backgroundColor: '#27AE60',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    margin: '0 4px',
    cursor: 'pointer',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  rejectButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    margin: '0 4px',
    cursor: 'pointer',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  viewButton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    margin: '0 4px',
    cursor: 'pointer',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
};

export default PaymentTable;