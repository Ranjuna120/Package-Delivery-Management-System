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
          {/* <li><a href="/CusProfile" onClick={() => navigate('/CusProfile')}>Profile</a></li> */}
          <li><a href="/Or_Add">My Orders</a></li>
          <li><a href="/FeedbackForm">Feedback</a></li>
          <li><a href="/PaymentDashBoardOne">Payment</a></li>
          <li><a href="#">Create Package</a></li>
          <li><a href="#" onClick={(e) => {
            e.preventDefault();
            handleLogout();
          }}>Logout</a></li>
        </ul>
      </div>

      <div className="customer-profile-main-content">
        <header className="dashboard-header">
          <h1>Welcome, {customerName}!</h1>
          <p>Your last login: {lastLogin}</p>
        </header>

        <section className="stats-section">
          <div className="stats-card">
            <h3>Total Orders</h3>
            {/* <p>{user.orders}</p> */}
          </div>
          <div className="stats-card">
            <h3>Pending Orders</h3>
            {/* <p>{user.pendingOrders}</p> */}
          </div>
          <div className="stats-card">
            <h3>Notifications</h3>
            {/* <p>{user.notifications}</p> */}
          </div>
        </section>

        <section className="recent-activity">
          <h2>Recent Activity</h2>
          {/* <ul>
            {user.recentActivity.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul> */}
        </section>
      </div>
    </div>
  );
};

export default CustomerProfileOne;
