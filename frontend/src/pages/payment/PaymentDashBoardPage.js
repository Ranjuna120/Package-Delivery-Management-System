import React, { useState, useEffect } from 'react';
import Sidebar from '../../compoments/Payment/Sidebar';
import PaymentTable from '../../compoments/Payment/PaymentTable';
import SearchBar from '../../compoments/Payment/SearchBar';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';
import '../../style/payment/PaymentDashBoardPage.css';

const PaymentDashBoardPage = () => {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncome] = useState(35000); // Fixed income value
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch('http://localhost:8070/payments/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPayments(data);
      } catch (error) {
        console.error('Failed to fetch payments:', error);
      }
    };

    const fetchExpenses = async () => {
      try {
        const res = await axios.get('http://localhost:8070/expenses/all');
        const expensesData = res.data;
        const total = expensesData.reduce((sum, expense) => sum + Number(expense.price), 0);
        setTotalExpenses(total);
      } catch (error) {
        console.error('Error fetching expenses', error);
      }
    };

    fetchPayments();
    fetchExpenses();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredPayments = payments.filter((payment) => {
    const idMatch = payment._id && payment._id.toString().toLowerCase().includes(searchTerm.toLowerCase());
    const emailMatch = payment.email && payment.email.toLowerCase().includes(searchTerm.toLowerCase());
    return idMatch || emailMatch;
  });

  const onView = (id) => {
    console.log(`View payment with ID: ${id}`);
  };

  const onVerify = async (id) => {
    try {
      await axios.post(`http://localhost:8070/payments/verify/${id}`);
      setSuccessMessage('Email sent successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      console.log(`Verify payment with ID: ${id}`);
    } catch (error) {
      console.error(`Error verifying payment with ID: ${id}`, error);
      setSuccessMessage('Failed to send email.');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const onReject = (id) => {
    console.log(`Reject payment with ID: ${id}`);
  };

  const downloadPDF = (payment) => {
    const doc = new jsPDF();
    doc.text('Payment Details', 20, 10);

    doc.autoTable({
      head: [['Field', 'Value']],
      body: [
        ['Payment ID', payment.id],
        ['Customer Email', payment.email],
        ['Amount', payment.amount],
        ['Date', new Date(payment.createdAt).toLocaleDateString()],
        ['Payment Method', payment.method],
      ],
    });

    doc.save(`${payment.email}_payment_details.pdf`);
  };

  const availableBalance = totalIncome - totalExpenses;

  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.mainContent} className="payment-main-content">
        <div style={styles.contentWrapper}>
          {/* Header */}
          <div style={styles.header}>
            <button style={styles.backBtn} className="payment-back-btn" onClick={() => navigate('/AdminChoose/GMChoose')}>
              ← BACK
            </button>
            <div>
              <h1 style={styles.title}>Payment Dashboard</h1>
              <p style={styles.subtitle}>Manage payments and track financial overview</p>
            </div>
          </div>

          {/* Summary Cards */}
          <div style={styles.summarySection} className="payment-summary-section">
            <div style={styles.summaryCard} className="payment-summary-card">
              <div style={styles.cardIconContainer}>
                <span style={styles.cardIcon}>💵</span>
              </div>
              <div style={styles.cardContent}>
                <p style={styles.cardLabel}>Total Income</p>
                <h2 style={styles.cardValue}>Rs. {totalIncome.toLocaleString()}</h2>
                <p style={styles.cardSubtext}>Fixed monthly income</p>
              </div>
            </div>

            <div style={{...styles.summaryCard, ...styles.summaryCardRed}} className="payment-summary-card">
              <div style={styles.cardIconContainer}>
                <span style={styles.cardIcon}>💸</span>
              </div>
              <div style={styles.cardContent}>
                <p style={styles.cardLabel}>Total Expenses</p>
                <h2 style={styles.cardValue}>Rs. {totalExpenses.toLocaleString()}</h2>
                <p style={styles.cardSubtext}>Current period spending</p>
              </div>
            </div>

            <div style={{...styles.summaryCard, ...styles.summaryCardGreen}} className="payment-summary-card">
              <div style={styles.cardIconContainer}>
                <span style={styles.cardIcon}>💰</span>
              </div>
              <div style={styles.cardContent}>
                <p style={styles.cardLabel}>Available Balance</p>
                <h2 style={styles.cardValue}>Rs. {availableBalance.toLocaleString()}</h2>
                <p style={styles.cardSubtext}>
                  {availableBalance >= 0 ? 'Positive balance' : 'Over budget'}
                </p>
              </div>
            </div>
          </div>

          {/* Success message display */}
          {successMessage && (
            <div style={styles.successMessage}>
              {successMessage}
            </div>
          )}

          {/* Search and Table Section */}
          <div style={styles.tableSection}>
            <h2 style={styles.sectionTitle}>Payment Records</h2>
            <SearchBar onSearch={handleSearch} />

            {filteredPayments.length > 0 ? (
              <PaymentTable
                payments={filteredPayments}
                onVerify={onVerify}
                onReject={onReject}
                onView={onView}
                onDownloadPDF={downloadPDF}
              />
            ) : (
              <div style={styles.noDataCard}>
                <p style={styles.noDataText}>No payments found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    background: '#f8f9fa',
  },
  mainContent: {
    flex: 1,
    marginLeft: '280px',
    padding: '40px 20px',
    fontFamily: "'Roboto', sans-serif",
  },
  contentWrapper: {
    maxWidth: '100%',
    margin: '0',
    paddingRight: '20px',
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    marginBottom: '30px',
  },
  summaryCard: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '10px',
    padding: '18px 22px',
    color: '#fff',
    boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  summaryCardRed: {
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    boxShadow: '0 4px 12px rgba(245, 87, 108, 0.3)',
  },
  summaryCardGreen: {
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    boxShadow: '0 4px 12px rgba(79, 172, 254, 0.3)',
  },
  cardIconContainer: {
    marginBottom: '12px',
  },
  cardIcon: {
    fontSize: '36px',
    lineHeight: 1,
  },
  cardContent: {
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
    fontSize: '24px',
    fontWeight: '700',
    margin: '0 0 6px 0',
  },
  cardSubtext: {
    fontSize: '11px',
    opacity: 0.8,
    margin: 0,
  },
  successMessage: {
    background: 'linear-gradient(135deg, #27AE60 0%, #229954 100%)',
    color: '#fff',
    padding: '16px 24px',
    borderRadius: '8px',
    marginBottom: '20px',
    textAlign: 'center',
    fontWeight: '600',
    boxShadow: '0 4px 12px rgba(39, 174, 96, 0.3)',
    animation: 'slideIn 0.3s ease',
  },
  tableSection: {
    background: '#fff',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e9ecef',
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: '20px',
    margin: '0 0 20px 0',
  },
  noDataCard: {
    textAlign: 'center',
    padding: '60px 20px',
    background: '#f8f9fa',
    borderRadius: '8px',
    marginTop: '20px',
  },
  noDataText: {
    color: '#7F8C8D',
    fontSize: '16px',
    margin: 0,
  },
};

export default PaymentDashBoardPage;