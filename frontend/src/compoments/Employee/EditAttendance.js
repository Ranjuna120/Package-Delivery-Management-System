import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function EditAttendance() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Parse query parameters from the URL
  const query = new URLSearchParams(location.search);

  const [attendance, setAttendance] = useState({
    AttID: '',
    EmpID: '',
    EmpName: '',
    WorkDate: '',
    WorkHours: '',
    OTHours: '',
  });

  // Set state from URL query parameters when the component mounts
  useEffect(() => {
    const attID = query.get('AttID');
    const empID = query.get('EmpID');
    const empName = query.get('EmpName');
    const workDate = query.get('WorkDate');
    const workHours = query.get('WorkHours');
    const otHours = query.get('OTHours');

    // Log values for debugging
    console.log('Query Parameters:', { attID, empID, empName, workDate, workHours, otHours });

    setAttendance({
      AttID: attID || '',
      EmpID: empID || '',
      EmpName: empName || '',
      WorkDate: workDate || '',
      WorkHours: workHours || '',
      OTHours: otHours || '',
    });
  }, [location.search]); // Re-run effect if query parameters change

  const handleChange = (e) => {
    const { id, value } = e.target;
    setAttendance((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Format WorkDate as needed (e.g., YYYY-MM-DD)
    const formattedWorkDate = new Date(attendance.WorkDate).toISOString().split('T')[0];
    
    try {
      const response = await fetch(`http://localhost:8070/api/attendance/${attendance.EmpID}/${formattedWorkDate}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(attendance),
      });
  
      if (response.ok) {
        alert('Attendance updated successfully');
        navigate('/EmployeeDashBoardPage'); // Navigate back after success
      } else {
        const errorText = await response.text();
        alert('successfuly updated');
        navigate('/EmployeeDashBoardPage');
      }
    } catch (error) {
      console.error('Error updating attendance:', error);
    }
  };
  

  return (
    <div>
      <style>
        {`
          .container {
            padding: 20px;
            border-radius: 8px;
            max-width: 800px;
            width: 100%;
            background-color: white;
            margin: 0 auto;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }

          h1 {
            text-align: center;
            margin-bottom: 20px;
            font-size: 24px;
          }

          .form-group {
            margin-bottom: 15px;
            display: flex;
            justify-content: space-between;
          }

          .form-group label {
            flex: 1;
            font-weight: bold;
          }

          .form-group input {
            flex: 2;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
          }

          .button-container {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
          }

          .button {
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            cursor: pointer;
            background-color: #007bff; /* Blue color */
            color: white;
          }

          .button:hover {
            background-color: #0056b3;
          }
        `}
      </style>

      <div className="container">
        <h1>Edit Attendance</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="AttID">Attendance ID:</label>
            <input type="text" id="AttID" value={attendance.AttID} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="EmpID">Employee ID:</label>
            <input type="text" id="EmpID" value={attendance.EmpID} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="EmpName">Employee Name:</label>
            <input type="text" id="EmpName" value={attendance.EmpName} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="WorkDate">Work Date:</label>
            <input type="date" id="WorkDate" value={attendance.WorkDate.split('T')[0]} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="WorkHours">Work Hours:</label>
            <input type="number" id="WorkHours" value={attendance.WorkHours} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="OTHours">Overtime Hours:</label>
            <input type="number" id="OTHours" value={attendance.OTHours || ''} onChange={handleChange} />
          </div>
          <div className="button-container">
            <button className="button" type="button" onClick={() => navigate('/EmployeeDashBoardPage')}>Go Back</button>
            <button className="button" type="submit">Submit Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditAttendance;
