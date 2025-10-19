import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import '../../style/Comman css/CustomerProfileOne.css'

function CustomerProfileOne  ()  {
  // const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState('');
  // const navigate = useNavigate(); // Initialize useNavigate

  // useEffect(() => {
  //   const fetchUserProfile = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:8070/api/customers/profile');
  //       console.log('Response:', response); // Log the response from the server

  //       setUser(response.data);
  //     } 
  //     catch (err) {
  //       console.error('Error fetching data:', err.response || err); // Log the error
  //       setError('Error fetching user data');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUserProfile();
  // }, [navigate]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>{error}</div>;
  // }

  // if (!user) {
  //   return <div>No user data available</div>;
  // }

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
          <li><a href="." onClick={() => {
            // navigate('/'); // Redirect to home or login page on logout
          }}>Logout</a></li>
        </ul>
      </div>

      <div className="customer-profile-main-content">
        <header className="dashboard-header">
          <h1>Welcome !</h1>
          <p>Your last login: </p>
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
