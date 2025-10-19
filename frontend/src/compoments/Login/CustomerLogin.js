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
        navigate('/CustomerProfileOne');
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
      <div className="card shadow-lg p-3" style={{ maxWidth: 340, width: '100%', borderRadius: 14, background: 'rgba(255,255,255,0.97)' }}>
        <h4 className="text-center mb-3" style={{ fontWeight: 700, letterSpacing: 1, color: '#2193b0' }}>Welcome back</h4>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-2">
            <label className="form-label" style={{ fontWeight: 500, fontSize: 14 }}>Username</label>
            <input type="text" className="form-control" placeholder="Enter your username" value={username} onChange={e => setUsername(e.target.value)} required style={{ borderRadius: 8, fontSize: 14, padding: '7px 10px' }} />
          </div>
          <div className="mb-2">
            <label className="form-label" style={{ fontWeight: 500, fontSize: 14 }}>Password</label>
            <input type="password" className="form-control" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} required style={{ borderRadius: 8, fontSize: 14, padding: '7px 10px' }} />
          </div>
          {error && <div className="alert alert-danger py-2 mb-2 text-center" style={{ fontSize: 13 }}>{error}</div>}
          <button type="submit" className="btn w-100" disabled={loading} style={{
            fontWeight: 600,
            fontSize: 15,
            background: 'linear-gradient(90deg, #2193b0 0%, #6dd5ed 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            boxShadow: '0 2px 8px rgba(33,147,176,0.10)',
            transition: 'background 0.3s',
            padding: '8px 0'
          }}>
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>
        <div className="text-center mt-2">
          <span style={{ color: '#2193b0', fontSize: 13 }}>New here? <a href="/Regi" className="text-decoration-none" style={{ color: '#6dd5ed', fontWeight: 600 }}>Create an account</a></span>
        </div>
      </div>
    </div>
  );
};

export default CustomerLogin;
