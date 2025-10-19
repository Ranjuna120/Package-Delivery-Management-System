const express = require('express');
const AttendanceProfile = require('../Models/Attendance');
const router = express.Router();

// POST: Add a new attendance record
router.post('/AddAttendance', async (req, res) => {
    try {
        const { EmpID, EmpName, WorkDate, WorkHours, OTHours } = req.body;

        // Convert WorkDate to a numeric format (YYYYMMDD)
        const date = new Date(WorkDate);
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Months are 0-indexed
        const day = date.getDate();

        // Create dateStr in YYYYMMDD format as a number
        const dateStr = year * 10000 + month * 100 + day; // YYYYMMDD
        
        // Combine EmpID and dateStr to create AttID as a string
        const AttID = Number(`${EmpID}${dateStr}`); // Concatenate as strings, then convert to number
        

        const newAttendance = new AttendanceProfile({
            AttID,
            EmpID,
            EmpName,
            WorkDate,
            WorkHours,
            OTHours,
        });

        await newAttendance.save();
        res.status(201).send('Attendance added successfully');
    } catch (error) {
        console.error('Error adding attendance:', error);
        res.status(400).send('Error adding attendance: ' + error.message);
    }
});



// GET: Retrieve all attendance records
router.get('/GetAttendance', async (req, res) => {
    console.log('GetAttendance route hit'); // Log the request
    try {
        const attendanceRecords = await AttendanceProfile.find();
        console.log('Fetched records:', attendanceRecords); // Log fetched records
        res.status(200).json(attendanceRecords);
    } catch (error) {
        console.error('Error fetching attendance records:', error);
        res.status(500).send('Error fetching attendance records: ' + error.message);
    }
});


// GET: Retrieve a single attendance record by AttID
router.get('/attendance/:attId', async (req, res) => {
    try {
        const { attId } = req.params;
        const attendanceRecord = await AttendanceProfile.findOne({ AttID: Number(attId) }); // Convert to number
        if (!attendanceRecord) {
            return res.status(404).send('Attendance record not found');
        }
        res.status(200).json(attendanceRecord);
    } catch (error) {
        console.error('Error fetching attendance record:', error);
        res.status(500).send('Error fetching attendance record: ' + error.message);
    }
});


// DELETE: Delete an attendance record by AttID
router.delete('/DelAttendance/:AttID', async (req, res) => {
    const { AttID } = req.params;

    try {
        const deletedAttendance = await AttendanceProfile.findOneAndDelete({ AttID });

        if (deletedAttendance) {
            return res.status(200).json({ message: 'Attendance record deleted successfully' });
        } else {
            return res.status(404).json({ message: 'Attendance record not found' });
        }
    } catch (error) {
        console.error('Error deleting attendance record:', error);
        return res.status(500).json({ message: 'Error deleting attendance record', error: error.message });
    }
});
// PUT: Update attendance record by EmpID and WorkDate
router.put('/attendance/:empId/:workDate', async (req, res) => {
    const { empId, workDate } = req.params;
    try {
      const attendanceRecord = await AttendanceProfile.findOneAndUpdate(
        { EmpID: empId, WorkDate: new Date(workDate) },
        req.body,
        { new: true } // Return the updated document
      );
  
      if (!attendanceRecord) {
        return res.status(404).send('Attendance record not found');
      }
      
      res.status(200).json(attendanceRecord);
    } catch (error) {
      console.error('Error updating attendance record:', error);
      res.status(500).send('Error updating attendance record: ' + error.message);
    }
  });
  

module.exports = router;
