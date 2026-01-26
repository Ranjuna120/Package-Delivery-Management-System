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
          border-radius: 8px;
          border: 1px solid #E1E8ED;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          padding: 32px;
          max-width: 600px;
          width: 100%;
        }
        .attendanceTitle {
          text-align: center;
          color: #2C3E50;
          font-size: 20px;
          font-weight: 700;
          margin: 0 0 28px 0;
          padding-bottom: 16px;
          border-bottom: 1px solid #E1E8ED;
        }
        .formGroup {
          margin-bottom: 18px;
        }
        .formLabel {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: #7F8C8D;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .formInput {
          width: 100%;
          padding: 11px 14px;
          fontSize: 14px;
          border: 1px solid #E1E8ED;
          border-radius: 6px;
          transition: all 0.2s ease;
          outline: none;
          background: white;
          box-sizing: border-box;
        }
        .formInput:focus:not(:read-only) {
          border-color: #4A90E2;
          box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
        }
        .formInput:read-only {
          background-color: #F8F9FA;
          color: #7F8C8D;
        }
        .submitBtn {
          width: 100%;
          padding: 12px;
          font-size: 15px;
          font-weight: 600;
          border: none;
          border-radius: 6px;
          background: #4A90E2;
          color: white;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 6px rgba(74, 144, 226, 0.3);
          margin-top: 12px;
        }
        .submitBtn:hover {
          background: #357ABD;
          transform: translateY(-1px);
          box-shadow: 0 3px 10px rgba(74, 144, 226, 0.4);
        }
        .errorMsg {
          padding: 12px;
          background-color: #FADBD8;
          border: 1px solid #E74C3C;
          border-radius: 6px;
          color: #C0392B;
          font-size: 13px;
          margin-bottom: 18px;
          text-align: center;
        }
        .infoGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 18px;
        }
        .fullWidth {
          grid-column: 1 / -1;
        }
      `}</style>

      <div className="attendanceCard">
        <h2 className="attendanceTitle">Add Attendance</h2>
        <form onSubmit={handleSubmit}>
          {/* Employee Info Grid */}
          <div className="infoGrid">
            <div className="formGroup">
              <label className="formLabel">Employee ID</label>
              <input
                type="text"
                value={empID}
                readOnly
                className="formInput"
              />
            </div>
            <div className="formGroup">
              <label className="formLabel">Employee Name</label>
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
              <label className="formLabel">Hourly Wage</label>
              <input
                type="text"
                value={empWage}
                readOnly
                className="formInput"
              />
            </div>
            <div className="formGroup">
              <label className="formLabel">Work Date</label>
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
              <label className="formLabel">Work Hours (0-8)</label>
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
              <label className="formLabel">OT Hours (0-4)</label>
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
            Submit Attendance
          </button>
        </form>
      </div>
    </>
  );
};

export default AddAttendance;