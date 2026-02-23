import React from 'react';
import { useNavigate } from 'react-router-dom';

function StockDashBoardPage() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        {/* Header */}
        <div style={styles.header}>
          <button style={styles.backBtn} onClick={() => navigate('/AdminLogin')}>
            ← BACK
          </button>
          <div>
            <h1 style={styles.title}>Stock Dashboard</h1>
            <p style={styles.subtitle}>Manage your inventory and stock levels</p>
          </div>
        </div>

        {/* Dashboard Content */}
        <div style={styles.dashboardGrid}>
          {/* Coming Soon Card */}
          <div style={styles.comingSoonCard}>
            <div style={styles.iconContainer}>
              📦
            </div>
            <h2 style={styles.cardTitle}>Stock Management</h2>
            <p style={styles.cardText}>
              Inventory tracking, stock levels, and warehouse management features coming soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '48px 32px 80px 32px',
    minHeight: 'calc(100vh - 120px)',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  },
  contentWrapper: {
    maxWidth: '1400px',
    margin: '0 auto',
  },
  header: {
    background: 'white',
    padding: '32px 40px',
    borderRadius: '20px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
    marginBottom: '40px',
  },
  backBtn: {
    padding: '12px 24px',
    background: '#6c757d',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontWeight: '700',
    cursor: 'pointer',
    fontSize: '14px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '16px',
  },
  title: {
    margin: 0,
    color: '#2c3e50',
    fontSize: '36px',
    fontWeight: 800,
  },
  subtitle: {
    marginTop: '12px',
    color: '#6c757d',
    fontSize: '16px',
    margin: '12px 0 0 0',
    fontWeight: '500',
  },
  dashboardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
    gap: '32px',
  },
  comingSoonCard: {
    background: '#ffffff',
    borderRadius: '20px',
    padding: '60px 40px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
    border: '2px solid transparent',
    textAlign: 'center',
    transition: 'all 0.35s ease',
  },
  iconContainer: {
    fontSize: '80px',
    marginBottom: '24px',
    filter: 'drop-shadow(0 4px 8px rgba(102, 126, 234, 0.2))',
  },
  cardTitle: {
    margin: '0 0 16px 0',
    color: '#2c3e50',
    fontSize: '28px',
    fontWeight: 700,
  },
  cardText: {
    margin: 0,
    color: '#6c757d',
    fontSize: '16px',
    lineHeight: '1.6',
  },
};

export default StockDashBoardPage;
