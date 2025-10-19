import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin({ onLogin, userType }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Dummy logic - Replace with backend logic if needed
    const StoredRole = "General"; // Example stored role, replace with real logic

    if (username && password) {
      if (role === "Stock") {
        if (StoredRole === "Stock" || StoredRole === "General") {
          navigate('/StockDashBoardPage'); // Redirect
        } else {
          alert("Access denied. Incorrect role.");
        }
      } else if (role === "Deputy") {
        // Validation for Deputy Manager login
        if (username === 'admin' && password === 'admin') {
          if (StoredRole === "Deputy" || StoredRole === "General") {
            navigate('/DMChoose'); // Redirect
          } else {
            alert("Access denied. Incorrect role.");
          }
        } else {
          alert("Invalid username or password for Deputy Manager.");
        }
      } else if (role === "Plant") {
        if (StoredRole === "Plant" || StoredRole === "General") {
          navigate('/PMChoose'); // Redirect
        } else {
          alert("Access denied. Incorrect role.");
        }
      } else if (role === "General") {
        navigate('/GMChoose'); // Redirect
      } else {
        alert("Invalid role selected.");
      }
    } else {
      alert("Please enter both username and password.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>{userType} Login Page</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <div style={styles.inputContainer}>
          <label style={styles.label}>Username:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
            style={styles.input}
          />
        </div>
        <div style={styles.inputContainer}>
          <label style={styles.label}>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={styles.input}
          />
        </div>
        <div style={styles.inputContainer}>
          <label style={styles.label}>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} required style={styles.input}>
            <option value="">Select Role</option>
            <option value="Stock">Stock</option>
            <option value="Deputy">Deputy</option>
            <option value="Plant">Plant</option>
            <option value="General">General</option>
          </select>
        </div>
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  heading: {
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
  form: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
    width: '300px',
  },
  inputContainer: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '14px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  buttonHover: {
    backgroundColor: '#218838',
  },
};

export default AdminLogin;
