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
    const loginTimeStamp = localStorage.getItem('lastLogin');
    
    // Format the timestamp to a readable date
    let formattedTime = 'N/A';
    if (loginTimeStamp) {
      const date = new Date(parseInt(loginTimeStamp));
      formattedTime = date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    
    setCustomerName(name);
    setLastLogin(formattedTime);
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
          <li><a href="/My/FindOrder">Track Order</a></li>
          <li><a href="/FeedbackForm">Feedback</a></li>
          <li><a href="/PaymentDashBoardOne">Payment</a></li>
          <li><a href="/create">Create Package</a></li>
          <li><a href="#" className="logout-link" onClick={(e) => { e.preventDefault(); handleLogout(); }}>Logout</a></li>
        </ul>
      </div>

      <div className="customer-profile-main-content">
        <header className="dashboard-header">
          <h1>Welcome, {customerName}!</h1>
          <p>Your last login: <span>{lastLogin}</span></p>
        </header>

        <section className="stats-section">
          <div className="stats-card">
            <div className="stat-icon">📦</div>
            <h3>Total Orders</h3>
            <p>--</p>
          </div>
          <div className="stats-card">
            <div className="stat-icon">⏱️</div>
            <h3>Pending Orders</h3>
            <p>--</p>
          </div>
          <div className="stats-card">
            <div className="stat-icon">🔔</div>
            <h3>Notifications</h3>
            <p>--</p>
          </div>
        </section>

        <section className="recent-activity">
          <h2>Recent Activity</h2>
          <ul>
            <li>No recent activity yet.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default CustomerProfileOne;
