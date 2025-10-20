import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function AdminLogin({ onLogin, userType }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    const StoredRole = "General";
    if (username && password) {
      if (role === "Stock") {
        if (StoredRole === "Stock" || StoredRole === "General") {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('username', username);
          navigate('/StockDashBoardPage');
          window.location.reload();
        } else {
          setError("Access denied. Incorrect role.");
        }
      } else if (role === "Deputy") {
        if (username === 'admin' && password === 'admin') {
          if (StoredRole === "Deputy" || StoredRole === "General") {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', username);
            navigate('/DMChoose');
            window.location.reload();
          } else {
            setError("Access denied. Incorrect role.");
          }
        } else {
          setError("Invalid username or password for Deputy Manager.");
        }
      } else if (role === "Plant") {
        if (StoredRole === "Plant" || StoredRole === "General") {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('username', username);
          navigate('/PMChoose');
          window.location.reload();
        } else {
          setError("Access denied. Incorrect role.");
        }
      } else if (role === "General") {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        navigate('/GMChoose');
        window.location.reload();
      } else {
        setError("Invalid role selected.");
      }
    } else {
      setError("Please enter both username and password.");
    }
  };

  return (
    <section
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #6dd5ed 0%, #2193b0 100%)',
        padding: '20px'
      }}
    >
      <div className="card shadow-lg p-4" style={{ maxWidth: 420, width: '100%', borderRadius: 16 }}>
        <h3 className="text-center mb-4" style={{ color: '#2193b0', fontWeight: 700 }}>{userType} Login</h3>
        {error && (
          <div className="alert alert-danger py-2 mb-3 text-center" role="alert" style={{ fontSize: 15 }}>{error}</div>
        )}
        <form onSubmit={handleLogin} autoComplete="off">
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: 500 }}>Username</label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ borderRadius: 10 }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: 500 }}>Password</label>
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ borderRadius: 10 }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: 500 }}>Role</label>
            <select
              className="form-select form-select-lg"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              style={{ borderRadius: 10 }}
            >
              <option value="">Select Role</option>
              <option value="Stock">Stock</option>
              <option value="Deputy">Deputy</option>
              <option value="Plant">Plant</option>
              <option value="General">General</option>
            </select>
          </div>
          <button
            type="submit"
            className="btn w-100"
            style={{
              fontWeight: 600,
              fontSize: 17,
              background: 'linear-gradient(90deg, #2193b0 0%, #6dd5ed 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 10,
              boxShadow: '0 2px 10px rgba(33,147,176,0.15)',
              transition: 'background 0.3s',
              padding: '10px 0'
            }}
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
}

export default AdminLogin;
