import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddEmployee() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    EmpID: '',
    EmpName: '',
    EmpFullName: '',
    EmpAddress: '',
    EmpQualifications: '',
    EmpExperience: '',
    EmpPosition: '',
    EmpWage: '',
    EmpJoin: '',
    EmpPassKey: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const validate = () => {
    const newErrors = {};

    // Validate EmpID (4-digit number)
    if (!/^\d{4}$/.test(formData.EmpID)) {
      newErrors.EmpID = 'Employee ID must be a 4-digit number';
    }

    // Validate EmpPosition (no numbers allowed)
    if (/\d/.test(formData.EmpPosition)) {
      newErrors.EmpPosition = 'Position cannot contain numbers';
    }

    // Validate EmpPassKey (4-digit number)
    if (!/^\d{4}$/.test(formData.EmpPassKey)) {
      newErrors.EmpPassKey = 'PassKey must be a 4-digit number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Run validation
    if (!validate()) {
      return;
    }

    try {
      const response = await fetch('http://localhost:8070/api/addEmployee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert('Employee added successfully');
        navigate('/EmployeeDashBoardPage');
      } else {
        alert('Failed to add employee');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding employee');
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

          .error {
            color: red;
            font-size: 14px;
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
            background-color: #007bff;
            color: white;
          }

          .button:hover {
            background-color: #0056b3;
          }
        `}
      </style>

      <div className="container">
        <h1>Add Employee</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="EmpID">Employee ID:</label>
            <input
              type="number"
              id="EmpID"
              value={formData.EmpID}
              onChange={handleChange}
            />
            {errors.EmpID && <div className="error">{errors.EmpID}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="EmpName">Emp Name:</label>
            <input
              type="text"
              id="EmpName"
              value={formData.EmpName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="EmpFullName">Full Name:</label>
            <input
              type="text"
              id="EmpFullName"
              value={formData.EmpFullName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="EmpAddress">Address:</label>
            <input
              type="text"
              id="EmpAddress"
              value={formData.EmpAddress}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="EmpQualifications">Qualifications:</label>
            <input
              type="text"
              id="EmpQualifications"
              value={formData.EmpQualifications}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="EmpExperience">Experience:</label>
            <input
              type="text"
              id="EmpExperience"
              value={formData.EmpExperience}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="EmpPosition">Position:</label>
            <input
              type="text"
              id="EmpPosition"
              value={formData.EmpPosition}
              onChange={handleChange}
            />
            {errors.EmpPosition && (
              <div className="error">{errors.EmpPosition}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="EmpWage">Salary/Wage:</label>
            <input
              type="number"
              id="EmpWage"
              value={formData.EmpWage}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="EmpJoin">Join Date:</label>
            <input
              type="date"
              id="EmpJoin"
              value={formData.EmpJoin}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="EmpPassKey">PassKey:</label>
            <input
              type="number"
              id="EmpPassKey"
              value={formData.EmpPassKey}
              onChange={handleChange}
            />
            {errors.EmpPassKey && (
              <div className="error">{errors.EmpPassKey}</div>
            )}
          </div>

          <div className="button-container">
            <button
              className="button"
              type="button"
              onClick={() => navigate('/EmployeeDashBoardPage')}
            >
              Go Back
            </button>
            <button className="button" type="submit">
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEmployee;
