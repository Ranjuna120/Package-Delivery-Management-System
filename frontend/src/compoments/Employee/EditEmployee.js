import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditEmployee() {
  const navigate = useNavigate();
  const { empId } = useParams(); // Get EmpID from URL parameters
  const [employee, setEmployee] = useState({/* initial state */});
   

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:8070/api/employees/${empId}`);
        if (response.ok) {
          const data = await response.json();
          setEmployee(data);
        } else {
          console.error('Failed to fetch employee:', response.status);
        }
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    };

    fetchEmployee();
  }, [empId]);


  const handleChange = (e) => {
    const { id, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8070/api/employees/${employee.EmpID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
      });

      if (response.ok) {
        alert('Employee updated successfully');
        navigate('/EmployeeDashBoardPage'); // Navigate back after success
      } else {
        const errorText = await response.text();
        alert('Failed to update employee: ' + errorText);
      }
    } catch (error) {
      console.error('Error updating employee:', error);
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
        <h1>Edit Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="EmpID">Employee ID:</label>
            <input type="text" id="EmpID" value={employee.EmpID} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="EmpName">Emp Name:</label>
            <input type="text" id="EmpName" value={employee.EmpName} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="EmpFullName">Full Name:</label>
            <input type="text" id="EmpFullName" value={employee.EmpFullName} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="EmpAddress">Address:</label>
            <input type="text" id="EmpAddress" value={employee.EmpAddress} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="EmpQualifications">Qualifications:</label>
            <input type="text" id="EmpQualifications" value={employee.EmpQualifications} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="EmpExperience">Experience:</label>
            <input type="text" id="EmpExperience" value={employee.EmpExperience} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="EmpPosition">Position:</label>
            <input type="text" id="EmpPosition" value={employee.EmpPosition} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="EmpWage">Salary/Wage:</label>
            <input type="text" id="EmpWage" value={employee.EmpWage} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="EmpJoin">Join Date:</label>
            <input type="text" id="EmpJoin" value={employee.EmpJoin} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="EmpPassKey">PassKey:</label>
            <input type="text" id="EmpPassKey" value={employee.EmpPassKey} onChange={handleChange} />
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

export default EditEmployee;
