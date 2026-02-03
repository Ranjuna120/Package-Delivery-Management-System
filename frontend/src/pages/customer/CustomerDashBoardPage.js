import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CustomerDashBoard() {
  const navigate = useNavigate();
  const [hoverIdx, setHoverIdx] = useState(null);

  const cards = [
    {
      title: 'Customer Details',
      desc: 'View and manage customer records',
      icon: '👤',
      path: '/Cusdetails',
    },
    {
      title: 'Feedback',
      desc: 'Review feedback and insights',
      icon: '💬',
      path: '/FeedbackList',
    },
  ];

  const handleNavigate = (suffix) => {
    navigate(`/AdminChoose/DMChoose/CustomerDashBoardPage${suffix}`);
  };

  return (
    <section style={styles.section}>
      <div style={styles.headerWrap}>
        <h1 style={styles.title}>Customer Dashboard</h1>
        <p style={styles.subtitle}>Quick access to customer operations</p>
      </div>

      <div style={styles.grid}>
        {cards.map((c, idx) => (
          <button
            key={c.title}
            type="button"
            aria-label={c.title}
            onClick={() => handleNavigate(c.path)}
            onMouseEnter={() => setHoverIdx(idx)}
            onMouseLeave={() => setHoverIdx(null)}
            style={{
              ...styles.card,
              transform: hoverIdx === idx ? 'translateY(-8px) scale(1.02)' : 'translateY(0)',
              boxShadow:
                hoverIdx === idx
                  ? '0 16px 40px rgba(102, 126, 234, 0.25)'
                  : '0 8px 24px rgba(0, 0, 0, 0.08)',
              borderColor: hoverIdx === idx ? '#667eea' : 'transparent',
            }}
          >
            <div style={styles.icon}>{c.icon}</div>
            <div style={styles.cardTitle}>{c.title}</div>
            <div style={styles.cardDesc}>{c.desc}</div>
            <div style={styles.cardCta}>Open →</div>
          </button>
        ))}
      </div>
    </section>
  );
}

const styles = {
  section: {
    minHeight: 'calc(100vh - 120px)',
    padding: '48px 32px 80px 32px',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  headerWrap: {
    textAlign: 'center',
    marginBottom: 48,
    padding: '32px 40px',
    background: 'white',
    borderRadius: 16,
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
    maxWidth: 800,
    width: '100%',
  },
  title: {
    margin: 0,
    fontSize: 36,
    lineHeight: 1.2,
    color: '#2c3e50',
    fontWeight: 800,
  },
  subtitle: {
    marginTop: 12,
    color: '#495057',
    fontSize: 16,
    fontWeight: 500,
  },
  grid: {
    width: '100%',
    maxWidth: 1200,
    display: 'flex',
    flexWrap: 'wrap',
    gap: 32,
    justifyContent: 'center',
  },
  card: {
    width: 380,
    minHeight: 280,
    padding: '36px 32px',
    border: '2px solid transparent',
    borderRadius: 20,
    background: 'white',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
    cursor: 'pointer',
    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    textAlign: 'left',
    position: 'relative',
    overflow: 'hidden',
  },
  icon: {
    fontSize: 64,
    marginBottom: 20,
    filter: 'drop-shadow(0 4px 8px rgba(102, 126, 234, 0.2))',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 700,
    color: '#2c3e50',
    marginBottom: 12,
  },
  cardDesc: {
    fontSize: 15,
    color: '#6c757d',
    flexGrow: 1,
    marginBottom: 24,
    lineHeight: 1.6,
  },
  cardCta: {
    alignSelf: 'flex-end',
    fontWeight: 700,
    fontSize: 15,
    color: '#667eea',
    padding: '10px 20px',
    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
    borderRadius: 8,
    letterSpacing: '0.5px',
  },
};

export default CustomerDashBoard;
