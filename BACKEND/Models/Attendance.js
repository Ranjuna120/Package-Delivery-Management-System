const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  AttID: { type: Number, required: true },
  EmpID: { type: Number, required: true },
  EmpName: { type: String, required: true },
  WorkDate: { type: Date, required: true },
  WorkHours: { type: Number, required: true },
  OTHours: { type: Number },
});

module.exports = mongoose.model('Attendance', attendanceSchema);
