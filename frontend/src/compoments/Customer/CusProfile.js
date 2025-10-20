import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CusProfile = () => {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    fullName: '',
    email: '',
    address: '',
    age: '',
    gender: '',
    username: '',
    profilePhoto: 'https://cdn-icons-png.flaticon.com/512/847/847969.png', // Default profile icon
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const customerId = localStorage.getItem('customerId');
        const username = localStorage.getItem('username');
        
        if (!customerId) {
          setError('Please login first');
          setLoading(false);
          return;
        }

        // Fetch customer data from backend
        const response = await axios.get(`http://localhost:8070/api/customers/${customerId}`);
        
        if (response.data) {
          setCustomer({
            fullName: response.data.name || '',
            email: response.data.email || '',
            address: response.data.address || '',
            age: response.data.age || '',
            gender: response.data.gender || '',
            username: response.data.username || username || '',
            profilePhoto: response.data.profilePhoto || 'https://cdn-icons-png.flaticon.com/512/847/847969.png',
          });
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching customer data:', err);
        setError('Failed to load customer data');
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, []);

  const handleUpdate = () => {
    // Navigate to update page with customer ID
    const customerId = localStorage.getItem('customerId');
    if (customerId) {
      navigate(`/update-customer/${customerId}`);
    }
  };

  const handleCancel = () => {
    // Navigate back to customer dashboard
    navigate('/CustomerProfileOne');
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <h3>Loading...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        flexDirection: 'column'
      }}>
        <h3 style={{ color: 'red' }}>{error}</h3>
        <button onClick={() => navigate('/CustomerLogin')} style={{ marginTop: '10px', padding: '10px 20px' }}>
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh', 
      backgroundColor: '#f0f0f0' 
    }}>
      <div style={{ 
        backgroundColor: '#fff', 
        padding: '20px', 
        borderRadius: '8px', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
        width: '350px', 
        textAlign: 'center' 
      }}>
        <img 
          src={customer.profilePhoto} 
          alt="Profile" 
          style={{ 
            width: '150px', 
            height: '150px', 
            borderRadius: '50%', 
            marginBottom: '20px' 
          }} 
        />
        <h2 style={{ color: '#333' }}>Customer Profile</h2>
        <div style={{ textAlign: 'left', margin: '20px 0' }}>
          <p><strong>Full Name:</strong> {customer.fullName}</p>
          <p><strong>Email:</strong> {customer.email}</p>
          <p><strong>Address:</strong> {customer.address}</p>
          <p><strong>Age:</strong> {customer.age}</p>
          <p><strong>Gender:</strong> {customer.gender}</p>
          <p><strong>Username:</strong> {customer.username}</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <button 
            onClick={handleUpdate} 
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#4CAF50', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}
          >
            Update
          </button>
          <button 
            onClick={handleCancel} 
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#f44336', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default CusProfile;
