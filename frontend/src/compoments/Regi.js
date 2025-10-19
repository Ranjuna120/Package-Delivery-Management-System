import React, { useState } from 'react';
import axios from 'axios';

function Regi() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8070/api/customers/register', {
        name, email, address, age, gender, username, password
      });
      alert('Registration successful!');
      window.location.href = "/CustomerLogin"; // Redirect to login after registration
    } catch (error) {
      console.error('Registration failed', error);
      alert('Registration failed: ' + error.response.data.error);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '90vh', 
      backgroundColor: '#f9f9f9' 
    }}>
      <h1 style={{ marginBottom: '20px' }}>Register</h1>
      <form onSubmit={handleSubmit} style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        width: '450px', 
        padding: '20px', 
        backgroundColor: '#fff', 
        borderRadius: '8px', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' 
      }}>
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
          style={{
            padding: '10px',
            marginBottom: '15px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          style={{
            padding: '10px',
            marginBottom: '15px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
        <input 
          type="text" 
          placeholder="Address" 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
          required 
          style={{
            padding: '10px',
            marginBottom: '15px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
        <input 
          type="number" 
          placeholder="Age" 
          value={age} 
          onChange={(e) => setAge(e.target.value)} 
          required 
          style={{
            padding: '10px',
            marginBottom: '15px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
        <select 
          value={gender} 
          onChange={(e) => setGender(e.target.value)} 
          required 
          style={{
            padding: '10px',
            marginBottom: '15px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
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
            border: '1px solid #ccc'
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
            border: '1px solid #ccc'
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
          Register
        </button>
      </form>
    </div>
  );
}

export default Regi;
