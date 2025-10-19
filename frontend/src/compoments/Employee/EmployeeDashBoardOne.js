import React, { useEffect, useState } from 'react';
import avatar from '../../images/avatar.png';
import { useNavigate } from 'react-router-dom';

function EmployeeDashBoardOne() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  const handleNavigate = (path) => navigate(path);

  const handleDelete = async (EmpID) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        const response = await fetch(`http://localhost:8070/api/employees/${EmpID}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          alert('Employee deleted successfully');
          setEmployees(prev => prev.filter(emp => emp.EmpID !== EmpID));
        } else {
          const errorText = await response.text();
          alert('Failed to delete employee: ' + errorText);
        }
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:8070/api/employees');
        if (response.ok) {
          const data = await response.json();
          setEmployees(data);
        } else {
          console.error('Failed to fetch employees:', response.status);
        }
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div>
      <style>
        {`
          .tilesAdmin {
            display: inline-block;
            width: 600px;
            height: auto;
            margin: 30px;
            padding: 20px;
            border-radius: 15px;
            border: 3px solid #031f42;
          }
          .buttonX {
            background-color: #031f42;
            border-radius: 8px;
            color: white;
            padding: 4px 15px;
            margin: 0 5px;
          }
          table {
            margin-top: 14px;
            width: 100%;
            border-collapse: collapse;
          }
          td {
            padding: 10px;
            text-align: center;
          }
        `}
      </style>
      
      <div className="tilesAdmin">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2>Manage Employees</h2>
          <button className="buttonX" onClick={() => handleNavigate('/AddEmployee')}>Add Account</button>
        </div>
        
        <table>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.EmpID}>
                <td><img src={avatar} alt="AVT" style={{ width: '40px', height: '40px', margin: '5px' }} /></td>
                <td>{employee.EmpID}</td>
                <td>{employee.EmpName}</td>
                <td>
                  <button className="buttonX" onClick={() => handleNavigate(`/EditEmployee/${employee.EmpID}`)}>Edit</button>
                </td>
                <td><button className="buttonX" onClick={() => handleDelete(employee.EmpID)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeDashBoardOne;
