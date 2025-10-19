const router = require('express').Router(); // Import express router
const packageController = require('../controllers/packageController'); // Import the package controller

// Route to create a new package
// POST /create
// Calls the 'createPackage' method from the controller
router.post('/create', packageController.createPackage);

// Route to get all packages
// GET /
// Calls the 'getAllPackages' method from the controller
router.get('/', packageController.getAllPackages);

// Route to update an existing package by ID
// PUT /update/:package_id
// Calls the 'updatePackage' method from the controller
router.put('/update/:package_id', packageController.updatePackage);

// Route to delete a package by ID
// DELETE /delete/:package_id
// Calls the 'deletePackage' method from the controller
router.delete('/delete/:package_id', packageController.deletePackage);

// Route to get a package by ID
// GET /get/:package_id
// Calls the 'getPackageById' method from the controller
router.get('/get/:package_id', packageController.getPackageById);

module.exports = router; // Export the router for use in the main application
