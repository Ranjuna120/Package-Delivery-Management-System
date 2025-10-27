const express = require('express');
const attendanceController = require('../controllers/attendanceController'); // Import the controller
const router = express.Router();

//Add a new attendance record
router.post('/AddAttendance', attendanceController.addAttendance);

//Retrieve all attendance records
router.get('/GetAttendance', attendanceController.getAllAttendance);

//Retrieve a single attendance record by AttID
router.get('/attendance/:attId', attendanceController.getAttendanceById);

//Delete an attendance record by AttID
router.delete('/DelAttendance/:AttID', attendanceController.deleteAttendanceById);

//Update attendance record by EmpID and WorkDate
router.put('/attendance/:empId/:workDate', attendanceController.updateAttendanceByIdAndDate);

module.exports = router;