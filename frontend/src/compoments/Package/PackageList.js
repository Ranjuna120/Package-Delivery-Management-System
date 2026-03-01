import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from './Breadcrumb';
import '../../style/package/PackageDashBoard.css';

const PackageList = () => {
    const navigate = useNavigate();
    const [packages, setPackages] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    // Fetch packages from backend API
    useEffect(() => {
        const fetchPackages = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:8070/packages/');
                setPackages(response.data);
                setError('');
            } catch (err) {
                setError('Error fetching packages.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();
    }, []);

    // Function to handle deleting a package
    const deletePackage = async (id) => {
        if (window.confirm('Are you sure you want to delete this package?')) {
            try {
                await axios.delete(`http://localhost:8070/packages/delete/${id}`);
                setPackages(packages.filter(pkg => pkg._id !== id));
                alert('Package deleted successfully!');
            } catch (err) {
                setError('Error deleting package.');
                console.error(err);
            }
        }
    };

    return (
        <div className="package-list-container">
            <Breadcrumb />
            <button className="back-button-standalone" onClick={() => navigate('/PackageDashBoardPage')}>
                ← Back to Dashboard
            </button>
            
            <h1 className="page-title-standalone">All Packages</h1>
            
            {error && <div className="error-message">{error}</div>}
            
            {loading ? (
                <div className="loading">Loading packages...</div>
            ) : (
                <div className="table-container">
                    <table className="package-table">
                        <thead>
                            <tr>
                                <th>Package ID</th>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Description</th>
                                <th>Material</th>
                                <th>Dimensions (L×W×H)</th>
                                <th>Status</th>
                                <th>Created Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {packages.length === 0 ? (
                                <tr>
                                    <td colSpan="9" style={{ textAlign: 'center', padding: '40px' }}>
                                        No packages found. Create a new package to get started.
                                    </td>
                                </tr>
                            ) : (
                                packages.map((pkg) => (
                                    <tr key={pkg._id}>
                                        <td>{pkg._id.slice(-6)}</td>
                                        <td>{pkg.PackageName}</td>
                                        <td>
                                            <span className="type-badge">{pkg.PackageType}</span>
                                        </td>
                                        <td>{pkg.PackageDescription || 'N/A'}</td>
                                        <td>{pkg.Material}</td>
                                        <td>{pkg.Length} × {pkg.Width} × {pkg.Height}</td>
                                        <td>
                                            <span className={`status-badge ${pkg.status || 'pending'}`}>
                                                {(pkg.status || 'pending').toUpperCase()}
                                            </span>
                                        </td>
                                        <td>{new Date(pkg.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            <div className="action-buttons">
                                                <button 
                                                    className="btn-update" 
                                                    onClick={() => navigate(`/updatepackage/${pkg._id}`)}
                                                >
                                                    Update
                                                </button>
                                                <button 
                                                    className="btn-delete" 
                                                    onClick={() => deletePackage(pkg._id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PackageList;
