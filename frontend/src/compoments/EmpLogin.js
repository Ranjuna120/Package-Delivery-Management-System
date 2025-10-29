import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmpLogin = () => {
  const [empID, setEmpID] = useState('');
  const [empPassKey, setEmpPassKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8070/api/employees/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ empID, empPassKey }),
      });

      const data = await response.json();

      if (data.success) {
        // Store employee info in localStorage
        localStorage.setItem('employeeLoggedIn', 'true');
        localStorage.setItem('empID', data.employee.EmpID);
        localStorage.setItem('empName', data.employee.EmpName);
        localStorage.setItem('empFullName', data.employee.EmpFullName);
        localStorage.setItem('empPosition', data.employee.EmpPosition);
        localStorage.setItem('empWage', data.employee.EmpWage);
        localStorage.setItem('employeeId', data.employee._id);

        // Navigate to employee profile
        navigate('/EmployeeProfile', { 
          state: { 
            empID: data.employee.EmpID,
            empName: data.employee.EmpName,
            empFullName: data.employee.EmpFullName,
            empPosition: data.employee.EmpPosition
          } 
        });
        window.location.reload();
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Unable to connect to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        body {
          background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%) !important;
          min-height: 100vh !important;
          margin: 0 !important;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          padding: '40px',
          maxWidth: '420px',
          width: '100%',
        }}>
          {/* Icon and Title */}
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{
              width: '70px',
              height: '70px',
              margin: '0 auto 15px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #11998e, #38ef7d)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '35px',
              boxShadow: '0 4px 12px rgba(17, 153, 142, 0.3)',
            }}>
              👔
            </div>
            <h2 style={{
              color: '#11998e',
              fontSize: '26px',
              fontWeight: '700',
              margin: '0 0 5px 0',
            }}>
              Employee Login
            </h2>
            <p style={{
              color: '#6c757d',
              fontSize: '13px',
              margin: 0,
            }}>
              Enter your credentials to access your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin}>
            {/* Employee ID */}
            <div style={{ marginBottom: '18px' }}>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: '600',
                color: '#333',
                marginBottom: '6px',
              }}>🆔 Employee ID</label>
              <input
                type="text"
                value={empID}
                onChange={(e) => setEmpID(e.target.value)}
                placeholder="Enter your Employee ID"
                required
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  fontSize: '14px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                }}
                onFocus={(e) => e.target.style.borderColor = '#11998e'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>

            {/* PassKey */}
            <div style={{ marginBottom: '18px' }}>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: '600',
                color: '#333',
                marginBottom: '6px',
              }}>🔑 PassKey</label>
              <input
                type="password"
                value={empPassKey}
                onChange={(e) => setEmpPassKey(e.target.value)}
                placeholder="Enter your PassKey"
                required
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  fontSize: '14px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                }}
                onFocus={(e) => e.target.style.borderColor = '#11998e'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div style={{
                padding: '10px',
                backgroundColor: '#fee',
                border: '1px solid #fcc',
                borderRadius: '8px',
                color: '#c33',
                fontSize: '13px',
                marginBottom: '18px',
                textAlign: 'center',
              }}>
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '13px',
                fontSize: '15px',
                fontWeight: '600',
                border: 'none',
                borderRadius: '8px',
                background: loading
                  ? 'linear-gradient(135deg, #a0a0a0, #808080)'
                  : 'linear-gradient(135deg, #11998e, #38ef7d)',
                color: 'white',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(17, 153, 142, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 16px rgba(17, 153, 142, 0.5)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 12px rgba(17, 153, 142, 0.4)';
                }
              }}
            >
              {loading ? (
                <>
                  <span style={{
                    display: 'inline-block',
                    width: '14px',
                    height: '14px',
                    border: '2px solid white',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite',
                  }}></span>
                  Signing in...
                </>
              ) : (
                <>✓ Sign In</>
              )}
            </button>
          </form>

          {/* Help Text */}
          <div style={{
            textAlign: 'center',
            marginTop: '22px',
            fontSize: '13px',
            color: '#6c757d',
          }}>
            Contact your administrator if you need assistance
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default EmpLogin;
