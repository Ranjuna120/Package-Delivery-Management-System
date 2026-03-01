import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from './Breadcrumb'; // Import the Breadcrumb component
import '../../style/package/PackageDashBoard.css';

function CreatePackage() {
    const navigate = useNavigate();
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
    const [loading, setLoading] = useState(false);

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
            setLoading(true);
            const newPackage = {
                PackageName: formData.PackageName,
                PackageType: formData.PackageType,
                PackageDescription: formData.PackageDescription,
                Material: formData.Material,
                Length: formData.Length,
                Width: formData.Width,
                Height: formData.Height
            };

            axios.post('http://localhost:8070/packages/create', newPackage).then(() => {
                alert("Package added successfully!");
                setTimeout(() => {
                    navigate('/PackageDashBoardPage');
                }, 1000);
            }).catch((err) => {
                const errorMessage = err.response?.data?.error || err.message || "Failed to create package";
                alert(`Error: ${errorMessage}`);
                console.error('Full error:', err);
                console.error('Error response:', err.response);
            }).finally(() => {
                setLoading(false);
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
        <div style={styles.container}>
            <div style={styles.mainContent}>
                <div style={styles.contentWrapper}>
                    <Breadcrumb /> {/* Include the Breadcrumb component */}
                    
                    {/* Header */}
                    <div style={styles.header}>
                        <button 
                            style={styles.backBtn}
                            className="package-back-btn"
                            onClick={() => navigate('/PackageDashBoardPage')}
                        >
                            ← BACK
                        </button>
                        <div>
                            <h1 style={styles.title}>Create New Package</h1>
                            <p style={styles.subtitle}>Fill in all package details</p>
                        </div>
                    </div>

                    {/* Form Container */}
                    <div style={styles.formContainer}>
                        <form onSubmit={sendData}>
                            <div style={styles.formGrid}>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Package Name <span style={styles.required}>*</span></label>
                                    <input
                                        type="text"
                                        name="PackageName"
                                        value={formData.PackageName}
                                        onChange={handleChange}
                                        style={styles.input}
                                        className="package-input"
                                        placeholder="Enter package name"
                                        required
                                    />
                                    {errors.PackageName && <div style={styles.error}>{errors.PackageName}</div>}
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Package Type <span style={styles.required}>*</span></label>
                                    <input
                                        type="text"
                                        name="PackageType"
                                        value={formData.PackageType}
                                        onChange={handleChange}
                                        style={styles.input}
                                        className="package-input"
                                        placeholder="Enter package type"
                                        required
                                    />
                                    {errors.PackageType && <div style={styles.error}>{errors.PackageType}</div>}
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Material <span style={styles.required}>*</span></label>
                                    <input
                                        type="text"
                                        name="Material"
                                        value={formData.Material}
                                        onChange={handleChange}
                                        style={styles.input}
                                        className="package-input"
                                        placeholder="Enter material"
                                        required
                                    />
                                    {errors.Material && <div style={styles.error}>{errors.Material}</div>}
                                </div>

                                <div style={{...styles.formGroup, gridColumn: '1 / -1'}}>
                                    <label style={styles.label}>Package Description <span style={styles.required}>*</span></label>
                                    <textarea
                                        name="PackageDescription"
                                        value={formData.PackageDescription}
                                        onChange={handleChange}
                                        style={{...styles.input, ...styles.textarea}}
                                        className="package-input"
                                        placeholder="Enter package description"
                                        rows="4"
                                        required
                                    />
                                    {errors.PackageDescription && <div style={styles.error}>{errors.PackageDescription}</div>}
                                </div>

                                <div style={styles.dimensionsContainer}>
                                    <h3 style={styles.dimensionsTitle}>Dimensions</h3>
                                    <div style={styles.dimensionsGrid}>
                                        <div style={styles.formGroup}>
                                            <label style={styles.label}>Length <span style={styles.required}>*</span></label>
                                            <input
                                                type="number"
                                                name="Length"
                                                value={formData.Length}
                                                onChange={handleChange}
                                                style={styles.input}
                                                className="package-input"
                                                placeholder="0"
                                                required
                                            />
                                            {errors.Length && <div style={styles.error}>{errors.Length}</div>}
                                        </div>
                                        <div style={styles.formGroup}>
                                            <label style={styles.label}>Width <span style={styles.required}>*</span></label>
                                            <input
                                                type="number"
                                                name="Width"
                                                value={formData.Width}
                                                onChange={handleChange}
                                                style={styles.input}
                                                className="package-input"
                                                placeholder="0"
                                                required
                                            />
                                            {errors.Width && <div style={styles.error}>{errors.Width}</div>}
                                        </div>
                                        <div style={styles.formGroup}>
                                            <label style={styles.label}>Height <span style={styles.required}>*</span></label>
                                            <input
                                                type="number"
                                                name="Height"
                                                value={formData.Height}
                                                onChange={handleChange}
                                                style={styles.input}
                                                className="package-input"
                                                placeholder="0"
                                                required
                                            />
                                            {errors.Height && <div style={styles.error}>{errors.Height}</div>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={styles.buttonGroup}>
                                <button 
                                    type="button" 
                                    style={styles.cancelBtn}
                                    className="package-cancel-btn"
                                    onClick={() => navigate('/PackageDashBoardPage')}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    style={styles.submitBtn}
                                    className="package-submit-btn"
                                    disabled={loading}
                                >
                                    {loading ? 'Creating...' : 'Create Package'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Styles
const styles = {
    container: {
        display: 'flex',
        minHeight: '100vh',
        background: '#f8f9fa',
        fontFamily: "'Roboto', sans-serif",
    },
    mainContent: {
        flex: 1,
        padding: '40px 20px',
    },
    contentWrapper: {
        maxWidth: '900px',
        margin: '0 auto',
    },
    header: {
        marginTop: '20px',
        marginBottom: '30px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
    },
    backBtn: {
        padding: '10px 20px',
        background: '#6c757d',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        fontWeight: '600',
        cursor: 'pointer',
        fontSize: '14px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        transition: 'all 0.3s ease',
    },
    title: {
        fontSize: '32px',
        fontWeight: '700',
        color: '#2C3E50',
        margin: 0,
    },
    subtitle: {
        fontSize: '16px',
        color: '#7F8C8D',
        margin: '8px 0 0 0',
    },
    formContainer: {
        background: '#fff',
        borderRadius: '12px',
        padding: '40px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        border: '1px solid #e9ecef',
    },
    formGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '24px',
        marginBottom: '30px',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#2C3E50',
        marginBottom: '8px',
    },
    required: {
        color: '#e74c3c',
    },
    input: {
        padding: '12px 16px',
        borderRadius: '8px',
        border: '2px solid #e0e0e0',
        fontSize: '15px',
        transition: 'all 0.3s ease',
        outline: 'none',
        fontFamily: "'Roboto', sans-serif",
    },
    textarea: {
        resize: 'vertical',
        minHeight: '100px',
    },
    error: {
        color: '#e74c3c',
        fontSize: '12px',
        marginTop: '5px',
        fontWeight: '500',
    },
    dimensionsContainer: {
        gridColumn: '1 / -1',
        padding: '20px',
        background: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #e9ecef',
    },
    dimensionsTitle: {
        fontSize: '18px',
        fontWeight: '600',
        color: '#2C3E50',
        marginBottom: '16px',
        marginTop: 0,
    },
    dimensionsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
    },
    buttonGroup: {
        display: 'flex',
        gap: '12px',
        justifyContent: 'flex-end',
        marginTop: '24px',
    },
    cancelBtn: {
        padding: '12px 32px',
        background: '#6c757d',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '15px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    },
    submitBtn: {
        padding: '12px 32px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '15px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    },
};

export default CreatePackage;
