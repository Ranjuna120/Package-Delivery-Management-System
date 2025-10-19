import React, { useState } from 'react';
import axios from 'axios';
import Breadcrumb from './Breadcrumb'; // Import the Breadcrumb component

function CreatePackage() {
    const [formData, setFormData] = useState({
        PackageName: '',
        PackageType: '',
        PackageDescription: '',  
        Material: '',
        Length: '',
        Width: '',
        Height: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.PackageName) newErrors.PackageName = "Package name is required.";
        if (!formData.PackageType) newErrors.PackageType = "Package type is required.";
        if (!formData.PackageDescription) newErrors.PackageDescription = "Package description is required.";
        if (!formData.Material) newErrors.Material = "Material is required.";

        if (!formData.Length) {
            newErrors.Length = "Length is required.";
        } else if (formData.Length <= 0) {
            newErrors.Length = "Length must be greater than zero.";
        }

        if (!formData.Width) {
            newErrors.Width = "Width is required.";
        } else if (formData.Width <= 0) {
            newErrors.Width = "Width must be greater than zero.";
        }

        if (!formData.Height) {
            newErrors.Height = "Height is required.";
        } else if (formData.Height <= 0) {
            newErrors.Height = "Height must be greater than zero.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; 
    };

    const sendData = (e) => {
        e.preventDefault();

        if (validate()) {
            const newPackage = {
                PackageName: formData.PackageName,
                PackageType: formData.PackageType,
                PackageDescription: formData.PackageDescription,
                Material: formData.Material,
                Length: formData.Length,
                Width: formData.Width,
                Height: formData.Height
            };

            axios.post('http://localhost:8070/package/create', newPackage).then(() => {
                alert("Package added");
                window.location.reload();
            }).catch((err) => {
                alert(err);
            });
        }
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9'
    };

    const formGroupStyle = {
        marginBottom: '15px',
    };

    const labelStyle = {
        marginBottom: '5px',
        fontWeight: 'bold'
    };

    const inputStyle = {
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '100%',
        boxSizing: 'border-box'
    };

    const errorStyle = {
        color: 'red',
        fontSize: '12px',
        marginTop: '5px'
    };

    const dimensionsStyle = {
        display: 'flex',
        justifyContent: 'space-between',
    };

    const dimensionInputStyle = {
        width: '30%',
    };

    const buttonStyle = {
        padding: '10px 15px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    };

    return (
        <div>
            <Breadcrumb /> {/* Include the Breadcrumb component */}
            <form onSubmit={sendData} style={formStyle}>
                <div style={formGroupStyle}>
                    <label htmlFor="PackageName" style={labelStyle}>Package Name:</label>
                    <input
                        type="text"
                        id="PackageName"
                        name="PackageName"
                        value={formData.PackageName}
                        onChange={handleChange}
                        style={inputStyle}
                        required />
                    {errors.PackageName && <div style={errorStyle}>{errors.PackageName}</div>}
                </div>

                <div style={formGroupStyle}>
                    <label htmlFor="PackageType" style={labelStyle}>Package Type:</label>
                    <input
                        type="text"
                        id="PackageType"
                        name="PackageType"
                        value={formData.PackageType}
                        onChange={handleChange}
                        style={inputStyle}
                        required />
                    {errors.PackageType && <div style={errorStyle}>{errors.PackageType}</div>}
                </div>

                <div style={formGroupStyle}>
                    <label htmlFor="PackageDescription" style={labelStyle}>Package Description:</label>
                    <input
                        type="text"
                        id="PackageDescription"
                        name="PackageDescription"
                        value={formData.PackageDescription}
                        onChange={handleChange}
                        style={inputStyle}
                        required />
                    {errors.PackageDescription && <div style={errorStyle}>{errors.PackageDescription}</div>}
                </div>

                <div style={formGroupStyle}>
                    <label htmlFor="Material" style={labelStyle}>Material:</label>
                    <input
                        type="text"
                        id="Material"
                        name="Material"
                        value={formData.Material}
                        onChange={handleChange}
                        style={inputStyle}
                        required />
                    {errors.Material && <div style={errorStyle}>{errors.Material}</div>}
                </div>

                <div style={formGroupStyle}>
                    <label style={labelStyle}>Dimensions:</label>
                    <div style={dimensionsStyle}>
                        <div style={dimensionInputStyle}>
                            <label htmlFor="Length" style={labelStyle}>Length:</label>
                            <input
                                type="number"
                                id="Length"
                                name="Length"
                                value={formData.Length}
                                onChange={handleChange}
                                style={inputStyle}
                                required />
                            {errors.Length && <div style={errorStyle}>{errors.Length}</div>}
                        </div>
                        <div style={dimensionInputStyle}>
                            <label htmlFor="Width" style={labelStyle}>Width:</label>
                            <input
                                type="number"
                                id="Width"
                                name="Width"
                                value={formData.Width}
                                onChange={handleChange}
                                style={inputStyle}
                                required />
                            {errors.Width && <div style={errorStyle}>{errors.Width}</div>}
                        </div>
                        <div style={dimensionInputStyle}>
                            <label htmlFor="Height" style={labelStyle}>Height:</label>
                            <input
                                type="number"
                                id="Height"
                                name="Height"
                                value={formData.Height}
                                onChange={handleChange}
                                style={inputStyle}
                                required />
                            {errors.Height && <div style={errorStyle}>{errors.Height}</div>}
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    style={buttonStyle}
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default CreatePackage;
