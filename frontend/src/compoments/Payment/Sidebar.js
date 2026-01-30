import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const Sidebar = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [hoveredButton, setHoveredButton] = useState(null);

  const handleMouseEnter = (buttonName) => setHoveredButton(buttonName);
  const handleMouseLeave = () => setHoveredButton(null);

  const navigateToExpenses = () => {
    navigate('/Handlepayment');
  };
  
  const navigateToaddpaymentform = () => {
    navigate('/Addpaymentform');
  };

  const navigateTomanagerprofile = () => {
    navigate('/PMprofile');
  };

  const navigateAdminLoginpage = () => {
    navigate('/AdminLogin');
  };

  const navigateCusDashboard = () => {
    navigate('/CusDashboard');
  };

  return (
    <div style={styles.sidebar}>
      <div style={styles.sidebarHeader}>
        <h2 style={styles.headerTitle}>💰 Payment</h2>
        <p style={styles.headerSubtitle}>Management Dashboard</p>
      </div>

      <div style={styles.menuSection}>
        <button
          style={hoveredButton === 'profile' ? { ...styles.button, ...styles.buttonHover } : styles.button}
          onMouseEnter={() => handleMouseEnter('profile')}
          onMouseLeave={handleMouseLeave}
          onClick={navigateTomanagerprofile}
        >
          <span style={styles.buttonIcon}>👤</span>
          <span>Profile</span>
        </button>

        <button
          style={hoveredButton === 'expenses' ? { ...styles.button, ...styles.buttonHover } : styles.button}
          onMouseEnter={() => handleMouseEnter('expenses')}
          onMouseLeave={handleMouseLeave}
          onClick={navigateToExpenses}
        >
          <span style={styles.buttonIcon}>💳</span>
          <span>Handle Expenses</span>
        </button>

        <button
          style={hoveredButton === 'paymentform' ? { ...styles.button, ...styles.buttonHover } : styles.button}
          onMouseEnter={() => handleMouseEnter('paymentform')}
          onMouseLeave={handleMouseLeave}
          onClick={navigateToaddpaymentform}
        >
          <span style={styles.buttonIcon}>📝</span>
          <span>Payment Form</span>
        </button>

        <button
          style={hoveredButton === 'notifications' ? { ...styles.button, ...styles.buttonHover } : styles.button}
          onMouseEnter={() => handleMouseEnter('notifications')}
          onMouseLeave={handleMouseLeave}
        >
          <span style={styles.buttonIcon}>🔔</span>
          <span>Notifications</span>
        </button>

        <button
          style={hoveredButton === 'cusDashboard' ? { ...styles.button, ...styles.buttonHover } : styles.button}
          onMouseEnter={() => handleMouseEnter('cusDashboard')}
          onMouseLeave={handleMouseLeave}
          onClick={navigateCusDashboard}
        >
          <span style={styles.buttonIcon}>📊</span>
          <span>Customer Dashboard</span>
        </button>
      </div>

      <button
        style={hoveredButton === 'logout' ? { ...styles.logoutButton, ...styles.logoutHover } : styles.logoutButton}
        onMouseEnter={() => handleMouseEnter('logout')}
        onMouseLeave={handleMouseLeave}
        onClick={navigateAdminLoginpage}
      >
        <span style={styles.buttonIcon}>🚪</span>
        <span>LOGOUT</span>
      </button>
    </div>
  );
};

// Styles remain unchanged, but we ensure consistent styling for new buttons
const styles = {
  sidebar: {
    width: '280px',
    background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
    minHeight: '100vh',
    padding: '0',
    boxShadow: '4px 0 20px rgba(0,0,0,0.15)',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  sidebarHeader: {
    padding: '30px 20px',
    borderBottom: '1px solid rgba(255,255,255,0.2)',
    marginBottom: '20px',
  },
  headerTitle: {
    fontSize: '26px',
    color: 'white',
    fontWeight: '700',
    margin: '0 0 5px 0',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.8)',
    margin: '0',
    textAlign: 'center',
    fontWeight: '400',
  },
  menuSection: {
    padding: '0 15px',
    flex: 1,
    overflowY: 'auto',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    margin: '20px 0',
    padding: '14px 16px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
    textAlign: 'left',
  },
  buttonIcon: {
    fontSize: '18px',
    marginRight: '12px',
    display: 'inline-block',
  },
  buttonHover: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    transform: 'translateX(5px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  },
  logoutButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'calc(100% - 30px)',
    margin: '20px 15px',
    padding: '14px',
    backgroundColor: 'rgba(220, 53, 69, 0.9)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  logoutHover: {
    backgroundColor: '#dc3545',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(220, 53, 69, 0.4)',
  },
};

export default Sidebar;