import React, { useState, useEffect } from 'react';  
import { useNavigate, useParams } from 'react-router-dom';  
import axios from 'axios';  

function UpdateCustomer() {
  const [customerData, setCustomerData] = useState({
    username: '',
    name: '',
    email: '',
    address: '',
    age: '',
    gender: ''
    
  });

  const navigate = useNavigate();
  const { id } = useParams(); // Getting the customer ID from the URL parameters

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/api/customers/${id}`);
        setCustomerData(response.data);
      } catch (error) {
        console.error('Error fetching customer data:', error);
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
    try {
      await axios.put(`http://localhost:8070/api/customers/${id}`, customerData);
      alert('Customer updated successfully!');
      navigate('/AdminChoose/DMChoose/CustomerDashBoardPage/Cusdetails'); // Redirect after successful update
    } catch (error) {
      console.error('Error updating customer:', error);
      alert('Failed to update customer');
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh', 
      backgroundColor: '#f4f4f4', 
      padding: '20px' 
    }}>
      <h1 style={{ marginBottom: '20px' }}>Update Customer</h1>
      <form onSubmit={handleSubmit} style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        width: '400px', 
        padding: '20px', 
        backgroundColor: '#fff', 
        borderRadius: '8px', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' 
      }}>
          <input 
          type="text" 
          name="username" 
          placeholder="Username" 
          value={customerData.username} 
          onChange={handleChange} 
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
          name="name" 
          placeholder="Name" 
          value={customerData.name} 
          onChange={handleChange} 
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
          name="email" 
          placeholder="Email" 
          value={customerData.email} 
          onChange={handleChange} 
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
          name="address" 
          placeholder="Address" 
          value={customerData.address} 
          onChange={handleChange} 
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
          name="age" 
          placeholder="Age" 
          value={customerData.age} 
          onChange={handleChange} 
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
          name="gender" 
          placeholder="Gender" 
          value={customerData.gender} 
          onChange={handleChange} 
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
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdateCustomer;
