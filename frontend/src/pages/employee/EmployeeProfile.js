import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AddAttendance from '../../compoments/Employee/AddAttendance';

const EmployeeProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [empID, setEmpID] = useState('');
  const [empName, setEmpName] = useState('');
  const [empFullName, setEmpFullName] = useState('');
  const [empPosition, setEmpPosition] = useState('');

  useEffect(() => {
    // Get from location state or localStorage
    const id = location.state?.empID || localStorage.getItem('empID');
    const name = location.state?.empName || localStorage.getItem('empName');
    const fullName = location.state?.empFullName || localStorage.getItem('empFullName');
    const position = location.state?.empPosition || localStorage.getItem('empPosition');

    if (!id) {
      // If no employee data, redirect to login
      navigate('/EmpLogin');
      return;
    }

    setEmpID(id);
    setEmpName(name || '');
    setEmpFullName(fullName || '');
    setEmpPosition(position || '');
  }, [location.state, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('employeeLoggedIn');
    localStorage.removeItem('empID');
    localStorage.removeItem('empName');
    localStorage.removeItem('empFullName');
    localStorage.removeItem('empPosition');
    localStorage.removeItem('empWage');
    localStorage.removeItem('employeeId');
    navigate('/EmpLogin');
    window.location.reload();
  };

  return (
    <>
      <style>
        {`
          body {
            background: #F5F7FA !important;
            min-height: 100vh !important;
          }
          .EPLayout {  
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            padding: 40px 20px;
            gap: 24px;
          }
          .profileCard {
            background: white;
            border-radius: 8px;
            border: 1px solid #E1E8ED;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
            padding: 32px;
            max-width: 700px;
            width: 100%;
          }
          .welcomeSection {
            text-align: center;
            margin-bottom: 28px;
            padding-bottom: 24px;
            border-bottom: 1px solid #E1E8ED;
          }
          .empAvatar {
            width: 80px;
            height: 80px;
            margin: 0 auto 16px;
            border-radius: 50%;
            background: #4A90E2;
            display: flex;
            align-items: center;
            justify-content: center;
            fontSize: 36px;
            box-shadow: 0 2px 8px rgba(74, 144, 226, 0.2);
          }
          .empInfo {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            margin-bottom: 28px;
          }
          .infoItem {
            padding: 16px;
            background: #F8F9FA;
            border-radius: 8px;
            border-left: 3px solid #4A90E2;
          }
          .infoLabel {
            font-size: 12px;
            color: #7F8C8D;
            font-weight: 600;
            margin-bottom: 6px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .infoValue {
            font-size: 15px;
            color: #2C3E50;
            font-weight: 600;
          }
          .actionButtons {
            display: flex;
            gap: 12px;
            justify-content: center;
            flex-wrap: wrap;
          }
          .actionBtn {
            padding: 11px 24px;
            border: none;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
          }
          .actionBtn:hover {
            transform: translateY(-1px);
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.12);
          }
          .logoutBtn {
            background: #E74C3C;
            color: white;
          }
          .logoutBtn:hover {
            background: #C0392B;
          }
        `}
      </style>

      <div className="EPLayout">
        {/* Employee Info Card */}
        <div className="profileCard">
          <div className="welcomeSection">
            <div className="empAvatar">�</div>
            <h2 style={{ color: '#2C3E50', margin: '0 0 6px 0', fontSize: '24px', fontWeight: 700 }}>
              Welcome, {empName}!
            </h2>
            <p style={{ color: '#7F8C8D', fontSize: '14px', margin: 0, fontWeight: 500 }}>
              {empPosition}
            </p>
          </div>

          <div className="empInfo">
            <div className="infoItem">
              <div className="infoLabel">Employee ID</div>
              <div className="infoValue">{empID}</div>
            </div>
            <div className="infoItem">
              <div className="infoLabel">Short Name</div>
              <div className="infoValue">{empName}</div>
            </div>
            <div className="infoItem" style={{ gridColumn: '1 / -1' }}>
              <div className="infoLabel">Full Name</div>
              <div className="infoValue">{empFullName}</div>
            </div>
            <div className="infoItem" style={{ gridColumn: '1 / -1' }}>
              <div className="infoLabel">Position</div>
              <div className="infoValue">{empPosition}</div>
            </div>
          </div>

          <div className="actionButtons">
            <button 
              className="actionBtn logoutBtn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Attendance Section */}
        <AddAttendance empID={empID} />
      </div>
    </>
  );
};

export default EmployeeProfile;