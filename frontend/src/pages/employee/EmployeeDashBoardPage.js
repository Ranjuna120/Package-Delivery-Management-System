import React from 'react';
import { Route, Routes } from 'react-router-dom';
import EmployeeDashBoardOne from '../../compoments/Employee/EmployeeDashBoardOne';
import EmployeeDashBoardTwo from '../../compoments/Employee/EmployeeDashBoardTwo';

function EmployeeDashBoardPage() {
  return (
    <div>
      <style>
        {`
          .EDPGLayout {  
            display: flex;
            justify-content: center;
            width: 100%;
            gap: 30px;
          }
        `}
      </style>
      <div className="EDPGLayout">
        <EmployeeDashBoardOne />
        <EmployeeDashBoardTwo />
      </div>
    </div>
  );
}

export default EmployeeDashBoardPage;
