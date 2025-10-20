const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config();

const feedbackRoutes = require('./Routes/feedbackRoutes.js');  
const customerRoutes = require('./Routes/customerRoutes.js');
const employeeRoutes = require('./Routes/employeeRoutes.js');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use(express.static('public')); // Assuming you store PDF files in 'public' folder


// Routes
app.use('/api/feedback', feedbackRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api', employeeRoutes);

// Database connection
const PORT = process.env.PORT || 8070;
const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB Connection Success");
});


app.listen(PORT, () => {
    console.log(`Server is up and running on Port: ${PORT}`);
});