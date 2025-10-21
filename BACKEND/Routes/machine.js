const express = require('express');
const router = express.Router();
const Machinecontroller = require('../controllers/Machinecontroller'); // Adjust the path if necessary


// Define routes
router.post('/add', Machinecontroller.createmachine);
router.get('/Allread', Machinecontroller.getAllmachines);
router.get('/read/:id', Machinecontroller.getmachineById);
router.put('/update/:id', Machinecontroller.updatemachine);
router.delete('/delete/:id', Machinecontroller.deletemachine);

module.exports = router;                                                                                            