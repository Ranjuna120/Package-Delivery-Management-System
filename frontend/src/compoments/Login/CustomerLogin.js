import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const CustomerLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8070/api/customers/login', { username, password });
      if (response.data.success) {
        // No need to save a token anymore
        navigate("/CustomerProfileOne"); // Redirect to profile page
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Login failed', error);
      alert('Login failed');
    }
  };

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
        padding: '40px', // Increased padding for more space inside the form
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '450px', // Increased width for a bigger form
        textAlign: 'center',
        margin: '0 auto' // Center the form horizontally
      }}>

        <h1 style={{ marginBottom: '20px' }}>Login</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              padding: '10px',
              marginBottom: '15px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              width: '100%'
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: '10px',
              marginBottom: '15px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              width: '100%'
            }}
          />
          <button type="submit" style={{
            padding: '10px 0',
            backgroundColor: '#2a9df4',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '200px', // Set the desired width here
          display: 'block',
          margin: '20px auto'
          }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerLogin;
