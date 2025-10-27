// Test script to add a sample employee to the database
const mongoose = require('mongoose');
require('dotenv').config();

const Employee = require('./Models/Employee');

const URL = process.env.MONGODB_URL;

mongoose.connect(URL);

const connection = mongoose.connection;
connection.once("open", async () => {
    console.log("MongoDB Connection Success");
    
    // Create a test employee
    const testEmployee = new Employee({
        EmpID: 1001,
        EmpName: "John",
        EmpFullName: "John Smith",
        EmpAddress: "123 Main Street, Colombo",
        EmpQualifications: "Bachelor's Degree",
        EmpExperience: "3 years",
        EmpPosition: "Delivery Manager",
        EmpWage: 50000,
        EmpJoin: new Date(),
        EmpPassKey: 1234
    });

    try {
        await testEmployee.save();
        console.log("✅ Test employee added successfully!");
        console.log("-----------------------------------");
        console.log("Login credentials:");
        console.log("EmpID: 1001");
        console.log("PassKey: 1234");
        console.log("-----------------------------------");
    } catch (error) {
        console.error("❌ Error adding employee:", error.message);
    }
    
    mongoose.connection.close();
});
