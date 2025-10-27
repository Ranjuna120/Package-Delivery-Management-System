import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
// import '../../style/customer/UpdateCustomer.css';

function UpdateCustomer() {
  const [customerData, setCustomerData] = useState({
    username: '',
    name: '',
    email: '',
    address: '',
    age: '',
    gender: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/api/customers/${id}`);
        setCustomerData(response.data);
      } catch (error) {
        console.error('Error fetching customer data:', error);
        alert('Failed to load customer data');
      }
    };

    fetchCustomerData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({ ...customerData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await axios.put(`http://localhost:8070/api/customers/${id}`, customerData);
      alert('Customer updated successfully!');
      navigate('/CusProfile');
    } catch (error) {
      console.error('Error updating customer:', error);
      alert('Failed to update customer');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        body {
          background: linear-gradient(135deg, #f5f7fa 0%, #e3e9f0 100%) !important;
          min-height: 100vh !important;
          margin: 0 !important;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        padding: '40px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          width: '100%',
          maxWidth: '600px',
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
          padding: '40px',
        }}>
          {/* Back Button */}
          <button
            onClick={() => navigate('/CusProfile')}
            type="button"
            disabled={isSubmitting}
            style={{
              background: 'white',
              border: '2px solid #667eea',
              borderRadius: '8px',
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#667eea',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '25px',
              opacity: isSubmitting ? 0.5 : 1,
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                e.target.style.background = '#667eea';
                e.target.style.color = 'white';
              }
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting) {
                e.target.style.background = 'white';
                e.target.style.color = '#667eea';
              }
            }}
          >
            <span>←</span> Back to Profile
          </button>

          {/* Icon and Title */}
          <div style={{
            textAlign: 'center',
            marginBottom: '30px',
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 20px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
            }}>
              ✏️
            </div>
            <h2 style={{
              color: '#667eea',
              fontSize: '28px',
              fontWeight: '700',
              margin: '0 0 8px 0',
            }}>
              Update Profile
            </h2>
            <p style={{
              color: '#6c757d',
              fontSize: '14px',
              margin: 0,
            }}>
              Update your personal information
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '15px',
                fontWeight: '600',
                color: '#333',
                marginBottom: '8px',
              }}>
                <span style={{ marginRight: '8px', fontSize: '18px' }}>👤</span>
                Username
              </label>
              <input
                type="text"
                name="username"
                value={customerData.username}
                onChange={handleChange}
                placeholder="Enter username"
                required
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '14px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                  opacity: isSubmitting ? 0.6 : 1,
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>

            {/* Full Name */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '15px',
                fontWeight: '600',
                color: '#333',
                marginBottom: '8px',
              }}>
                <span style={{ marginRight: '8px', fontSize: '18px' }}>📝</span>
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={customerData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                required
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '14px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                  opacity: isSubmitting ? 0.6 : 1,
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>

            {/* Email */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '15px',
                fontWeight: '600',
                color: '#333',
                marginBottom: '8px',
              }}>
                <span style={{ marginRight: '8px', fontSize: '18px' }}>✉️</span>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={customerData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '14px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                  opacity: isSubmitting ? 0.6 : 1,
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>

            {/* Address */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '15px',
                fontWeight: '600',
                color: '#333',
                marginBottom: '8px',
              }}>
                <span style={{ marginRight: '8px', fontSize: '18px' }}>📍</span>
                Address
              </label>
              <textarea
                name="address"
                value={customerData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                required
                disabled={isSubmitting}
                rows="3"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '14px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                  opacity: isSubmitting ? 0.6 : 1,
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>

            {/* Age and Gender in Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '15px',
              marginBottom: '20px',
            }}>
              {/* Age */}
              <div>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#333',
                  marginBottom: '8px',
                }}>
                  <span style={{ marginRight: '8px', fontSize: '18px' }}>🎂</span>
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={customerData.age}
                  onChange={handleChange}
                  placeholder="Age"
                  required
                  min="1"
                  max="120"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '14px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    opacity: isSubmitting ? 0.6 : 1,
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
              </div>

              {/* Gender */}
              <div>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#333',
                  marginBottom: '8px',
                }}>
                  <span style={{ marginRight: '8px', fontSize: '18px' }}>⚧️</span>
                  Gender
                </label>
                <select
                  name="gender"
                  value={customerData.gender}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '14px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    backgroundColor: 'white',
                    opacity: isSubmitting ? 0.6 : 1,
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '16px',
                fontWeight: '600',
                border: 'none',
                borderRadius: '8px',
                background: isSubmitting
                  ? 'linear-gradient(135deg, #a0a0a0, #808080)'
                  : 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '10px',
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.5)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
                }
              }}
            >
              {isSubmitting ? (
                <>
                  <span style={{
                    display: 'inline-block',
                    width: '16px',
                    height: '16px',
                    border: '2px solid white',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite',
                  }}></span>
                  Updating...
                </>
              ) : (
                <>
                  ✓ Update Profile
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}

export default UpdateCustomer;