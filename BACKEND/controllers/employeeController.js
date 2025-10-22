const EmployeeProfile = require('../Models/Employee');

// Controller function for employee login
exports.loginEmployee = async (req, res) => {
  try {
    const { empID, empPassKey } = req.body;
    
    // Convert empID to number to ensure proper matching
    const empIDNumber = Number(empID);
    
    // Find employee by EmpID
    const employee = await EmployeeProfile.findOne({ EmpID: empIDNumber });
    
    if (!employee) {
      return res.status(404).json({ success: false, error: 'Employee not found' });
    }
    
    // Verify passkey
    if (Number(employee.EmpPassKey) !== Number(empPassKey)) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    
    // Successful login
    res.status(200).json({
      success: true,
      message: 'Login successful',
      employee: {
        _id: employee._id,
        EmpID: employee.EmpID,
        EmpName: employee.EmpName,
        EmpFullName: employee.EmpFullName,
        EmpPosition: employee.EmpPosition,
        EmpWage: employee.EmpWage
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, error: 'Login failed: ' + error.message });
  }
};

// Controller function to add a new employee
exports.addEmployee = async (req, res) => {
  try {
    const newEmployee = new EmployeeProfile(req.body);
    await newEmployee.save();
    res.status(201).send('Employee added successfully');
  } catch (error) {
    console.error('Error adding employee:', error);
    res.status(400).send('Error adding employee: ' + error.message);
  }
};

// Controller function to retrieve all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await EmployeeProfile.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error retrieving employees:', error);
    res.status(500).send('Error retrieving employees: ' + error.message);
  }
};

// Controller function to retrieve a single employee by EmpID
exports.getEmployeeById = async (req, res) => {
  try {
    const { empId } = req.params;
    const employee = await EmployeeProfile.findOne({ EmpID: empId });
    if (!employee) {
      return res.status(404).send('Employee not found');
    }
    res.status(200).json(employee);
  } catch (error) {
    console.error('Error retrieving employee:', error);
    res.status(500).send('Error retrieving employee: ' + error.message);
  }
};

// Controller function to delete an employee by EmpID
exports.deleteEmployeeById = async (req, res) => {
  try {
    const { empId } = req.params;
    const deletedEmployee = await EmployeeProfile.findOneAndDelete({ EmpID: empId });
    if (!deletedEmployee) {
      return res.status(404).send('Employee not found');
    }
    res.status(200).send('Employee deleted successfully');
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).send('Error deleting employee: ' + error.message);
  }
};

// Controller function to update an employee by EmpID
exports.updateEmployeeById = async (req, res) => {
  try {
    const { empId } = req.params;
    const updatedEmployee = await EmployeeProfile.findOneAndUpdate({ EmpID: empId }, req.body, { new: true });
    if (!updatedEmployee) {
      return res.status(404).send('Employee not found');
    }
    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).send('Error updating employee: ' + error.message);
  }
};