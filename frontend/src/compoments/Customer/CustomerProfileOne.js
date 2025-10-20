import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import '../../style/Comman css/CustomerProfileOne.css'

function CustomerProfileOne  ()  {
  const [customerName, setCustomerName] = useState('');
  const [lastLogin, setLastLogin] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Get customer name and last login from localStorage
    const name = localStorage.getItem('customerName') || localStorage.getItem('username') || 'Guest';
    const loginTime = localStorage.getItem('lastLogin') || 'N/A';
    
    setCustomerName(name);
    setLastLogin(loginTime);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('customerName');
    localStorage.removeItem('lastLogin');
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Customer Dashboard</h2>
        <ul className="sidebar-menu">
          <li><a href="/CusProfile">Profile</a></li>
          <li><a href="/Or_Add">My Orders</a></li>
          <li><a href="/FeedbackForm">Feedback</a></li>
          <li><a href="/PaymentDashBoardOne">Payment</a></li>
          <li><a href="#">Create Package</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }} style={{ color: '#e74c3c', fontWeight: 'bold' }}>Logout</a></li>
        </ul>
      </div>

      <div className="customer-profile-main-content">
        <header className="dashboard-header" style={{ boxShadow: '0 2px 12px rgba(52,152,219,0.15)', borderRadius: '12px', marginBottom: '30px', background: 'linear-gradient(90deg, #2193b0 0%, #6dd5ed 100%)' }}>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 700, letterSpacing: '1px' }}>Welcome, {customerName}!</h1>
          <p style={{ fontSize: '1rem', marginTop: '8px' }}>Your last login: <span style={{ fontWeight: 600 }}>{lastLogin}</span></p>
        </header>

        <section className="stats-section" style={{ gap: '20px' }}>
          <div className="stats-card" style={{ border: '2px solid #2193b0', background: 'linear-gradient(135deg, #e0f7fa 0%, #ffffff 100%)' }}>
            <h3 style={{ color: '#2193b0', fontWeight: 600 }}>Total Orders</h3>
            <p style={{ color: '#2193b0', fontWeight: 700, fontSize: '2rem' }}>--</p>
          </div>
          <div className="stats-card" style={{ border: '2px solid #6dd5ed', background: 'linear-gradient(135deg, #f1f8e9 0%, #ffffff 100%)' }}>
            <h3 style={{ color: '#6dd5ed', fontWeight: 600 }}>Pending Orders</h3>
            <p style={{ color: '#6dd5ed', fontWeight: 700, fontSize: '2rem' }}>--</p>
          </div>
          <div className="stats-card" style={{ border: '2px solid #3498db', background: 'linear-gradient(135deg, #e3eafc 0%, #ffffff 100%)' }}>
            <h3 style={{ color: '#3498db', fontWeight: 600 }}>Notifications</h3>
            <p style={{ color: '#3498db', fontWeight: 700, fontSize: '2rem' }}>--</p>
          </div>
        </section>

        <section className="recent-activity">
          <h2 style={{ color: '#2193b0', fontWeight: 700 }}>Recent Activity</h2>
          <ul>
            <li style={{ background: 'linear-gradient(90deg, #e0f7fa 0%, #ffffff 100%)', color: '#2193b0', fontWeight: 500 }}>No recent activity yet.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default CustomerProfileOne;
