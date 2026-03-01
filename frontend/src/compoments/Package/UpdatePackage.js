import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../../style/package/UpdatePackage.css';

const UpdatePackage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    
    const [formData, setFormData] = useState({
        PackageName: '',
        PackageType: '',
        PackageDescription: '',
        Material: '',
        Length: '',
        Width: '',
        Height: '',
        status: 'pending'
    });
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    // Fetch package details
    useEffect(() => {
        const fetchPackage = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8070/packages/get/${id}`);
                setFormData(response.data);
                setError('');
            } catch (err) {
                setError('Error fetching package details.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPackage();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!formData.PackageName || !formData.PackageType || !formData.Material || 
            !formData.Length || !formData.Width || !formData.Height) {
            setError('Please fill in all required fields');
            return;
        }

        if (formData.Length <= 0 || formData.Width <= 0 || formData.Height <= 0) {
            setError('Dimensions must be positive numbers');
            return;
        }

        try {
            setSubmitting(true);
            await axios.put(`http://localhost:8070/packages/update/${id}`, formData);
            alert('Package updated successfully!');
            navigate('/packages');
        } catch (err) {
            setError(err.response?.data?.error || 'Error updating package');
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="update-package-container">
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Loading package details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="update-package-container">
            <button className="back-btn-standalone" onClick={() => navigate('/packages')}>
                <span>←</span> Back to List
            </button>
            
            <h1 className="update-title-standalone">Update Package</h1>

            {error && (
                <div className="error-alert">
                    <span className="error-icon">⚠</span>
                    {error}
                </div>
            )}

            <div className="update-form-card">
                <form onSubmit={handleSubmit} className="update-form">
                    <div className="form-section">
                        <h3 className="section-title">Package Information</h3>
                        <div className="form-grid">
                            <div className="form-field">
                                <label>Package Name <span className="required">*</span></label>
                                <input
                                    type="text"
                                    name="PackageName"
                                    value={formData.PackageName}
                                    onChange={handleChange}
                                    placeholder="Enter package name"
                                    required
                                />
                            </div>

                            <div className="form-field">
                                <label>Package Type <span className="required">*</span></label>
                                <select
                                    name="PackageType"
                                    value={formData.PackageType}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Type</option>
                                    <option value="Standard">Standard</option>
                                    <option value="Express">Express</option>
                                    <option value="Overnight">Overnight</option>
                                    <option value="International">International</option>
                                </select>
                            </div>

                            <div className="form-field">
                                <label>Material <span className="required">*</span></label>
                                <input
                                    type="text"
                                    name="Material"
                                    value={formData.Material}
                                    onChange={handleChange}
                                    placeholder="Enter material type"
                                    required
                                />
                            </div>

                            <div className="form-field">
                                <label>Status <span className="required">*</span></label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    required
                                    className="status-select"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="processing">Processing</option>
                                    <option value="delivered">Delivered</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-field full-width">
                            <label>Description</label>
                            <textarea
                                name="PackageDescription"
                                value={formData.PackageDescription}
                                onChange={handleChange}
                                placeholder="Enter package description (optional)"
                                rows="4"
                            />
                        </div>
                    </div>

                    <div className="form-section">
                        <h3 className="section-title">Dimensions</h3>
                        <div className="dimensions-grid">
                            <div className="form-field">
                                <label>Length (cm) <span className="required">*</span></label>
                                <input
                                    type="number"
                                    name="Length"
                                    value={formData.Length}
                                    onChange={handleChange}
                                    placeholder="0.0"
                                    min="0.1"
                                    step="0.1"
                                    required
                                />
                            </div>

                            <div className="form-field">
                                <label>Width (cm) <span className="required">*</span></label>
                                <input
                                    type="number"
                                    name="Width"
                                    value={formData.Width}
                                    onChange={handleChange}
                                    placeholder="0.0"
                                    min="0.1"
                                    step="0.1"
                                    required
                                />
                            </div>

                            <div className="form-field">
                                <label>Height (cm) <span className="required">*</span></label>
                                <input
                                    type="number"
                                    name="Height"
                                    value={formData.Height}
                                    onChange={handleChange}
                                    placeholder="0.0"
                                    min="0.1"
                                    step="0.1"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button 
                            type="button" 
                            className="btn-cancel"
                            onClick={() => navigate('/packages')}
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="btn-submit"
                            disabled={submitting}
                        >
                            {submitting ? (
                                <>
                                    <span className="btn-spinner"></span>
                                    Updating...
                                </>
                            ) : (
                                'Update Package'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdatePackage;
