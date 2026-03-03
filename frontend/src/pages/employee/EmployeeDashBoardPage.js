import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

function EmployeeDashBoardPage() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchId, setSearchId] = useState('');

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:8070/api/employees');
      if (!res.ok) throw new Error('Failed to fetch employees');
      const data = await res.json();
      setEmployees(data);
      setFilteredEmployees(data);
    } catch (err) {
      setError(err.message || 'Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (searchId === '') {
      setFilteredEmployees(employees);
    } else {
      const filtered = employees.filter(emp => 
        emp.EmpID.toString().includes(searchId)
      );
      setFilteredEmployees(filtered);
    }
  }, [searchId, employees]);

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(18);
    doc.setTextColor(17, 153, 142);
    doc.text('Employee Management Report', 14, 22);
    
    // Add date
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
    
    // Prepare table data
    const tableData = filteredEmployees.map(emp => [
      emp.EmpID,
      emp.EmpName,
      emp.EmpPosition || '-',
      emp.EmpExperience || '-',
      emp.EmpWage != null ? `Rs. ${emp.EmpWage.toLocaleString()}` : '-',
      emp.EmpJoin ? new Date(emp.EmpJoin).toLocaleDateString() : '-'
    ]);
    
    // Add table using autoTable
    autoTable(doc, {
      head: [['ID', 'Name', 'Position', 'Experience', 'Wage', 'Join Date']],
      body: tableData,
      startY: 35,
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
      margin: { top: 35 }
    });
    
    // Add footer
    const pageCount = doc.internal.getNumberOfPages();
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.text(
        `Page ${i} of ${pageCount}`,
        doc.internal.pageSize.width / 2,
        doc.internal.pageSize.height - 10,
        { align: 'center' }
      );
    }
    
    // Save the PDF
    doc.save(`Employee_Report_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const handleDelete = async (EmpID) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;
    try {
      const res = await fetch(`http://localhost:8070/api/employees/${EmpID}`, { method: 'DELETE' });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || 'Delete failed');
      }
      setEmployees(prev => prev.filter(e => e.EmpID !== EmpID));
      alert('Employee deleted successfully');
    } catch (err) {
      alert(err.message || 'Delete failed');
    }
  };

  return (
    <>
      <style>{`
        body {
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%) !important;
          min-height: 100vh !important;
          margin: 0 !important;
        }
        .empDashContainer {
          min-height: calc(100vh - 120px);
          padding: 48px 32px 80px 32px;
        }
        .empDashWrapper {
          max-width: 1400px;
          margin: 0 auto;
        }
        .empDashHeader {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
          background: white;
          padding: 32px 40px;
          border-radius: 20px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        }
        .empHeaderLeft h1 {
          margin: 0;
          font-size: 36px;
          color: #2c3e50;
          font-weight: 800;
        }
        .empHeaderLeft p {
          margin: 6px 0 0;
          color: #6c757d;
          font-size: 14px;
        }
        .empHeaderRight {
          display: flex;
          gap: 12px;
          align-items: center;
        }
        .addEmpBtn {
          padding: 12px 24px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
          color: white !important;
          border: none;
          border-radius: 10px;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3) !important;
          display: flex;
          align-items: center;
          gap: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .addEmpBtn:hover {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3) !important;
          transform: none !important;
        }
        .pdfBtn {
          padding: 12px 20px;
          background: #dc3545 !important;
          color: white !important;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(220, 53, 69, 0.4) !important;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .pdfBtn:hover {
          background: #dc3545 !important;
          box-shadow: 0 4px 12px rgba(220, 53, 69, 0.4) !important;
          transform: none !important;
        }
        .searchBar {
          margin-bottom: 20px;
          background: white;
          padding: 20px 30px;
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }
        .searchInputGroup {
          display: flex;
          gap: 12px;
          align-items: center;
        }
        .searchInputGroup label {
          font-weight: 700;
          color: #667eea;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .searchInputGroup input {
          flex: 1;
          padding: 12px 18px;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          font-size: 14px;
          transition: all 0.3s ease;
          max-width: 300px;
          background: #f8f9fa;
        }
        .searchInputGroup input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
          background: white;
        }
        .clearSearchBtn {
          padding: 10px 16px;
          background: #6c757d !important;
          color: white !important;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
        }
        .clearSearchBtn:hover {
          background: #6c757d !important;
          transform: none !important;
        }
        .empTableCard {
          background: white;
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
          padding: 0;
          overflow: hidden;
        }
        .empTable {
          width: 100%;
          border-collapse: collapse;
        }
        .empTable thead {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .empTable thead th {
          padding: 18px 16px;
          text-align: left;
          font-size: 13px;
          font-weight: 700;
          color: white;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border: none;
        }
        .empTable tbody tr {
          border-bottom: 1px solid #f0f4f8;
        }
        .empTable tbody tr:last-child {
          border-bottom: none;
        }
        .empTable tbody td {
          padding: 16px;
          font-size: 14px;
          color: #2c3e50;
          vertical-align: middle;
        }
        .empIdBadge {
          display: inline-block;
          padding: 6px 12px;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
          border: 1px solid rgba(102, 126, 234, 0.3);
          border-radius: 8px;
          font-weight: 700;
          color: #667eea;
          font-size: 13px;
        }
        .empActionBtn {
          padding: 7px 12px;
          border: none;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          margin-right: 6px;
        }
        .empEditBtn {
          background: #f7c600 !important;
          color: #2c3e50 !important;
        }
        .empEditBtn:hover {
          background: #f7c600 !important;
          color: #2c3e50 !important;
        }
        .empDeleteBtn {
          background: #ea2c03 !important;
          color: white !important;
        }
        .empDeleteBtn:hover {
          background: #ea2c03 !important;
          color: white !important;
        }
        .navBtnGroup {
          display: flex;
          gap: 12px;
          justify-content: center;
          margin-top: 24px;
        }
        .navBtn {
          padding: 12px 20px;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          background: white !important;
          color: #11998e !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
        }
        .navBtn:hover {
          background: white !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
          transform: none !important;
        }
        .loadingMsg, .errorMsg, .emptyMsg {
          padding: 40px 20px;
          text-align: center;
          font-size: 15px;
        }
        .loadingMsg {
          color: #6c757d;
        }
        .errorMsg {
          color: #c33;
          background: #fee;
          border: 1px solid #fcc;
          border-radius: 8px;
          margin: 20px;
        }
        .emptyMsg {
          color: #6c757d;
        }
      `}</style>

      <div className="empDashContainer">
        <div className="empDashWrapper">
          <div className="empDashHeader">
            <div className="empHeaderLeft">
              <h1>👥 Employee Management</h1>
              <p>View, edit, and manage all employee records</p>
            </div>
            <div className="empHeaderRight">
              <button onClick={generatePDF} className="pdfBtn">
                <span>📄</span> Generate PDF
              </button>
              <button onClick={() => navigate('/AddEmployee')} className="addEmpBtn">
                <span>➕</span> Add Employee
              </button>
            </div>
          </div>

          <div className="searchBar">
            <div className="searchInputGroup">
              <label>
                <span>🔍</span> Search by Employee ID:
              </label>
              <input
                type="text"
                placeholder="Enter Employee ID..."
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
              {searchId && (
                <button onClick={() => setSearchId('')} className="clearSearchBtn">
                  ✕ Clear
                </button>
              )}
            </div>
          </div>

          <div className="empTableCard">
            {loading ? (
              <div className="loadingMsg">⏳ Loading employees...</div>
            ) : error ? (
              <div className="errorMsg">❌ {error}</div>
            ) : filteredEmployees.length === 0 ? (
              <div className="emptyMsg">
                {searchId ? `📋 No employees found with ID: ${searchId}` : '📋 No employees found. Click "Add Employee" to get started.'}
              </div>
            ) : (
              <table className="empTable">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Experience</th>
                    <th>Wage</th>
                    <th>Join Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map(emp => (
                    <tr key={emp.EmpID}>
                      <td>
                        <span className="empIdBadge">{emp.EmpID}</span>
                      </td>
                      <td style={{ fontWeight: 600 }}>{emp.EmpName}</td>
                      <td>{emp.EmpPosition || '-'}</td>
                      <td>{emp.EmpExperience || '-'}</td>
                      <td style={{ fontWeight: 600, color: '#11998e' }}>
                        {emp.EmpWage != null ? `Rs. ${emp.EmpWage.toLocaleString()}` : '-'}
                      </td>
                      <td>{emp.EmpJoin ? new Date(emp.EmpJoin).toLocaleDateString() : '-'}</td>
                      <td>
                        <button
                          onClick={() => navigate(`/EditEmployee/${emp.EmpID}`)}
                          className="empActionBtn empEditBtn"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDelete(emp.EmpID)}
                          className="empActionBtn empDeleteBtn"
                        >
                          🗑️ Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="navBtnGroup">
            <button onClick={() => navigate('/EmployeeDashBoardTwo')} className="navBtn">
              📋 Manage Attendance
            </button>
            <button onClick={() => navigate('/EmployeeDashBoardOne')} className="navBtn">
              🔙 Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmployeeDashBoardPage;