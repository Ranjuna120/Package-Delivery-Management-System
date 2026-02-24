import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../style/package/PackageDashBoard.css';

const CreatePackage = () => {
    const navigate = useNavigate();
    const [packageData, setPackageData] = useState({
        PackageName: '',
        PackageType: '',
        PackageDescription: '',
        Material: '',
        Length: '',
        Width: '',
        Height: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPackageData({
            ...packageData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('http://localhost:8070/packages/create', packageData);
            alert('Package created successfully!');
            setPackageData({
                PackageName: '',
                PackageType: '',
                PackageDescription: '',
                Material: '',
                Length: '',
                Width: '',
                Height: ''
            });
            // Navigate back to dashboard after 1 second
            setTimeout(() => {
                navigate('/PackageDashBoardPage');
            }, 1000);
        } catch (error) {
            console.error("Error creating package:", error);
            alert('Failed to create package');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.mainContent}>
                <div style={styles.contentWrapper}>
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
                            <p style={styles.subtitle}>Fill in the package details below</p>
                        </div>
                    </div>

                    {/* Form Container */}
                    <div style={styles.formContainer}>
                        <form onSubmit={handleSubmit}>
                            <div style={styles.formGrid}>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Package Name <span style={styles.required}>*</span></label>
                                    <input
                                        type="text"
                                        name="PackageName"
                                        style={styles.input}
                                        className="package-input"
                                        placeholder="Enter package name"
                                        value={packageData.PackageName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Package Type <span style={styles.required}>*</span></label>
                                    <input
                                        type="text"
                                        name="PackageType"
                                        style={styles.input}
                                        className="package-input"
                                        placeholder="Enter package type"
                                        value={packageData.PackageType}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Material <span style={styles.required}>*</span></label>
                                    <input
                                        type="text"
                                        name="Material"
                                        style={styles.input}
                                        className="package-input"
                                        placeholder="Enter material"
                                        value={packageData.Material}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div style={{...styles.formGroup, gridColumn: '1 / -1'}}>
                                    <label style={styles.label}>Package Description</label>
                                    <textarea
                                        name="PackageDescription"
                                        style={{...styles.input, ...styles.textarea}}
                                        className="package-input"
                                        placeholder="Enter package description"
                                        value={packageData.PackageDescription}
                                        onChange={handleChange}
                                        rows="4"
                                    ></textarea>
                                </div>

                                <div style={styles.dimensionsContainer}>
                                    <h3 style={styles.dimensionsTitle}>Dimensions</h3>
                                    <div style={styles.dimensionsGrid}>
                                        <div style={styles.formGroup}>
                                            <label style={styles.label}>Length <span style={styles.required}>*</span></label>
                                            <input
                                                type="number"
                                                name="Length"
                                                style={styles.input}
                                                className="package-input"
                                                placeholder="0"
                                                value={packageData.Length}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div style={styles.formGroup}>
                                            <label style={styles.label}>Width <span style={styles.required}>*</span></label>
                                            <input
                                                type="number"
                                                name="Width"
                                                style={styles.input}
                                                className="package-input"
                                                placeholder="0"
                                                value={packageData.Width}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div style={styles.formGroup}>
                                            <label style={styles.label}>Height <span style={styles.required}>*</span></label>
                                            <input
                                                type="number"
                                                name="Height"
                                                style={styles.input}
                                                className="package-input"
                                                placeholder="0"
                                                value={packageData.Height}
                                                onChange={handleChange}
                                                required
                                            />
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
};

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