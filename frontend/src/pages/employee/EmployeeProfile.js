import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AddAttendance from '../../compoments/Employee/AddAttendance';

const EmployeeProfile = () => {
  const location = useLocation();
  const [empID, setEmpID] = useState('');

  useEffect(() => {
    if (location.state && location.state.empID) {
      setEmpID(location.state.empID);
    }
  }, [location.state]);

  return (
    <div>
      <style>
        {`
          .EPLayout {  
            display: flex;
            justify-content: center;
            width: 100%;
            gap: 30px;
            margin-top: 30px;
            margin-bottom: 30px;
          }
        `}
      </style>
      <div className="EPLayout">
        {/* Pass the empID prop to AddAttendance */}
        <AddAttendance empID={empID} />
      </div>
    </div>
  );
};

export default EmployeeProfile;
