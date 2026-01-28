import React from 'react';
import { useNavigate } from 'react-router-dom';

function StockDashBoardPage() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        {/* Header */}
        <div style={styles.header}>
          <button style={styles.backBtn} onClick={() => navigate('/')}>
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
    padding: '40px 20px',
    minHeight: '100vh',
    background: '#f8f9fa',
  },
  contentWrapper: {
    maxWidth: '1400px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '40px',
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
  },
  title: {
    margin: 0,
    color: '#2C3E50',
    fontSize: '32px',
    fontWeight: 700,
  },
  subtitle: {
    marginTop: '8px',
    color: '#7F8C8D',
    fontSize: '16px',
    margin: 0,
  },
  dashboardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
  },
  comingSoonCard: {
    background: '#ffffff',
    borderRadius: '12px',
    padding: '40px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    border: '1px solid #E8E8E8',
    textAlign: 'center',
  },
  iconContainer: {
    fontSize: '64px',
    marginBottom: '20px',
  },
  cardTitle: {
    margin: '0 0 16px 0',
    color: '#2C3E50',
    fontSize: '24px',
    fontWeight: 700,
  },
  cardText: {
    margin: 0,
    color: '#7F8C8D',
    fontSize: '16px',
    lineHeight: '1.6',
  },
};

export default StockDashBoardPage;
