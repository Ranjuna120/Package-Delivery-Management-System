import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/machine/machineadd.css';

const MachineAdd = () => {
    const navigate = useNavigate();
    const [machineName, setMachineName] = useState('');
    const [machineCategory, setMachineCategory] = useState('');
    const [durationTime, setDurationTime] = useState('');
    const [description, setDescription] = useState('');
    const [qualityDetails, setQualityDetails] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const machineData = {
            machineName,
            machineCategory,
            durationTime: Number(durationTime),
            description,
            qualityDetails
        };

        try {
            const response = await fetch('http://localhost:8070/machines/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(machineData),
            });

            if (response.ok) {
                alert('Machine added successfully!');
                // Clear form
                setMachineName('');
                setMachineCategory('');
                setDurationTime('');
                setDescription('');
                setQualityDetails('');
                // Navigate back to dashboard
                navigate('/MachineDashBoardPage');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to add machine');
            }
        } catch (error) {
            setError('Error connecting to server: ' + error.message);
            console.error('Error adding machine:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h2>Add Machine</h2>
                
                {error && <div className="error-message">{error}</div>}
                
                <label htmlFor="machine-name">Machine Name:</label>
                <input
                    type="text"
                    id="machine-name"
                    name="machine-name"
                    placeholder="Enter machine name"
                    value={machineName}
                    onChange={(e) => setMachineName(e.target.value)}
                    required
                />

                <label htmlFor="machine-category">Machine Category:</label>
                <input
                    type="text"
                    id="machine-category"
                    name="machine-category"
                    placeholder="Enter machine category"
                    value={machineCategory}
                    onChange={(e) => setMachineCategory(e.target.value)}
                    required
                />

                <label htmlFor="duration-time">Duration Time (in hours):</label>
                <input
                    type="number"
                    id="duration-time"
                    name="duration-time"
                    placeholder="Enter duration time"
                    value={durationTime}
                    onChange={(e) => setDurationTime(e.target.value)}
                    required
                />

                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    placeholder="Enter description"
                    rows="4"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>

                <label htmlFor="quality-details">Quality Details:</label>
                <textarea
                    id="quality-details"
                    name="quality-details"
                    placeholder="Enter quality details"
                    rows="4"
                    value={qualityDetails}
                    onChange={(e) => setQualityDetails(e.target.value)}
                    required
                ></textarea>

                <button type="submit" disabled={loading}>
                    {loading ? 'Adding Machine...' : 'Add Machine'}
                </button>
            </form>
        </div>
    );
};

export default MachineAdd;
