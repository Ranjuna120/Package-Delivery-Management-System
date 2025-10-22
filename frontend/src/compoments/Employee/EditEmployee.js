import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditEmployee() {
  const navigate = useNavigate();
  const { empId } = useParams(); // Get EmpID from URL parameters
  const [employee, setEmployee] = useState({/* initial state */});
   

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:8070/api/employees/${empId}`);
        if (response.ok) {
          const data = await response.json();
          setEmployee(data);
        } else {
          console.error('Failed to fetch employee:', response.status);
        }
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    };

    fetchEmployee();
  }, [empId]);


  const handleChange = (e) => {
    const { id, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8070/api/employees/${employee.EmpID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
      });

      if (response.ok) {
        alert('Employee updated successfully');
        navigate('/EmployeeDashBoardPage'); // Navigate back after success
      } else {
        const errorText = await response.text();
        alert('Failed to update employee: ' + errorText);
      }
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  return (
    <>
      <style>
        {`
          body {
            background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%) !important;
            min-height: 100vh !important;
            margin: 0 !important;
          }

          .editEmpContainer {
            min-height: 100vh;
            padding: 40px 20px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .editEmpCard {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            max-width: 900px;
            width: 100%;
            padding: 0;
            overflow: hidden;
          }

          .editEmpHeader {
            background: linear-gradient(135deg, #11998e, #38ef7d);
            padding: 30px;
            text-align: center;
            color: white;
          }

          .editEmpHeader h1 {
            margin: 0;
            font-size: 32px;
            font-weight: 800;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
          }

          .editEmpHeader p {
            margin: 8px 0 0;
            font-size: 14px;
            opacity: 0.95;
          }

          .editEmpForm {
            padding: 40px;
          }

          .editFormGrid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
            margin-bottom: 30px;
          }

          .editFormGroup {
            display: flex;
            flex-direction: column;
          }

          .editFormGroup.fullWidth {
            grid-column: 1 / -1;
          }

          .editFormGroup label {
            font-weight: 700;
            color: #2c3e50;
            margin-bottom: 8px;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 6px;
          }

          .editFormGroup input {
            padding: 12px 16px;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            font-size: 15px;
            transition: all 0.3s ease;
            background: #f8f9fa;
          }

          .editFormGroup input:focus {
            outline: none;
            border-color: #11998e;
            background: white;
            box-shadow: 0 0 0 4px rgba(17, 153, 142, 0.1);
          }

          .editFormGroup input:read-only {
            background: #e9ecef;
            cursor: not-allowed;
            color: #6c757d;
          }

          .editBtnContainer {
            display: flex;
            gap: 16px;
            justify-content: center;
            padding-top: 20px;
            border-top: 2px solid #f0f0f0;
          }

          .editBtn {
            padding: 14px 32px;
            border: none;
            border-radius: 10px;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          }

          .editBtn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
          }

          .editBtnBack {
            background: #6c757d;
            color: white;
          }

          .editBtnBack:hover {
            background: #5a6268;
          }

          .editBtnSubmit {
            background: linear-gradient(135deg, #11998e, #38ef7d);
            color: white;
          }

          .editBtnSubmit:hover {
            background: linear-gradient(135deg, #0d7a6f, #2dd164);
          }

          @media (max-width: 768px) {
            .editFormGrid {
              grid-template-columns: 1fr;
            }
            
            .editEmpCard {
              margin: 20px;
            }
            
            .editEmpForm {
              padding: 25px;
            }
          }
        `}
      </style>
      
      <div className="editEmpContainer">
        <div className="editEmpCard">
          <div className="editEmpHeader">
            <h1>
              <span>✏️</span> Edit Employee Profile
            </h1>
            <p>Update employee information and save changes</p>
          </div>

          <form onSubmit={handleSubmit} className="editEmpForm">
            <div className="editFormGrid">
              <div className="editFormGroup">
                <label htmlFor="EmpID">
                  <span>🆔</span> Employee ID
                </label>
                <input type="text" id="EmpID" value={employee.EmpID || ''} readOnly />
              </div>

              <div className="editFormGroup">
                <label htmlFor="EmpName">
                  <span>👤</span> Employee Name
                </label>
                <input 
                  type="text" 
                  id="EmpName" 
                  value={employee.EmpName || ''} 
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="editFormGroup fullWidth">
                <label htmlFor="EmpFullName">
                  <span>📝</span> Full Name
                </label>
                <input 
                  type="text" 
                  id="EmpFullName" 
                  value={employee.EmpFullName || ''} 
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="editFormGroup fullWidth">
                <label htmlFor="EmpAddress">
                  <span>🏠</span> Address
                </label>
                <input 
                  type="text" 
                  id="EmpAddress" 
                  value={employee.EmpAddress || ''} 
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="editFormGroup">
                <label htmlFor="EmpQualifications">
                  <span>🎓</span> Qualifications
                </label>
                <input 
                  type="text" 
                  id="EmpQualifications" 
                  value={employee.EmpQualifications || ''} 
                  onChange={handleChange}
                />
              </div>

              <div className="editFormGroup">
                <label htmlFor="EmpExperience">
                  <span>💼</span> Experience
                </label>
                <input 
                  type="text" 
                  id="EmpExperience" 
                  value={employee.EmpExperience || ''} 
                  onChange={handleChange}
                />
              </div>

              <div className="editFormGroup">
                <label htmlFor="EmpPosition">
                  <span>👔</span> Position
                </label>
                <input 
                  type="text" 
                  id="EmpPosition" 
                  value={employee.EmpPosition || ''} 
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="editFormGroup">
                <label htmlFor="EmpWage">
                  <span>💰</span> Salary/Wage (Rs.)
                </label>
                <input 
                  type="number" 
                  id="EmpWage" 
                  value={employee.EmpWage || ''} 
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="editFormGroup">
                <label htmlFor="EmpJoin">
                  <span>📅</span> Join Date
                </label>
                <input 
                  type="date" 
                  id="EmpJoin" 
                  value={employee.EmpJoin ? employee.EmpJoin.split('T')[0] : ''} 
                  onChange={handleChange}
                />
              </div>

              <div className="editFormGroup">
                <label htmlFor="EmpPassKey">
                  <span>🔐</span> PassKey
                </label>
                <input 
                  type="password" 
                  id="EmpPassKey" 
                  value={employee.EmpPassKey || ''} 
                  onChange={handleChange}
                  placeholder="Leave empty to keep current"
                />
              </div>
            </div>

            <div className="editBtnContainer">
              <button 
                className="editBtn editBtnBack" 
                type="button" 
                onClick={() => navigate('/EmployeeDashBoardPage')}
              >
                <span>←</span> Go Back
              </button>
              <button className="editBtn editBtnSubmit" type="submit">
                <span>💾</span> Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditEmployee;