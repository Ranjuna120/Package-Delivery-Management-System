import React from 'react';

const CusProfile = () => {
  const customer = {
    fullName: '',
    email: '',
    address: '',
    age: '',
    gender: '',
    username: ';',
    profilePhoto: 'https://cdn-icons-png.flaticon.com/512/847/847969.png', // Profile icon
  };

  const handleUpdate = () => {
    alert('Update button clicked!');
  };

  const handleCancel = () => {
    alert('Cancel button clicked!');
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
        padding: '20px', 
        borderRadius: '8px', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
        width: '350px', 
        textAlign: 'center' 
      }}>
        <img 
          src={customer.profilePhoto} 
          alt="Profile" 
          style={{ 
            width: '150px', 
            height: '150px', 
            borderRadius: '50%', 
            marginBottom: '20px' 
          }} 
        />
        <h2 style={{ color: '#333' }}>Customer Profile</h2>
        <div style={{ textAlign: 'left', margin: '20px 0' }}>
          <p><strong>Full Name:</strong> {customer.fullName}</p>
          <p><strong>Email:</strong> {customer.email}</p>
          <p><strong>Address:</strong> {customer.address}</p>
          <p><strong>Age:</strong> {customer.age}</p>
          <p><strong>Gender:</strong> {customer.gender}</p>
          <p><strong>Username:</strong> {customer.username}</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <button 
            onClick={handleUpdate} 
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#4CAF50', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}
          >
            Update
          </button>
          <button 
            onClick={handleCancel} 
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#f44336', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default CusProfile;
