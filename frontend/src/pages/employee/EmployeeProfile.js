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
            background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%) !important;
            min-height: 100vh !important;
          }
          .EPLayout {  
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            padding: 30px 20px;
            gap: 25px;
          }
          .profileCard {
            background: white;
            border-radius: 16px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
            padding: 30px;
            max-width: 700px;
            width: 100%;
          }
          .welcomeSection {
            text-align: center;
            margin-bottom: 25px;
            padding-bottom: 20px;
            border-bottom: 2px solid #f0f0f0;
          }
          .empAvatar {
            width: 80px;
            height: 80px;
            margin: 0 auto 15px;
            border-radius: 50%;
            background: linear-gradient(135deg, #11998e, #38ef7d);
            display: flex;
            align-items: center;
            justifyContent: center;
            fontSize: 40px;
            box-shadow: 0 4px 12px rgba(17, 153, 142, 0.3);
          }
          .empInfo {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 25px;
          }
          .infoItem {
            padding: 12px;
            background: #f8f9fa;
            border-radius: 8px;
            border-left: 3px solid #11998e;
          }
          .infoLabel {
            font-size: 12px;
            color: #6c757d;
            font-weight: 600;
            margin-bottom: 4px;
          }
          .infoValue {
            font-size: 15px;
            color: #333;
            font-weight: 600;
          }
          .actionButtons {
            display: flex;
            gap: 12px;
            justify-content: center;
            flex-wrap: wrap;
          }
          .actionBtn {
            padding: 10px 20px;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }
          .actionBtn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          }
          .logoutBtn {
            background: linear-gradient(135deg, #ea2c03, #ff6b6b);
            color: white;
          }
        `}
      </style>

      <div className="EPLayout">
        {/* Employee Info Card */}
        <div className="profileCard">
          <div className="welcomeSection">
            <div className="empAvatar">👔</div>
            <h2 style={{ color: '#11998e', margin: '0 0 5px 0', fontSize: '24px' }}>
              Welcome, {empName}!
            </h2>
            <p style={{ color: '#6c757d', fontSize: '14px', margin: 0 }}>
              {empPosition}
            </p>
          </div>

          <div className="empInfo">
            <div className="infoItem">
              <div className="infoLabel">🆔 Employee ID</div>
              <div className="infoValue">{empID}</div>
            </div>
            <div className="infoItem">
              <div className="infoLabel">👤 Short Name</div>
              <div className="infoValue">{empName}</div>
            </div>
            <div className="infoItem" style={{ gridColumn: '1 / -1' }}>
              <div className="infoLabel">📝 Full Name</div>
              <div className="infoValue">{empFullName}</div>
            </div>
            <div className="infoItem" style={{ gridColumn: '1 / -1' }}>
              <div className="infoLabel">💼 Position</div>
              <div className="infoValue">{empPosition}</div>
            </div>
          </div>

          <div className="actionButtons">
            <button 
              className="actionBtn logoutBtn"
              onClick={handleLogout}
            >
              🚪 Logout
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