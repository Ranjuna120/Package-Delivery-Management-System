import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddAttendance = ({ empID }) => {
  const navigate = useNavigate();
  const [empName, setEmpName] = useState('');
  const [empWage, setEmpWage] = useState('');  // Added state for wage
  const [workHours, setWorkHours] = useState('');
  const [otHours, setOTHours] = useState('');
  const [error, setError] = useState('');
  const todayDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch(`http://localhost:8070/api/employees/${empID}`);
        if (response.ok) {
          const data = await response.json();
          setEmpName(data.EmpName);
          setEmpWage(data.EmpWage);  // Set the wage from the fetched data
        } else {
          setError('Failed to fetch employee');
        }
      } catch (error) {
        setError('Error fetching employee: ' + error.message);
      }
    };

    if (empID) {
      fetchEmployeeData();
    }
  }, [empID]);

  const validateInput = () => {
    // Check if work hours is a valid number and within range
    if (isNaN(workHours) || workHours < 0 || workHours > 8) {
      alert('Work hours must be a numeric value between 0 and 8.');
      return false;
    }

    // Check if OT hours is a valid number and within range
    if (isNaN(otHours) || otHours < 0 || otHours > 4) {
      alert('OT hours must be a numeric value between 0 and 4.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs before submitting
    if (!validateInput()) {
      return; // Stop form submission if validation fails
    }

    const newAttendance = {
      EmpID: empID,
      EmpName: empName,
      WorkDate: todayDate,
      WorkHours: Number(workHours),
      OTHours: Number(otHours),
      EmpWage: empWage,  // Include wage in the new attendance object
    };

    try {
      const response = await fetch('http://localhost:8070/api/AddAttendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAttendance),
      });
      if (response.ok) {
        alert('Attendance added successfully!');
        navigate('/');
        setWorkHours('');
        setOTHours('');
      } else {
        setError('Failed to add attendance.');
      }
    } catch (error) {
      setError('Error adding attendance: ' + error.message);
    }
  };

  return (
    <>
      <style>{`
        .attendanceCard {
          background: white;
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          padding: 30px;
          max-width: 600px;
          width: 100%;
        }
        .attendanceTitle {
          text-align: center;
          color: #11998e;
          font-size: 22px;
          font-weight: 700;
          margin: 0 0 25px 0;
          padding-bottom: 15px;
          border-bottom: 2px solid #f0f0f0;
        }
        .formGroup {
          margin-bottom: 18px;
        }
        .formLabel {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #333;
          margin-bottom: 6px;
        }
        .formInput {
          width: 100%;
          padding: 12px 14px;
          fontSize: 14px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          transition: all 0.3s ease;
          outline: none;
          background: white;
        }
        .formInput:focus:not(:read-only) {
          border-color: #11998e;
        }
        .formInput:read-only {
          background-color: #f8f9fa;
          color: #6c757d;
        }
        .submitBtn {
          width: 100%;
          padding: 13px;
          font-size: 15px;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          background: linear-gradient(135deg, #11998e, #38ef7d);
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(17, 153, 142, 0.4);
          margin-top: 10px;
        }
        .submitBtn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(17, 153, 142, 0.5);
        }
        .errorMsg {
          padding: 10px;
          background-color: #fee;
          border: 1px solid #fcc;
          border-radius: 8px;
          color: #c33;
          font-size: 13px;
          margin-bottom: 18px;
          text-align: center;
        }
        .infoGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 18px;
        }
        .fullWidth {
          grid-column: 1 / -1;
        }
      `}</style>

      <div className="attendanceCard">
        <h2 className="attendanceTitle">📋 Add Attendance</h2>
        <form onSubmit={handleSubmit}>
          {/* Employee Info Grid */}
          <div className="infoGrid">
            <div className="formGroup">
              <label className="formLabel">🆔 Employee ID</label>
              <input
                type="text"
                value={empID}
                readOnly
                className="formInput"
              />
            </div>
            <div className="formGroup">
              <label className="formLabel">👤 Employee Name</label>
              <input
                type="text"
                value={empName}
                readOnly
                className="formInput"
              />
            </div>
          </div>

          {/* Wage and Date */}
          <div className="infoGrid">
            <div className="formGroup">
              <label className="formLabel">💰 Hourly Wage</label>
              <input
                type="text"
                value={empWage}
                readOnly
                className="formInput"
              />
            </div>
            <div className="formGroup">
              <label className="formLabel">📅 Work Date</label>
              <input
                type="text"
                value={todayDate}
                readOnly
                className="formInput"
              />
            </div>
          </div>

          {/* Work Hours and OT */}
          <div className="infoGrid">
            <div className="formGroup">
              <label className="formLabel">⏰ Work Hours (0-8)</label>
              <input
                type="number"
                value={workHours}
                onChange={(e) => setWorkHours(e.target.value)}
                required
                min="0"
                max="8"
                step="0.5"
                placeholder="Enter work hours"
                className="formInput"
              />
            </div>
            <div className="formGroup">
              <label className="formLabel">⏱️ OT Hours (0-4)</label>
              <input
                type="number"
                value={otHours}
                onChange={(e) => setOTHours(e.target.value)}
                min="0"
                max="4"
                step="0.5"
                placeholder="Enter OT hours"
                className="formInput"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && <div className="errorMsg">{error}</div>}

          {/* Submit Button */}
          <button type="submit" className="submitBtn">
            ✓ Submit Attendance
          </button>
        </form>
      </div>
    </>
  );
};

export default AddAttendance;