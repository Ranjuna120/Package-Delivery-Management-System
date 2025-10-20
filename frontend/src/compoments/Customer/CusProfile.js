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
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        flexDirection: 'column'
      }}>
        <div style={{
          backgroundColor: '#fff',
          padding: '40px 60px',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          textAlign: 'center'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '5px solid #f3f3f3',
            borderTop: '5px solid #667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <h3 style={{ 
            color: '#333',
            margin: '0',
            fontSize: '20px',
            fontWeight: '600'
          }}>Loading Profile...</h3>
        </div>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
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
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        flexDirection: 'column',
        padding: '20px'
      }}>
        <div style={{
          backgroundColor: '#fff',
          padding: '40px 60px',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          textAlign: 'center',
          maxWidth: '500px'
        }}>
          <div style={{
            fontSize: '60px',
            marginBottom: '20px'
          }}>⚠️</div>
          <h3 style={{ 
            color: '#e74c3c',
            margin: '0 0 15px 0',
            fontSize: '24px',
            fontWeight: '600'
          }}>{error}</h3>
          <p style={{
            color: '#666',
            marginBottom: '25px',
            fontSize: '16px'
          }}>Please log in to view your profile</p>
          <button 
            onClick={() => navigate('/CustomerLogin')} 
            style={{ 
              padding: '12px 30px',
              fontSize: '16px',
              fontWeight: '600',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '30px',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
              transition: 'transform 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div style={{ 
        maxWidth: '900px',
        margin: '0 auto',
        backgroundColor: '#fff', 
        borderRadius: '20px', 
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        overflow: 'hidden'
      }}>
        {/* Header Section */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '40px',
          textAlign: 'center',
          color: '#fff'
        }}>
          <img 
            src={customer.profilePhoto} 
            alt="Profile" 
            style={{ 
              width: '150px', 
              height: '150px', 
              borderRadius: '50%', 
              border: '5px solid #fff',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
              marginBottom: '20px',
              objectFit: 'cover'
            }} 
          />
          <h1 style={{ 
            margin: '0 0 10px 0',
            fontSize: '32px',
            fontWeight: '700',
            letterSpacing: '0.5px'
          }}>
            {customer.fullName || 'Customer'}
          </h1>
          <p style={{ 
            margin: '0',
            fontSize: '16px',
            opacity: '0.9',
            fontWeight: '300'
          }}>
            @{customer.username}
          </p>
        </div>

        {/* Profile Information Section */}
        <div style={{ padding: '40px' }}>
          <h2 style={{ 
            color: '#333',
            fontSize: '24px',
            marginBottom: '30px',
            fontWeight: '600',
            borderBottom: '3px solid #667eea',
            paddingBottom: '10px',
            display: 'inline-block'
          }}>
            Profile Information
          </h2>

          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '25px',
            marginBottom: '30px'
          }}>
            {/* Email */}
            <div style={{
              padding: '20px',
              backgroundColor: '#f8f9ff',
              borderRadius: '12px',
              border: '1px solid #e0e7ff',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}>
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                marginBottom: '8px'
              }}>
                <span style={{ 
                  fontSize: '24px',
                  marginRight: '12px'
                }}>📧</span>
                <strong style={{ 
                  color: '#667eea',
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>Email</strong>
              </div>
              <p style={{ 
                margin: '0',
                color: '#333',
                fontSize: '16px',
                wordBreak: 'break-word'
              }}>
                {customer.email || 'Not provided'}
              </p>
            </div>

            {/* Address */}
            <div style={{
              padding: '20px',
              backgroundColor: '#f8f9ff',
              borderRadius: '12px',
              border: '1px solid #e0e7ff',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}>
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                marginBottom: '8px'
              }}>
                <span style={{ 
                  fontSize: '24px',
                  marginRight: '12px'
                }}>📍</span>
                <strong style={{ 
                  color: '#667eea',
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>Address</strong>
              </div>
              <p style={{ 
                margin: '0',
                color: '#333',
                fontSize: '16px',
                wordBreak: 'break-word'
              }}>
                {customer.address || 'Not provided'}
              </p>
            </div>

            {/* Age */}
            <div style={{
              padding: '20px',
              backgroundColor: '#f8f9ff',
              borderRadius: '12px',
              border: '1px solid #e0e7ff',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}>
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                marginBottom: '8px'
              }}>
                <span style={{ 
                  fontSize: '24px',
                  marginRight: '12px'
                }}>🎂</span>
                <strong style={{ 
                  color: '#667eea',
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>Age</strong>
              </div>
              <p style={{ 
                margin: '0',
                color: '#333',
                fontSize: '16px'
              }}>
                {customer.age || 'Not provided'} {customer.age && 'years'}
              </p>
            </div>

            {/* Gender */}
            <div style={{
              padding: '20px',
              backgroundColor: '#f8f9ff',
              borderRadius: '12px',
              border: '1px solid #e0e7ff',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}>
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                marginBottom: '8px'
              }}>
                <span style={{ 
                  fontSize: '24px',
                  marginRight: '12px'
                }}>👤</span>
                <strong style={{ 
                  color: '#667eea',
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>Gender</strong>
              </div>
              <p style={{ 
                margin: '0',
                color: '#333',
                fontSize: '16px'
              }}>
                {customer.gender || 'Not provided'}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ 
            display: 'flex', 
            gap: '15px',
            justifyContent: 'center',
            marginTop: '40px',
            flexWrap: 'wrap'
          }}>
            <button 
              onClick={handleUpdate} 
              style={{ 
                padding: '15px 40px',
                fontSize: '16px',
                fontWeight: '600',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#fff', 
                border: 'none', 
                borderRadius: '30px',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                minWidth: '150px'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
              }}
            >
              ✏️ Update Profile
            </button>
            <button 
              onClick={handleCancel} 
              style={{ 
                padding: '15px 40px',
                fontSize: '16px',
                fontWeight: '600',
                background: '#fff',
                color: '#667eea', 
                border: '2px solid #667eea', 
                borderRadius: '30px',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                minWidth: '150px'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.background = '#667eea';
                e.target.style.color = '#fff';
                e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.background = '#fff';
                e.target.style.color = '#667eea';
                e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
              }}
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CusProfile;
