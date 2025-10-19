import React, { useState } from 'react';
import './machineadd.css';

const machineadd = () => {
    const [machineName, setMachineName] = useState('');
    const [durationTime, setDurationTime] = useState('');
    const [description, setDescription] = useState('');
    const [qualityDetails, setQualityDetails] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log({ machineName, durationTime, description, qualityDetails });
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h2>Add Machine</h2>
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

                <button type="submit">Add Machine</button>
            </form>
        </div>
    );
};

export default machineadd;
