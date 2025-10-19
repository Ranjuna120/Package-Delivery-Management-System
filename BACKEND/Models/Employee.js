const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  EmpID: { type: Number, required: true },
  EmpName: { type: String, required: true },
  EmpFullName: { type: String, required: true },
  EmpAddress: { type: String },
  EmpQualifications: { type: String },
  EmpExperience: { type: String },
  EmpPosition: { type: String },
  EmpWage: { type: Number, required: true },
  EmpJoin: { type: Date },
  EmpPassKey: { type: Number }
});

module.exports = mongoose.model('Employee', employeeSchema);
