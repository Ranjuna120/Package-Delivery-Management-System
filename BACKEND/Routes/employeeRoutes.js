const express = require('express');
const EmployeeProfile = require('../Models/Employee');
const router = express.Router();

// POST: Add a new employee
router.post('/AddEmployee', async (req, res) => {
  try {
    const newEmployee = new EmployeeProfile(req.body);
    await newEmployee.save();
    res.status(201).send('Employee added successfully');
  } catch (error) {
    console.error('Error adding employee in the routes section:', error);
    res.status(400).send('Error adding employee: ' + error.message);
  }
});

// GET: Retrieve all employees
router.get('/employees', async (req, res) => {
  try {
    const employees = await EmployeeProfile.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error retrieving employees:', error);
    res.status(500).send('Error retrieving employees: ' + error.message);
  }
});

// GET: Retrieve a single employee by EmpID
router.get('/employees/:empId', async (req, res) => {
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
});

// DELETE: Delete an employee by EmpID
router.delete('/employees/:empId', async (req, res) => {
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
});

// PUT: Update an employee by EmpID
router.put('/employees/:empId', async (req, res) => {
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
});




module.exports = router;
