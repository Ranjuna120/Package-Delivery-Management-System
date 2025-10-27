const express = require('express');
const router = express.Router();
const MachineOrderqueuecontroller = require('../controllers/MachineOrderqueuecontroller'); // Adjust the path if necessary


// Define routes
router.post('/add', MachineOrderqueuecontroller.createorder);
router.get('/Allread', MachineOrderqueuecontroller.getAllorders);
router.get('/read/:id', MachineOrderqueuecontroller.getorderById);
router.put('/update/:id', MachineOrderqueuecontroller.updateorder);
router.delete('/delete/:id', MachineOrderqueuecontroller.deleteorder);

module.exports = router;                                                                                            