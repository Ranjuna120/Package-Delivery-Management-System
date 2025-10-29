import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

function EmployeeDashBoardTwo() {
  const handleNavigate = useNavigate();
  const [employeeData, setEmployeeData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State to hold search term (EmpID)
  const [selectedMonth, setSelectedMonth] = useState(''); // State for selected month
  const [filteredData, setFilteredData] = useState([]); // State for filtered data

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await fetch('http://localhost:8070/api/GetAttendance');
        const data = await response.json();
        setEmployeeData(data);
        setFilteredData(data); // Initialize filtered data
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    fetchAttendanceData();
  }, []);

  // Update filtered data whenever searchTerm or selectedMonth changes
  useEffect(() => {
    const filtered = employeeData.filter(record => {
      // Search by Employee ID
      const matchesEmpID = record.EmpID.toString().includes(searchTerm);
      // Filter by selected month, if any
      const matchesMonth = selectedMonth
        ? new Date(record.WorkDate).getMonth() + 1 === parseInt(selectedMonth)
        : true; // If "All Months" is selected, match all records
  
      return matchesEmpID && matchesMonth;
    });
  
    setFilteredData(filtered);
  }, [searchTerm, selectedMonth, employeeData]);
  
  // The handleMonthChange function should now only set the month
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value); // This will trigger the useEffect to re-apply the filters
  };
  //The delete function
  const handleDelete = async (AttID) => {
    if (window.confirm("Are you sure you want to delete this attendance record?")) {
      try {
        const response = await fetch(`http://localhost:8070/api/DelAttendance/${AttID}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          alert('Attendance record deleted successfully');
          setEmployeeData(prev => prev.filter(emp => emp.AttID !== AttID));
          setFilteredData(prev => prev.filter(emp => emp.AttID !== AttID)); // Update filtered data
        } else {
          const errorText = await response.text();
          alert('Failed to delete attendance record: ' + errorText);
        }
      } catch (error) {
        console.error('Error deleting attendance record:', error);
      }
    }
  };

  // Function to generate the PDF report
  const generateReport = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(18);
    doc.setTextColor(17, 153, 142);
    doc.text('Employee Attendance Report', 14, 22);
    
    // Add date and filter info
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
    if (selectedMonth) {
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                         'July', 'August', 'September', 'October', 'November', 'December'];
      doc.text(`Filter: ${monthNames[parseInt(selectedMonth) - 1]}`, 14, 36);
    }
    
    const tableColumn = ["Emp ID", "Name", "Date", "Work Hrs", "OT Hrs", "Wage", "Payment"];
    const tableRows = [];
    let grandTotalPayment = 0;

    filteredData.forEach(record => {
      const workHoursPayment = record.WorkHours * record.EmpWage;
      const overtimePayment = (record.OTHours || 0) * record.EmpWage * 1.5;
      const totalPayment = workHoursPayment + overtimePayment;

      const rowData = [
        record.EmpID,
        record.EmpName,
        new Date(record.WorkDate).toLocaleDateString(),
        record.WorkHours,
        record.OTHours || 0,
        `Rs. ${record.EmpWage}`,
        `Rs. ${totalPayment.toFixed(2)}`
      ];

      tableRows.push(rowData);
      grandTotalPayment += totalPayment;
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: selectedMonth ? 40 : 35,
      theme: 'grid',
      headStyles: {
        fillColor: [17, 153, 142],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        halign: 'left'
      },
      bodyStyles: {
        textColor: [44, 62, 80]
      },
      alternateRowStyles: {
        fillColor: [248, 255, 254]
      },
      footStyles: {
        fillColor: [17, 153, 142],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      foot: [[
        '', '', '', '', '', 'Grand Total:', `Rs. ${grandTotalPayment.toFixed(2)}`
      ]]
    });

    doc.save(`Attendance_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  return (
    <>
      <style>
        {`
          body {
            background: linear-gradient(135deg, #eeefefff 0%, #ebf1edff 100%) !important;
            min-height: 100vh !important;
            margin: 0 !important;
          }

          .attDashContainer {
            min-height: 100vh;
            padding: 40px 20px;
          }

          .attDashWrapper {
            max-width: 1400px;
            margin: 0 auto;
          }

          .attDashHeader {
            background: white;
            padding: 25px 30px;
            border-radius: 16px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
            margin-bottom: 24px;
          }

          .attHeaderTop {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }

          .attHeaderTop h1 {
            margin: 0;
            font-size: 28px;
            color: #11998e;
            font-weight: 800;
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .attHeaderTop p {
            margin: 6px 0 0;
            color: #6c757d;
            font-size: 14px;
          }

          .attFilterBar {
            display: flex;
            gap: 12px;
            align-items: center;
            flex-wrap: wrap;
          }

          .attFilterGroup {
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .attFilterGroup label {
            font-weight: 700;
            color: #11998e;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 6px;
          }

          .attFilterGroup input,
          .attFilterGroup select {
            padding: 10px 16px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 14px;
            transition: all 0.3s ease;
            background: white;
          }

          .attFilterGroup input:focus,
          .attFilterGroup select:focus {
            outline: none;
            border-color: #11998e;
            box-shadow: 0 0 0 3px rgba(17, 153, 142, 0.1);
          }

          .attPdfBtn {
            padding: 10px 20px;
            background: #dc3545;
            color: white;
            border: none;
            border-radius: 8px;
            font-weight: 700;
            font-size: 14px;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(220, 53, 69, 0.4);
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 6px;
            margin-left: auto;
          }

          .attPdfBtn:hover {
            background: #c82333;
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(220, 53, 69, 0.5);
          }

          .attTableCard {
            background: white;
            border-radius: 16px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }

          .attTableWrapper {
            overflow-x: auto;
          }

          .attTable {
            width: 100%;
            border-collapse: collapse;
          }

          .attTable thead {
            background: linear-gradient(135deg, #11998e, #38ef7d);
            position: sticky;
            top: 0;
            z-index: 10;
          }

          .attTable thead th {
            padding: 16px 14px;
            text-align: left;
            font-size: 13px;
            font-weight: 700;
            color: white;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border: none;
          }

          .attTable tbody tr {
            border-bottom: 1px solid #f0f4f8;
            transition: background 0.2s ease;
          }

          .attTable tbody tr:hover {
            background: #f8fffe;
          }

          .attTable tbody tr:last-child {
            border-bottom: none;
          }

          .attTable tbody td {
            padding: 14px;
            font-size: 14px;
            color: #2c3e50;
          }

          .attIdBadge {
            display: inline-block;
            padding: 4px 10px;
            background: linear-gradient(135deg, #11998e15, #38ef7d15);
            border: 1px solid #11998e40;
            border-radius: 6px;
            font-weight: 700;
            color: #11998e;
            font-size: 13px;
          }

          .attActionBtn {
            padding: 7px 12px;
            border: none;
            border-radius: 6px;
            font-size: 13px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
            margin-right: 6px;
          }

          .attUpdateBtn {
            background: #f7c600;
            color: #2c3e50;
          }

          .attUpdateBtn:hover {
            background: #e0b200;
            transform: translateY(-1px);
          }

          .attDeleteBtn {
            background: #ea2c03;
            color: white;
          }

          .attDeleteBtn:hover {
            background: #d32703;
            transform: translateY(-1px);
          }

          .attEmptyMsg {
            padding: 40px 20px;
            text-align: center;
            font-size: 15px;
            color: #6c757d;
          }

          .attBackBtn {
            padding: 12px 20px;
            background: white;
            color: #11998e;
            border: 2px solid #11998e;
            border-radius: 8px;
            font-weight: 700;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            margin-top: 20px;
          }

          .attBackBtn:hover {
            background: #11998e;
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(17, 153, 142, 0.3);
          }

          @media (max-width: 768px) {
            .attHeaderTop {
              flex-direction: column;
              align-items: flex-start;
            }

            .attFilterBar {
              flex-direction: column;
              align-items: stretch;
            }

            .attPdfBtn {
              margin-left: 0;
              width: 100%;
              justify-content: center;
            }
          }
        `}
      </style>

      <div className="attDashContainer">
        <div className="attDashWrapper">
          <div className="attDashHeader">
            <div className="attHeaderTop">
              <div>
                <h1>
                  <span>📋</span> Employee Attendance Management
                </h1>
                <p>Track and manage employee work hours and overtime</p>
              </div>
            </div>

            <div className="attFilterBar">
              <div className="attFilterGroup">
                <label>
                  <span>🔍</span> Search by ID:
                </label>
                <input
                  type="text"
                  placeholder="Enter Employee ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ minWidth: '200px' }}
                />
              </div>

              <div className="attFilterGroup">
                <label>
                  <span>📅</span> Filter by Month:
                </label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  style={{ minWidth: '150px' }}
                >
                  <option value="">All Months</option>
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
              </div>

              <button onClick={generateReport} className="attPdfBtn">
                <span>📄</span> Generate PDF Report
              </button>
            </div>
          </div>

          <div className="attTableCard">
            {filteredData.length === 0 ? (
              <div className="attEmptyMsg">
                {searchTerm || selectedMonth 
                  ? '📋 No attendance records found matching your filters.' 
                  : '📋 No attendance records available.'}
              </div>
            ) : (
              <div className="attTableWrapper">
                <table className="attTable">
                  <thead>
                    <tr>
                      <th>Employee ID</th>
                      <th>Employee Name</th>
                      <th>Work Date</th>
                      <th>Work Hours</th>
                      <th>OT Hours</th>
                      <th>Wage (Rs.)</th>
                      <th>Total Payment</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((record) => {
                      const workHoursPayment = record.WorkHours * record.EmpWage;
                      const overtimePayment = (record.OTHours || 0) * record.EmpWage * 1.5;
                      const totalPayment = workHoursPayment + overtimePayment;

                      return (
                        <tr key={record.AttID}>
                          <td>
                            <span className="attIdBadge">{record.EmpID}</span>
                          </td>
                          <td style={{ fontWeight: 600 }}>{record.EmpName}</td>
                          <td>{new Date(record.WorkDate).toLocaleDateString()}</td>
                          <td>{record.WorkHours} hrs</td>
                          <td>{record.OTHours || 0} hrs</td>
                          <td style={{ fontWeight: 600 }}>Rs. {record.EmpWage.toLocaleString()}</td>
                          <td style={{ fontWeight: 700, color: '#11998e' }}>
                            Rs. {totalPayment.toFixed(2)}
                          </td>
                          <td>
                            <button
                              className="attActionBtn attUpdateBtn"
                              onClick={() => handleNavigate(`/EditAttendance?AttID=${record.AttID}&EmpID=${record.EmpID}&EmpName=${encodeURIComponent(record.EmpName)}&WorkDate=${record.WorkDate}&WorkHours=${record.WorkHours}&OTHours=${record.OTHours}`)}
                            >
                              ✏️ Update
                            </button>
                            <button
                              className="attActionBtn attDeleteBtn"
                              onClick={() => handleDelete(record.AttID)}
                            >
                              🗑️ Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <button onClick={() => handleNavigate('/EmployeeDashBoardPage')} className="attBackBtn">
            <span>←</span> Back to Employee Management
          </button>
        </div>
      </div>
    </>
  );
}

export default EmployeeDashBoardTwo;