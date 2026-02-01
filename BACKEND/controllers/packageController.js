const Package = require('../Models/Package'); // Import the Package model

// Create a new package
const createPackage = async (req, res) => {
  try {
    console.log('Received package creation request:', req.body);
    const { PackageName, PackageType, PackageDescription, Material, Length, Width, Height } = req.body;

    // Validate input
    if (!PackageName || !PackageType || !Material || !Length || !Width || !Height) {
      return res.status(400).json({ error: 'All required fields must be provided.' });
    }

    if (Length <= 0 || Width <= 0 || Height <= 0) {
      return res.status(400).json({ error: 'Length, Width, and Height must be positive numbers.' });
    }

    // Create new package
    const newPackage = new Package({
      PackageName,
      PackageType,
      PackageDescription,
      Material,
      Length,
      Width,
      Height
    });

    // Save package to the database
    const savedPackage = await newPackage.save();
    console.log('Package created successfully:', savedPackage);
    res.status(201).json(savedPackage);
  } catch (error) {
    console.error('Error creating package:', error);
    res.status(500).json({ error: 'Server error while creating the package.' });
  }
};

// Get all packages
const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching packages.' });
  }
};

// Get a package by ID
const getPackageById = async (req, res) => {
  try {
    const { package_id } = req.params;
    const package = await Package.findById(package_id);

    if (!package) {
      return res.status(404).json({ error: 'Package not found.' });
    }

    res.status(200).json(package);
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching the package.' });
  }
};

// Update a package
const updatePackage = async (req, res) => {
  try {
    const { package_id } = req.params;
    const { PackageName, PackageType, PackageDescription, Material, Length, Width, Height, status } = req.body;

    // Validate input
    if (!PackageName || !PackageType || !Material || !Length || !Width || !Height) {
      return res.status(400).json({ error: 'All required fields must be provided.' });
    }

    if (Length <= 0 || Width <= 0 || Height <= 0) {
      return res.status(400).json({ error: 'Length, Width, and Height must be positive numbers.' });
    }

    const updatedPackage = await Package.findByIdAndUpdate(
      package_id,
      { PackageName, PackageType, PackageDescription, Material, Length, Width, Height, status },
      { new: true } // Return the updated package
    );

    if (!updatedPackage) {
      return res.status(404).json({ error: 'Package not found.' });
    }

    res.status(200).json(updatedPackage);
  } catch (error) {
    res.status(500).json({ error: 'Server error while updating the package.' });
  }
};

// Delete a package
const deletePackage = async (req, res) => {
  try {
    const { package_id } = req.params;
    const deletedPackage = await Package.findByIdAndDelete(package_id);

    if (!deletedPackage) {
      return res.status(404).json({ error: 'Package not found.' });
    }

    res.status(200).json({ message: 'Package deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Server error while deleting the package.' });
  }
};

module.exports = {
  createPackage,
  getAllPackages,
  getPackageById,
  updatePackage,
  deletePackage
};
//janith