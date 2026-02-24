import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExpenseForm from '../../compoments/Payment/ExpenseForm';
import ExpenseList from '../../compoments/Payment/ExpenseList';
import Sidebar from '../../compoments/Payment/Sidebar';
import { useNavigate } from 'react-router-dom';
import '../../style/payment/ExpenseManagement.css';

function App() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get('http://localhost:8070/expenses/all');
      setExpenses(res.data);
      // Calculate total
      const total = res.data.reduce((sum, expense) => sum + Number(expense.price || 0), 0);
      setTotalExpenses(total);
    } catch (error) {
      console.error('Error fetching expenses', error);
    }
  };

  const handleExpenseAdded = () => {
    fetchExpenses(); // Refresh the expense list after adding a new expense
  };

  useEffect(() => {
    fetchExpenses(); // Fetch expenses on component mount
  }, []);

  return (
    <div style={styles.app}>
      <div style={styles.layout}>
        <Sidebar />
        <div style={styles.mainContent} className="expense-main-content">
          <div style={styles.contentWrapper}>
            {/* Header */}
            <div style={styles.header}>
              <button style={styles.backBtn} className="expense-back-btn" onClick={() => navigate('/PaymentDashBoardPage')}>
                ← BACK
              </button>
              <div>
                <h1 style={styles.title}>Expense Management</h1>
                <p style={styles.subtitle}>Track and manage your business expenses</p>
              </div>
            </div>

            {/* Summary Cards */}
            <div style={styles.summarySection} className="expense-summary-section">
              <div style={styles.summaryCard} className="expense-summary-card">
                <div style={styles.cardIcon}>💰</div>
                <div style={styles.cardContent}>
                  <p style={styles.cardLabel}>Total Expenses</p>
                  <h2 style={styles.cardValue}>Rs. {totalExpenses.toLocaleString()}</h2>
                </div>
              </div>
              <div style={{...styles.summaryCard, ...styles.summaryCardPurple}} className="expense-summary-card">
                <div style={styles.cardIcon}>📊</div>
                <div style={styles.cardContent}>
                  <p style={styles.cardLabel}>Total Items</p>
                  <h2 style={styles.cardValue}>{expenses.length}</h2>
                </div>
              </div>
              <div style={{...styles.summaryCard, ...styles.summaryCardGreen}} className="expense-summary-card">
                <div style={styles.cardIcon}>📈</div>
                <div style={styles.cardContent}>
                  <p style={styles.cardLabel}>Average Cost</p>
                  <h2 style={styles.cardValue}>
                    Rs. {expenses.length > 0 ? (totalExpenses / expenses.length).toFixed(0) : 0}
                  </h2>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div style={styles.container}>
              <ExpenseForm onExpenseAdded={handleExpenseAdded} />
              <ExpenseList expenses={expenses} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  app: {
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    fontFamily: "'Roboto', sans-serif",
  },
  layout: {
    display: 'flex',
    flexDirection: 'row',
  },
  mainContent: {
    flex: 1,
    marginLeft: '280px',
    padding: '40px 20px',
  },
  contentWrapper: {
    maxWidth: '100%',
    margin: '0',
    paddingRight: '30px',
  },
  header: {
    marginBottom: '30px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  backBtn: {
    padding: '10px 20px',
    background: '#6c757d',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '14px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    transition: 'all 0.3s ease',
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#2C3E50',
    margin: 0,
  },
  subtitle: {
    fontSize: '16px',
    color: '#7F8C8D',
    margin: '8px 0 0 0',
  },
  summarySection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
    marginBottom: '30px',
  },
  summaryCard: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '10px',
    padding: '16px 20px',
    color: '#fff',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
  },
  summaryCardPurple: {
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    boxShadow: '0 4px 12px rgba(245, 87, 108, 0.3)',
  },
  summaryCardGreen: {
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    boxShadow: '0 4px 12px rgba(79, 172, 254, 0.3)',
  },
  cardIcon: {
    fontSize: '36px',
    lineHeight: 1,
  },
  cardContent: {
    flex: 1,
    textAlign: 'left',
  },
  cardLabel: {
    fontSize: '12px',
    fontWeight: '500',
    opacity: 0.9,
    margin: '0 0 6px 0',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  cardValue: {
    fontSize: '22px',
    fontWeight: '700',
    margin: 0,
  },
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '30px',
    width: '100%',
  },
};

export default App;