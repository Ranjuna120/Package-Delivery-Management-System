import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EmployeeDashBoardPage() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:8070/api/employees');
      if (!res.ok) throw new Error('Failed to fetch employees');
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      setError(err.message || 'Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

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
          background: linear-gradient(135deg, #eeefefff 0%, #ebf1edff 100%) !important;
          min-height: 100vh !important;
          margin: 0 !important;
        }
        .empDashContainer {
          min-height: 100vh;
          padding: 40px 20px;
        }
        .empDashWrapper {
          max-width: 1200px;
          margin: 0 auto;
        }
        .empDashHeader {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          background: white;
          padding: 25px 30px;
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }
        .empHeaderLeft h1 {
          margin: 0;
          font-size: 28px;
          color: #11998e;
          font-weight: 800;
        }
        .empHeaderLeft p {
          margin: 6px 0 0;
          color: #6c757d;
          font-size: 14px;
        }
        .addEmpBtn {
          padding: 12px 20px;
          background: linear-gradient(135deg, #11998e, #38ef7d);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(17, 153, 142, 0.4);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .addEmpBtn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(17, 153, 142, 0.5);
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
          background: linear-gradient(135deg, #11998e, #38ef7d);
        }
        .empTable thead th {
          padding: 16px 14px;
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
          transition: background 0.2s ease;
        }
        .empTable tbody tr:hover {
          background: #f8fffe;
        }
        .empTable tbody tr:last-child {
          border-bottom: none;
        }
        .empTable tbody td {
          padding: 14px;
          font-size: 14px;
          color: #2c3e50;
        }
        .empIdBadge {
          display: inline-block;
          padding: 4px 10px;
          background: linear-gradient(135deg, #11998e15, #38ef7d15);
          border: 1px solid #11998e40;
          border-radius: 6px;
          font-weight: 700;
          color: #11998e;
          font-size: 13px;
        }
        .empActionBtn {
          padding: 7px 12px;
          border: none;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-right: 6px;
        }
        .empEditBtn {
          background: #f7c600;
          color: #2c3e50;
        }
        .empEditBtn:hover {
          background: #e0b200;
          transform: translateY(-1px);
        }
        .empDeleteBtn {
          background: #ea2c03;
          color: white;
        }
        .empDeleteBtn:hover {
          background: #d32703;
          transform: translateY(-1px);
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
          transition: all 0.3s ease;
          background: white;
          color: #11998e;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .navBtn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
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
            <button onClick={() => navigate('/AddEmployee')} className="addEmpBtn">
              <span>➕</span> Add Employee
            </button>
          </div>

          <div className="empTableCard">
            {loading ? (
              <div className="loadingMsg">⏳ Loading employees...</div>
            ) : error ? (
              <div className="errorMsg">❌ {error}</div>
            ) : employees.length === 0 ? (
              <div className="emptyMsg">📋 No employees found. Click "Add Employee" to get started.</div>
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
                  {employees.map(emp => (
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
            <button onClick={() => navigate('/EmployeeDashBoardThree')} className="navBtn">
              🔍 Search Records
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmployeeDashBoardPage;