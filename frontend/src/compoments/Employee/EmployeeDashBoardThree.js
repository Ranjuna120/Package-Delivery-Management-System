import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';

function EmployeeDashBoardThree() {
  const handleNavigate = useNavigate();
  const [employeeData, setEmployeeData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/GetAttendance');
        const data = await response.json();
        setEmployeeData(data);
        setFilteredData(data); 
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    fetchAttendanceData();
  }, []);

  useEffect(() => {
    const filtered = employeeData.filter(record =>
      record.EmpID.toString() === searchTerm
    );
    setFilteredData(filtered.length > 0 ? filtered : []); 
  }, [searchTerm, employeeData]);

  const handleDelete = async (AttID) => {
    if (window.confirm("Are you sure you want to delete this attendance record?")) {
      try {
        const response = await fetch(`http://localhost:8080/api/DelAttendance/${AttID}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          alert('Attendance record deleted successfully');
          setEmployeeData(prev => prev.filter(emp => emp.AttID !== AttID));
          setFilteredData(prev => prev.filter(emp => emp.AttID !== AttID)); 
        } else {
          const errorText = await response.text();
          alert('Failed to delete attendance record: ' + errorText);
        }
      } catch (error) {
        console.error('Error deleting attendance record:', error);
      }
    }
  };

  const handleExport = () => {
    // Convert filtered data to a worksheet
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'AttendanceData');

    // Write to file
    XLSX.writeFile(wb, 'Employee_Attendance_Report.xlsx');
  };

  return (
    <div>
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

           .tableContainer {
              max-height: 350px; 
              overflow-y: auto;
              margin-top: 20px;
           }

           table {
              width: 100%;
              border-collapse: collapse;
           }

           th, td {
              padding: 8px;
              border: 1px solid #ddd;
              text-align: left;
           }

           th {
              background-color: #f2f2f2;
           }

           .buttonX {
              padding: 5px 10px;
              background-color: #031f42;
              color: white;
              border: none;
              border-radius: 5px;
              cursor: pointer;
           }

           .buttonX:hover {
              background-color: #00509e;
           }

           .spaced-buttons {
              margin-right: 5px;
              margin-bottom: 5px;
           }

           input[type="text"], select {
              padding: 5px;
              border-radius: 5px;
              border: 1px solid #ccc;
              margin-left: 10px;
           }

           .download-button {
              padding: 10px 20px;
              margin-left: 10px;
              background-color: #0091c7;
              color: white;
              border: none;
              border-radius: 5px; 
              cursor: pointer;
           }

           .download-button:hover {
              background-color: #00509e;
           }
          `}
        </style>
      </div>
      <div className="tilesAdmin">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2>Employee Attendance</h2>
          <input
            type="text"
            placeholder="Search by Employee ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '5px', marginLeft: '10px' }}
          />
          <button onClick={handleExport} className="download-button">
            Download as Excel
          </button>
        </div>
        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Work Date</th>
                <th>Work Hours</th>
                <th>OT Hours</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((record) => (
                <tr key={record.AttID}>
                  <td>{record.EmpID}</td>
                  <td>{record.EmpName}</td>
                  <td>{new Date(record.WorkDate).toLocaleDateString()}</td>
                  <td>{record.WorkHours}</td>
                  <td>{record.OTHours || 0}</td>
                  <td>
                    <button
                      className="buttonX spaced-buttons"
                      style={{ backgroundColor: '#f7c600', color: 'white' }}
                      onClick={() => handleNavigate(`/EditAttendance?AttID=${record.AttID}&EmpID=${record.EmpID}&EmpName=${encodeURIComponent(record.EmpName)}&WorkDate=${record.WorkDate}&WorkHours=${record.WorkHours}&OTHours=${record.OTHours}`)}
                    >
                      Update
                    </button>
                    <button
                      className="buttonX spaced-buttons"
                      style={{ backgroundColor: '#ea2c03', color: 'white' }}
                      onClick={() => handleDelete(record.AttID)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashBoardThree;