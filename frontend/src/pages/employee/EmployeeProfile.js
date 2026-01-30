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
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
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
            border-radius: 16px;
            border: none;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
            padding: 40px;
            max-width: 700px;
            width: 100%;
            position: relative;
            overflow: hidden;
          }
          .profileCard::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #667eea, #764ba2);
          }
          .welcomeSection {
            text-align: center;
            margin-bottom: 32px;
            padding-bottom: 24px;
            border-bottom: 2px solid #f0f0f5;
          }
          .empAvatar {
            width: 100px;
            height: 100px;
            margin: 0 auto 20px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea, #764ba2);
            display: flex;
            align-items: center;
            justify-content: center;
            fontSize: 48px;
            box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
            animation: fadeInScale 0.5s ease-out;
          }
          @keyframes fadeInScale {
            from {
              opacity: 0;
              transform: scale(0.8);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          .empInfo {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            margin-bottom: 32px;
          }
          .infoItem {
            padding: 20px;
            background: linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%);
            border-radius: 12px;
            border-left: 4px solid #667eea;
            transition: all 0.3s ease;
            cursor: pointer;
          }
          .infoItem:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(102, 126, 234, 0.15);
            border-left-color: #764ba2;
          }
          .infoLabel {
            font-size: 11px;
            color: #8b92b8;
            font-weight: 700;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 1px;
            display: flex;
            align-items: center;
            gap: 6px;
          }
          .infoValue {
            font-size: 16px;
            color: #2C3E50;
            font-weight: 700;
          }
          .actionButtons {
            display: flex;
            gap: 12px;
            justify-content: center;
            flex-wrap: wrap;
          }
          .actionBtn {
            padding: 13px 28px;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }
          .actionBtn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
          }
          .logoutBtn {
            background: linear-gradient(135deg, #ff6b6b, #ee5a6f);
            color: white;
          }
          .logoutBtn:hover {
            background: linear-gradient(135deg, #ee5a6f, #ff6b6b);
          }
        `}
      </style>

      <div className="EPLayout">
        {/* Employee Info Card */}
        <div className="profileCard">
          <div className="welcomeSection">
            <div className="empAvatar">👨‍💼</div>
            <h2 style={{ color: '#2C3E50', margin: '0 0 8px 0', fontSize: '28px', fontWeight: 700 }}>
              Welcome Back, {empName}!
            </h2>
            <p style={{ color: '#667eea', fontSize: '15px', margin: 0, fontWeight: 600 }}>
              {empPosition}
            </p>
          </div>

          <div className="empInfo">
            <div className="infoItem">
              <div className="infoLabel"><span>🆔</span> Employee ID</div>
              <div className="infoValue">{empID}</div>
            </div>
            <div className="infoItem">
              <div className="infoLabel"><span>👤</span> Short Name</div>
              <div className="infoValue">{empName}</div>
            </div>
            <div className="infoItem" style={{ gridColumn: '1 / -1' }}>
              <div className="infoLabel"><span>📝</span> Full Name</div>
              <div className="infoValue">{empFullName}</div>
            </div>
            <div className="infoItem" style={{ gridColumn: '1 / -1' }}>
              <div className="infoLabel"><span>💼</span> Position</div>
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