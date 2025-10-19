import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Breadcrumb from './Breadcrumb'; // Import the Breadcrumb component

const PackageList = () => {
    const [packages, setPackages] = useState([]); // State to hold packages
    const [error, setError] = useState(''); // State to hold error messages

    // Define an array of colors for the package cards
    const cardColors = [
        '#f8f9fa', // Light grey
        '#e9ecef', // Slightly darker grey
        '#f1f3f5', // Even darker grey
        '#fff3cd', // Light yellow
        '#d4edda', // Light green
        '#cce5ff', // Light blue
    ];

    // Fetch packages from backend API
    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await axios.get('http://localhost:8070/package'); // Adjust the URL based on your backend API
                setPackages(response.data); // Set the packages state with the fetched data
            } catch (err) {
                setError('Error fetching packages.'); // Handle error
                console.error(err);
            }
        };

        fetchPackages(); // Call the fetch function
    }, []); // Empty dependency array to run once on component mount

    // Function to handle deleting a package
    const deletePackage = async (id) => {
        try {
            await axios.delete(`http://localhost:8070/package/delete/id`); // Adjust the URL based on your backend API
            setPackages(packages.filter(pkg => pkg._id !== id)); // Update the state to remove the deleted package
        } catch (err) {
            setError('Error deleting package.'); // Handle error
            console.error(err);
        }
        //calling delete function creates an infinite loop
    };

    return (
        <div>
            <Breadcrumb /> {/* Display the Breadcrumb component at the top */}
            <h1>Package List</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if any */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                {packages.map((pkg, index) => (
                    <div key={pkg._id} style={{ ...cardStyle, backgroundColor: cardColors[index % cardColors.length] }}>
                        <h2>{pkg.PackageName}</h2>
                        <p>Type: {pkg.PackageType}</p>
                        <p>Description: {pkg.PackageDescription}</p>
                        <p>Material: {pkg.Material}</p>
                        <p>Dimensions: {pkg.Length} x {pkg.Width} x {pkg.Height}</p>
                        <div style={buttonContainerStyle}>
                            <button style={updateButtonStyle} onClick={() => alert(`Update package: ${pkg.PackageName}`)}>Update</button>
                            <button style={deleteButtonStyle} onClick={() => deletePackage(pkg._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Inline styles for card and buttons
const cardStyle = {
    border: '1px solid #dee2e6',
    borderRadius: '10px',
    padding: '20px',
    margin: '10px',
    width: '300px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.2s',
};

const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
};

const updateButtonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
};

const deleteButtonStyle = {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
};

export default PackageList;
