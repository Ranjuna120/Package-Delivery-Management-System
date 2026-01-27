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
          border: none;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          padding: 40px;
          max-width: 600px;
          width: 100%;
          position: relative;
          overflow: hidden;
        }
        .attendanceCard::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #667eea, #764ba2);
        }
        .attendanceTitle {
          text-align: center;
          color: #2C3E50;
          font-size: 22px;
          font-weight: 700;
          margin: 0 0 32px 0;
          padding-bottom: 20px;
          border-bottom: 2px solid #f0f0f5;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        .formGroup {
          margin-bottom: 20px;
        }
        .formLabel {
          display: block;
          font-size: 12px;
          font-weight: 700;
          color: #8b92b8;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 1px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .formInput {
          width: 100%;
          padding: 13px 16px;
          fontSize: 14px;
          border: 2px solid #e8eaf6;
          border-radius: 10px;
          transition: all 0.3s ease;
          outline: none;
          background: white;
          box-sizing: border-box;
        }
        .formInput:focus:not(:read-only) {
          border-color: #667eea;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
          transform: translateY(-1px);
        }
        .formInput:read-only {
          background: linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%);
          color: #667eea;
          font-weight: 600;
          border-color: #e0e4ff;
        }
        .submitBtn {
          width: 100%;
          padding: 14px;
          font-size: 15px;
          font-weight: 700;
          border: none;
          border-radius: 10px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
          margin-top: 16px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .submitBtn:hover {
          background: linear-gradient(135deg, #764ba2, #667eea);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5);
        }
        .submitBtn:active {
          transform: translateY(0);
        }
        .errorMsg {
          padding: 14px;
          background: linear-gradient(135deg, #ffe8e8, #ffd5d5);
          border: 2px solid #ff6b6b;
          border-radius: 10px;
          color: #c92a2a;
          font-size: 13px;
          margin-bottom: 20px;
          text-align: center;
          font-weight: 600;
        }
        .infoGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
          margin-bottom: 20px;
        }
        .fullWidth {
          grid-column: 1 / -1;
        }
      `}</style>

      <div className="attendanceCard">
        <h2 className="attendanceTitle">
          <span>📋</span> Add Attendance
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Employee Info Grid */}
          <div className="infoGrid">
            <div className="formGroup">
              <label className="formLabel"><span>🆔</span> Employee ID</label>
              <input
                type="text"
                value={empID}
                readOnly
                className="formInput"
              />
            </div>
            <div className="formGroup">
              <label className="formLabel"><span>👤</span> Employee Name</label>
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
              <label className="formLabel"><span>💰</span> Hourly Wage</label>
              <input
                type="text"
                value={empWage}
                readOnly
                className="formInput"
              />
            </div>
            <div className="formGroup">
              <label className="formLabel"><span>📅</span> Work Date</label>
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
              <label className="formLabel"><span>⏰</span> Work Hours (0-8)</label>
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
              <label className="formLabel"><span>⏱️</span> OT Hours (0-4)</label>
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