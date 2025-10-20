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
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('username', EmpID);
          //navigate('/EmployeeProfile'); // Redirect to the EmployeeProfile
          navigate('/EmployeeProfile', { state: { empID: EmpID } }); // Redirect to the EmployeeProfile with the ID
          window.location.reload();
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
    <section
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: 'calc(100vh - 120px)',
        background: 'linear-gradient(135deg, #6dd5ed 0%, #2193b0 100%)',
        padding: '20px'
      }}
    >
      <div className="card shadow-lg p-4" style={{ maxWidth: 420, width: '100%', borderRadius: 16 }}>
        <h3 className="text-center mb-4" style={{ color: '#2193b0', fontWeight: 700 }}>Employee Login</h3>
        {error && (
          <div className="alert alert-danger py-2 mb-3 text-center" role="alert" style={{ fontSize: 15 }}>{error}</div>
        )}
        <form onSubmit={handleLogin} autoComplete="off">
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: 500 }}>EmpID</label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter your EmpID (e.g., 1001)"
              value={empID}
              onChange={(e) => setEmpID(e.target.value)}
              required
              style={{ borderRadius: 10 }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: 500 }}>PassKey</label>
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Enter your 4-digit PassKey"
              value={empPassKey}
              onChange={(e) => setEmpPassKey(e.target.value)}
              required
              style={{ borderRadius: 10 }}
            />
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
};

export default EmpLogin;
