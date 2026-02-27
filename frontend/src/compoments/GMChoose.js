import React from 'react';
import { useNavigate } from 'react-router-dom';

function GMChoose() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(`${path}`);
  };

  const cardData = [
    {
      title: 'Packages',
      icon: '📦',
      path: '/PackageDashBoardPage',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      title: 'Orders',
      icon: '📋',
      path: '/OrderDashBoardPage',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    {
      title: 'Payments',
      icon: '💳',
      path: '/PaymentDashBoardPage',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
  ];

  return (
    <div style={styles.container}>
      <button
        onClick={() => navigate('/AdminLogin')}
        style={styles.backBtn}
      >
        <span>←</span> Back
      </button>

      <div style={styles.header}>
        <h1 style={styles.title}>General Manager Dashboard</h1>
        <p style={styles.subtitle}>Select a module to manage</p>
      </div>
      <div style={styles.cardGrid}>
        {cardData.map((card, index) => (
          <div
            key={index}
            style={{...styles.card, background: card.gradient}}
            onClick={() => handleNavigate(card.path)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(33,147,176,0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(33,147,176,0.15)';
            }}
          >
            <div style={styles.icon}>{card.icon}</div>
            <h2 style={styles.cardTitle}>{card.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '40px 30px',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #ffffff 0%, #f7f9fc 100%)',
    position: 'relative',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  title: {
    margin: 0,
    color: '#2193b0',
    fontSize: '32px',
    fontWeight: 800,
  },
  subtitle: {
    marginTop: 8,
    color: '#5f6b7a',
    fontSize: 16,
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  card: {
    padding: '48px 32px',
    borderRadius: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 24px rgba(33,147,176,0.15)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '240px',
  },
  icon: {
    fontSize: '72px',
    marginBottom: '16px',
  },
  cardTitle: {
    margin: 0,
    color: '#ffffff',
    fontSize: '28px',
    fontWeight: 700,
    textAlign: 'center',
  },
  backBtn: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: '12px 24px',
    background: 'white',
    color: '#2193b0',
    border: '2px solid #2193b0',
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 700,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
};

export default GMChoose;