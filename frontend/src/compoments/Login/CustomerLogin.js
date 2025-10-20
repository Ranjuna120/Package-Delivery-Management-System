import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const CustomerLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:8070/api/customers/login', { username, password });
      if (response.data.success) {
        // Get customer name from response
        const customerName = response.data.customer?.name || username;
        const customerId = response.data.customer?._id;
        const loginTime = new Date().toLocaleString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit' 
        });
        
        // Set login status in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        localStorage.setItem('customerName', customerName);
        localStorage.setItem('customerId', customerId);
        localStorage.setItem('lastLogin', loginTime);
        
        navigate('/CustomerProfileOne');
        // Reload to update header
        window.location.reload();
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      console.error('Login failed', err);
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #6dd5ed 0%, #2193b0 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div className="card shadow-lg p-4" style={{ maxWidth: 460, width: '100%', borderRadius: 16, background: 'rgba(255,255,255,0.98)' }}>
        <h3 className="text-center mb-4" style={{ fontWeight: 700, letterSpacing: 0.5, color: '#2193b0' }}>Welcome back</h3>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: 500, fontSize: 15 }}>Username</label>
            <input type="text" className="form-control form-control-lg" placeholder="Enter your username" value={username} onChange={e => setUsername(e.target.value)} required style={{ borderRadius: 10 }} />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: 500, fontSize: 15 }}>Password</label>
            <input type="password" className="form-control form-control-lg" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} required style={{ borderRadius: 10 }} />
          </div>
          {error && <div className="alert alert-danger py-2 mb-3 text-center" style={{ fontSize: 14 }}>{error}</div>}
          <button type="submit" className="btn w-100" disabled={loading} style={{
            fontWeight: 600,
            fontSize: 17,
            background: 'linear-gradient(90deg, #2193b0 0%, #6dd5ed 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            boxShadow: '0 2px 10px rgba(33,147,176,0.15)',
            transition: 'background 0.3s',
            padding: '10px 0'
          }}>
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>
        <div className="text-center mt-3">
          <span style={{ color: '#2193b0', fontSize: 14 }}>New here? <a href="/Regi" className="text-decoration-none" style={{ color: '#6dd5ed', fontWeight: 600 }}>Create an account</a></span>
        </div>
      </div>
    </div>
  );
};

export default CustomerLogin;
