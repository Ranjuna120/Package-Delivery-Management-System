import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const [orderId, setOrderId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = async () => {
    if (orderId.trim()) {
      setIsSearching(true);
      setErrorMessage('');
      
      try {
        const response = await fetch(`/api/orders/${orderId}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          setErrorMessage(errorData.error || 'Order not found. Please check your Order ID.');
          setIsSearching(false);
          return;
        }

        const orderData = await response.json();
        navigate(`/OrderDashBoardPage/orderTracks/${orderId}`, { state: { orderData } });
      } catch (error) {
        console.error('Error fetching order:', error);
        setErrorMessage('Invalid Order ID. Please try again.');
        setIsSearching(false);
      }
    } else {
      setErrorMessage('Please enter a valid Order ID');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleNavigate();
    }
  };

  return (
    <>
      <style>
        {`
          body {
            background: linear-gradient(135deg, #f5f7fa 0%, #e3e9f0 100%) !important;
            min-height: 100vh !important;
            margin: 0 !important;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
          }
        `}
      </style>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px',
        marginLeft: '50px',
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
          padding: '40px',
          maxWidth: '500px',
          width: '100%',
        }}>
          {/* Icon Section */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '20px',
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #17a2b8, #20c997)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px',
              boxShadow: '0 4px 12px rgba(23, 162, 184, 0.3)',
            }}>
              🔍
            </div>
          </div>

          {/* Title Section */}
          <h2 style={{
            textAlign: 'center',
            color: '#17a2b8',
            fontSize: '28px',
            fontWeight: '700',
            marginBottom: '8px',
          }}>
            Find Your Order
          </h2>
          
          <p style={{
            textAlign: 'center',
            color: '#6c757d',
            fontSize: '14px',
            marginBottom: '30px',
          }}>
            Enter your order ID to track your package
          </p>

          {/* Error Message */}
          {errorMessage && (
            <div style={{
              padding: '12px 16px',
              backgroundColor: '#fee',
              border: '1px solid #fcc',
              borderRadius: '8px',
              color: '#c33',
              fontSize: '14px',
              marginBottom: '20px',
              textAlign: 'center',
            }}>
              {errorMessage}
            </div>
          )}

          {/* Order ID Input */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '15px',
              fontWeight: '600',
              color: '#333',
              marginBottom: '8px',
            }}>
              <span style={{ marginRight: '8px', fontSize: '18px' }}>📦</span>
              Order ID
            </label>
            <input
              type="text"
              value={orderId}
              onChange={(e) => {
                setOrderId(e.target.value);
                setErrorMessage('');
              }}
              onKeyPress={handleKeyPress}
              placeholder="Enter your order ID (e.g., ORD12345)"
              style={{
                width: '100%',
                padding: '14px 16px',
                fontSize: '15px',
                border: errorMessage ? '2px solid #c33' : '2px solid #e0e0e0',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                outline: 'none',
              }}
              onFocus={(e) => {
                if (!errorMessage) e.target.style.borderColor = '#17a2b8';
              }}
              onBlur={(e) => {
                if (!errorMessage) e.target.style.borderColor = '#e0e0e0';
              }}
            />
            <small style={{
              display: 'block',
              marginTop: '6px',
              color: '#6c757d',
              fontSize: '13px',
            }}>
              You can find your order ID in your confirmation email
            </small>
          </div>

          {/* Search Button */}
          <button
            onClick={handleNavigate}
            disabled={isSearching}
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '16px',
              fontWeight: '600',
              border: 'none',
              borderRadius: '8px',
              background: isSearching 
                ? 'linear-gradient(135deg, #a0a0a0, #808080)' 
                : 'linear-gradient(135deg, #17a2b8, #20c997)',
              color: 'white',
              cursor: isSearching ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(23, 162, 184, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={(e) => {
              if (!isSearching) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 16px rgba(23, 162, 184, 0.5)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isSearching) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(23, 162, 184, 0.4)';
              }
            }}
          >
            {isSearching ? (
              <>
                <span style={{
                  display: 'inline-block',
                  width: '16px',
                  height: '16px',
                  border: '2px solid white',
                  borderTopColor: 'transparent',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                  marginRight: '8px',
                }}>
                </span>
                Searching...
              </>
            ) : (
              <>
                🔍 Find My Order
              </>
            )}
          </button>

          {/* Help Text */}
          <div style={{
            marginTop: '20px',
            padding: '12px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            borderLeft: '4px solid #17a2b8',
          }}>
            <p style={{
              margin: 0,
              fontSize: '13px',
              color: '#495057',
              lineHeight: '1.6',
            }}>
              💡 <strong>Tip:</strong> If you're having trouble finding your order, please contact our support team.
            </p>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </>
  );
}

export default App;