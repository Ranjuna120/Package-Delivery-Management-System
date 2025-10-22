import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddEmployee() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    EmpID: '',
    EmpName: '',
    EmpFullName: '',
    EmpAddress: '',
    EmpQualifications: '',
    EmpExperience: '',
    EmpPosition: '',
    EmpWage: '',
    EmpJoin: '',
    EmpPassKey: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const validate = () => {
    const newErrors = {};

    // Validate EmpID (4-digit number)
    if (!/^\d{4}$/.test(formData.EmpID)) {
      newErrors.EmpID = 'Employee ID must be a 4-digit number';
    }

    // Validate EmpPosition (no numbers allowed)
    if (/\d/.test(formData.EmpPosition)) {
      newErrors.EmpPosition = 'Position cannot contain numbers';
    }

    // Validate EmpPassKey (4-digit number)
    if (!/^\d{4}$/.test(formData.EmpPassKey)) {
      newErrors.EmpPassKey = 'PassKey must be a 4-digit number';
    }

    // Validate EmpWage (positive number)
    if (formData.EmpWage === '' || formData.EmpWage <= 0) {
      newErrors.EmpWage = 'Salary/Wage must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Run validation
    if (!validate()) {
      return;
    }

    try {
      const response = await fetch('http://localhost:8070/api/AddEmployee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert('Employee added successfully');
        navigate('/EmployeeDashBoardPage');
      } else {
        const errorText = await response.text();
        console.error('Server error:', errorText);
        alert('Failed to add employee: ' + errorText);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding employee: ' + error.message);
    }
  };

  return (
    <>
      <style>{`
        body {
          background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%) !important;
          min-height: 100vh !important;
          margin: 0 !important;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
        }
        .addEmpContainer {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 30px 20px;
        }
        .addEmpCard {
          background: white;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          padding: 40px;
          max-width: 700px;
          width: 100%;
        }
        .addEmpHeader {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #f0f0f0;
        }
        .addEmpIcon {
          width: 70px;
          height: 70px;
          margin: 0 auto 15px;
          border-radius: 50%;
          background: linear-gradient(135deg, #11998e, #38ef7d);
          display: flex;
          align-items: center;
          justify-content: center;
          fontSize: 35px;
          box-shadow: 0 4px 12px rgba(17, 153, 142, 0.3);
        }
        .addEmpTitle {
          color: #11998e;
          fontSize: 26px;
          fontWeight: 700;
          margin: 0 0 5px 0;
        }
        .addEmpSubtitle {
          color: #6c757d;
          fontSize: 13px;
          margin: 0;
        }
        .formGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
          margin-bottom: 18px;
        }
        .formGroup {
          display: flex;
          flex-direction: column;
        }
        .formGroup.full {
          grid-column: 1 / -1;
        }
        .formLabel {
          display: block;
          fontSize: 13px;
          fontWeight: 600;
          color: #333;
          marginBottom: 6px;
        }
        .formInput {
          width: 100%;
          padding: 12px 14px;
          fontSize: 14px;
          border: 2px solid #e0e0e0;
          borderRadius: 8px;
          transition: all 0.3s ease;
          outline: none;
          background: white;
        }
        .formInput:focus {
          border-color: #11998e;
          box-shadow: 0 0 0 3px rgba(17, 153, 142, 0.1);
        }
        .errorMsg {
          color: #c33;
          fontSize: 12px;
          marginTop: 4px;
        }
        .buttonGroup {
          display: flex;
          gap: 12px;
          marginTop: 25px;
          justifyContent: flex-end;
        }
        .btn {
          padding: 13px 24px;
          fontSize: 15px;
          fontWeight: 600;
          border: none;
          borderRadius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .btnBack {
          background: #e9f1f7;
          color: #2c3e50;
        }
        .btnBack:hover {
          background: #d4e4ed;
          transform: translateY(-2px);
        }
        .btnSubmit {
          background: linear-gradient(135deg, #11998e, #38ef7d);
          color: white;
          box-shadow: 0 4px 12px rgba(17, 153, 142, 0.4);
        }
        .btnSubmit:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(17, 153, 142, 0.5);
        }
      `}</style>

      <div className="addEmpContainer">
        <div className="addEmpCard">
          <div className="addEmpHeader">
            <div className="addEmpIcon">👤</div>
            <h1 className="addEmpTitle">Add New Employee</h1>
            <p className="addEmpSubtitle">Fill in the details to add a new employee to the system</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="formGrid">
              <div className="formGroup">
                <label className="formLabel">🆔 Employee ID *</label>
                <input
                  type="number"
                  id="EmpID"
                  className="formInput"
                  placeholder="4-digit ID (e.g., 1002)"
                  value={formData.EmpID}
                  onChange={handleChange}
                  required
                />
                {errors.EmpID && <div className="errorMsg">{errors.EmpID}</div>}
              </div>

              <div className="formGroup">
                <label className="formLabel">👤 Short Name *</label>
                <input
                  type="text"
                  id="EmpName"
                  className="formInput"
                  placeholder="Short name"
                  value={formData.EmpName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="formGroup full">
                <label className="formLabel">📝 Full Name *</label>
                <input
                  type="text"
                  id="EmpFullName"
                  className="formInput"
                  placeholder="Full legal name"
                  value={formData.EmpFullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="formGroup full">
                <label className="formLabel">📍 Address</label>
                <input
                  type="text"
                  id="EmpAddress"
                  className="formInput"
                  placeholder="Residential address"
                  value={formData.EmpAddress}
                  onChange={handleChange}
                />
              </div>

              <div className="formGroup">
                <label className="formLabel">🎓 Qualifications</label>
                <input
                  type="text"
                  id="EmpQualifications"
                  className="formInput"
                  placeholder="Educational qualifications"
                  value={formData.EmpQualifications}
                  onChange={handleChange}
                />
              </div>

              <div className="formGroup">
                <label className="formLabel">💼 Experience</label>
                <input
                  type="text"
                  id="EmpExperience"
                  className="formInput"
                  placeholder="Years of experience"
                  value={formData.EmpExperience}
                  onChange={handleChange}
                />
              </div>

              <div className="formGroup">
                <label className="formLabel">🏢 Position *</label>
                <input
                  type="text"
                  id="EmpPosition"
                  className="formInput"
                  placeholder="Job position"
                  value={formData.EmpPosition}
                  onChange={handleChange}
                  required
                />
                {errors.EmpPosition && <div className="errorMsg">{errors.EmpPosition}</div>}
              </div>

              <div className="formGroup">
                <label className="formLabel">💰 Salary/Wage *</label>
                <input
                  type="number"
                  id="EmpWage"
                  className="formInput"
                  placeholder="Monthly salary"
                  value={formData.EmpWage}
                  onChange={handleChange}
                  required
                />
                {errors.EmpWage && <div className="errorMsg">{errors.EmpWage}</div>}
              </div>

              <div className="formGroup">
                <label className="formLabel">📅 Join Date</label>
                <input
                  type="date"
                  id="EmpJoin"
                  className="formInput"
                  value={formData.EmpJoin}
                  onChange={handleChange}
                />
              </div>

              <div className="formGroup">
                <label className="formLabel">🔑 PassKey *</label>
                <input
                  type="password"
                  id="EmpPassKey"
                  className="formInput"
                  placeholder="4-digit PassKey"
                  value={formData.EmpPassKey}
                  onChange={handleChange}
                  required
                />
                {errors.EmpPassKey && <div className="errorMsg">{errors.EmpPassKey}</div>}
              </div>
            </div>

            <div className="buttonGroup">
              <button
                className="btn btnBack"
                type="button"
                onClick={() => navigate('/EmployeeDashBoardPage')}
              >
                ← Go Back
              </button>
              <button className="btn btnSubmit" type="submit">
                ✓ Add Employee
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddEmployee;