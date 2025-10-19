import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmpLogin = () => {
  const [empID, setEmpID] = useState('');
  const [empPassKey, setEmpPassKey] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    // Store values in local variables
    const EmpID = empID;
    const EmpPassKey = empPassKey;
  
    try {
      const response = await fetch(`http://localhost:8070/api/employees/${EmpID}`); // Adjust the URL as needed
  
      // Check if the response is okay
      if (response.ok) {
        const employeeData = await response.json();
  
        // Check if the pass key matches
        if (Number(employeeData.EmpPassKey) === Number(EmpPassKey)) {
          // Successful login
          //navigate('/EmployeeProfile'); // Redirect to the EmployeeProfile
          navigate('/EmployeeProfile', { state: { empID: EmpID } }); // Redirect to the EmployeeProfile with the ID
        } else {
          // Handle login error
          //setError('Invalid EmpID or PassKey');
        }
      } else {
        console.error('Failed to fetch employee:', response.status);
        setError('Employee not found');
      }
    } catch (error) {
      console.error('Error fetching employee:', error);
      setError('Error fetching employee information');
    }
  };
  
  

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
      <div className="EmpLoginBox">
        <h2 style={{ textAlign: 'center' }}>Employee Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>EmpID:</label>
            <input
              type="text"
              value={empID}
              onChange={(e) => setEmpID(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', margin: '10px 0' }}
            />
          </div>
          <div>
            <label>PassKey:</label>
            <input
              type="password"
              value={empPassKey}
              onChange={(e) => setEmpPassKey(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', margin: '10px 0' }}
            />
          </div>
          {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}
          <button type="submit" style={{ width: '100%', padding: '10px', marginTop: '16px', fontSize: '16px', borderRadius: '15px' }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmpLogin;
