const express = require('express');
const router = express.Router();
const PmProfileeController = require('../controllers/PMprofileController'); // Ensure this path is correct

// Route to add a new PM profile
router.post('/add', PmProfileeController.createPmProfilee);

// Route to get all PM profiles
router.get('/all', PmProfileeController.getAllPmProfilees);

// Route to update a PM profile by ID
router.put('/update/:id', PmProfileeController.updatePmProfilee);

// Route to delete a PM profile by ID
router.delete('/delete/:id', PmProfileeController.deletePmProfilee);

// Route to get a PM profile by ID
router.get('/:id', PmProfileeController.getPmProfileeById);

module.exports = router; // Ensure this exports the router correctly