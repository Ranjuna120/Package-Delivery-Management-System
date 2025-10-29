import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DMChoose() {
  const navigate = useNavigate();
  const [hoverIdx, setHoverIdx] = useState(null);

  const cards = [
    {
      title: 'Employee Management',
      desc: 'Manage employees, attendance, and profiles',
      icon: '👥',
      path: '/EmployeeDashBoardOne',
    },
    {
      title: 'Customer Management',
      desc: 'View customers, profiles, and feedback',
      icon: '🧑‍💼',
      path: '/CustomerDashBoardPage',
    },
  ];

  const handleNavigate = (path) => navigate(path);

  return (
    <section style={styles.section}>
      <div style={styles.headerWrap}>
        <h1 style={styles.title}>Deputy Manager</h1>
        <p style={styles.subtitle}>Choose a module to manage daily operations</p>
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
              transform: hoverIdx === idx ? 'translateY(-6px) scale(1.02)' : 'translateY(0)',
              boxShadow:
                hoverIdx === idx
                  ? '0 16px 32px rgba(33,147,176,0.25)'
                  : '0 8px 24px rgba(33,147,176,0.15)',
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
    minHeight: '100vh',
    padding: '48px 20px',
    background: 'linear-gradient(135deg, #ffffff 0%, #f7f9fc 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  headerWrap: {
    textAlign: 'center',
    marginBottom: 32,
  },
  title: {
    margin: 0,
    fontSize: 36,
    lineHeight: 1.2,
    color: '#2193b0',
    fontWeight: 800,
  },
  subtitle: {
    marginTop: 8,
    color: '#5f6b7a',
    fontSize: 16,
  },
  grid: {
    width: '100%',
    maxWidth: 1100,
    display: 'flex',
    flexWrap: 'wrap',
    gap: 24,
    justifyContent: 'center',
  },
  card: {
    width: 360,
    minHeight: 250,
    padding: '32px 28px',
    border: '0',
    borderRadius: 16,
    background: 'linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)',
    boxShadow: '0 8px 24px rgba(33,147,176,0.15)',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    textAlign: 'left',
  },
  icon: {
    fontSize: 52,
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: '#2c3e50',
    marginBottom: 10,
  },
  cardDesc: {
    fontSize: 15,
    color: '#6c7a89',
    flexGrow: 1,
    marginBottom: 18,
  },
  cardCta: {
    alignSelf: 'flex-end',
    fontWeight: 700,
    color: '#2193b0',
  },
};

export default DMChoose;