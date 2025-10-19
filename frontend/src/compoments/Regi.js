import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
function Regi() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post('http://localhost:8070/api/customers/register', {
        name, email, address, age, gender, username, password
      });
      setLoading(false);
      alert('Registration successful!');
      window.location.href = "/CustomerLogin";
    } catch (err) {
      setLoading(false);
      setError(err?.response?.data?.error || 'Registration failed');
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
      <div className="card shadow-lg p-4" style={{ maxWidth: 420, width: '100%', borderRadius: 18, background: 'rgba(255,255,255,0.97)' }}>
        <h2 className="text-center mb-4" style={{ fontWeight: 700, letterSpacing: 1, color: '#2193b0' }}>Create Your Account</h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: 500 }}>Full Name</label>
            <input type="text" className="form-control form-control-lg" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required style={{ borderRadius: 10 }} />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: 500 }}>Email</label>
            <input type="email" className="form-control form-control-lg" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{ borderRadius: 10 }} />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: 500 }}>Address</label>
            <input type="text" className="form-control form-control-lg" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} required style={{ borderRadius: 10 }} />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: 500 }}>Age</label>
            <input type="number" className="form-control form-control-lg" placeholder="Age" value={age} onChange={e => setAge(e.target.value)} required min={1} style={{ borderRadius: 10 }} />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: 500 }}>Gender</label>
            <select className="form-select form-select-lg" value={gender} onChange={e => setGender(e.target.value)} required style={{ borderRadius: 10 }}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: 500 }}>Username</label>
            <input type="text" className="form-control form-control-lg" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required style={{ borderRadius: 10 }} />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: 500 }}>Password</label>
            <input type="password" className="form-control form-control-lg" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} style={{ borderRadius: 10 }} />
          </div>
          {error && <div className="alert alert-danger py-2 mb-2 text-center">{error}</div>}
          <button type="submit" className="btn w-100" disabled={loading} style={{
            fontWeight: 600,
            fontSize: 18,
            background: 'linear-gradient(90deg, #2193b0 0%, #6dd5ed 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            boxShadow: '0 2px 8px rgba(33,147,176,0.15)',
            transition: 'background 0.3s'
          }}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <div className="text-center mt-3">
          <span style={{ color: '#2193b0' }}>Already have an account? <a href="/CustomerLogin" className="text-decoration-none" style={{ color: '#6dd5ed', fontWeight: 600 }}>Login</a></span>
        </div>
      </div>
    </div>
  );
}

export default Regi;
