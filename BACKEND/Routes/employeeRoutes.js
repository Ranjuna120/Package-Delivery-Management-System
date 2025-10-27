const express = require('express');
const employeeController = require('../controllers/employeeController'); // Import the controller
const router = express.Router();

// Employee login
router.post('/employees/login', employeeController.loginEmployee);

//Add a new employee
router.post('/AddEmployee', employeeController.addEmployee);

// GET: Retrieve all employees
router.get('/employees', employeeController.getAllEmployees);

// GET: Retrieve a single employee by EmpID
router.get('/employees/:empId', employeeController.getEmployeeById);

// DELETE: Delete an employee by EmpID
router.delete('/employees/:empId', employeeController.deleteEmployeeById);

//Update an employee by EmpID
router.put('/employees/:empId', employeeController.updateEmployeeById);

module.exports = router;