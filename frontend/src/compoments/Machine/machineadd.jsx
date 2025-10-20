import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const MachineAdd = () => {
    const [machineName, setMachineName] = useState('');
    const [machineCategory, setMachineCategory] = useState('');
    const [durationTime, setDurationTime] = useState('');
    const [description, setDescription] = useState('');
    const [qualityDetails, setQualityDetails] = useState('');
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    // Regex to match symbols
    const symbolRegex = /[^a-zA-Z0-9\s]/g;

    // Real-time validation for machine name, description, and quality details
    const validateRealTime = (field, value) => {
        let error = '';
        const invalidSymbols = value.match(symbolRegex);

        if (invalidSymbols) {
            error = `Invalid symbol(s): ${invalidSymbols.join(', ')} are not allowed in ${field}.`;
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: error,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateFields();

        if (Object.keys(validationErrors).length === 0) {
            const machineData = {
                machineName,
                machineCategory,
                durationTime,
                description,
                qualityDetails,
            };

            try {
                const response = await axios.post('http://localhost:8070/machines/add', machineData);
                alert('Machine added successfully:', response.data);

                // Clear form
                setMachineName('');
                setMachineCategory('');
                setDurationTime('');
                setDescription('');
                setQualityDetails('');

                // Redirect to MachineManager page after adding the machine
                navigate('/MachineDashBoardPage');
            } catch (error) {
                console.error('Error adding machine:', error);
            }
        } else {
            setErrors(validationErrors);
        }
    };

    // Full validation when form is submitted
    const validateFields = () => {
        const validationErrors = {};

        if (symbolRegex.test(machineName)) {
            validationErrors.machineName = 'Symbols are not allowed in Machine Name.';
        }
        if (!machineCategory) {
            validationErrors.machineCategory = 'Please select a machine category.';
        }
        if (symbolRegex.test(description)) {
            validationErrors.description = 'Symbols are not allowed in Description.';
        }
        if (symbolRegex.test(qualityDetails)) {
            validationErrors.qualityDetails = 'Symbols are not allowed in Quality Details.';
        }
        if (!durationTime || isNaN(durationTime) || durationTime <= 0) {
            validationErrors.durationTime = 'Please enter a valid duration time in hours.';
        }

        return validationErrors;
    };

    return (
        <div style={styles.formContainer}>
            <form onSubmit={handleSubmit}>
                <h2 style={styles.heading}>Add Machine</h2>
                
                <label htmlFor="machine-name" style={styles.label}>Machine Name:</label>
                <input
                    type="text"
                    id="machine-name"
                    name="machine-name"
                    placeholder="Enter machine name"
                    value={machineName}
                    onChange={(e) => {
                        setMachineName(e.target.value);
                        validateRealTime('machineName', e.target.value);
                    }}
                    required
                    style={styles.input}
                />
                {errors.machineName && <p style={styles.error}>{errors.machineName}</p>}

                <label htmlFor="machine-category" style={styles.label}>Machine Category:</label>
                <select
                    id="machine-category"
                    name="machine-category"
                    value={machineCategory}
                    onChange={(e) => setMachineCategory(e.target.value)}
                    required
                    style={styles.select}
                >
                    <option value="">Select a category</option>
                    <option value="Packaging Machine">Packaging Machine</option>
                    <option value="Labeling Machine">Labeling Machine</option>
                    <option value="Sorting Machine">Sorting Machine</option>
                    <option value="Conveyor System">Conveyor System</option>
                    <option value="Weighing Machine">Weighing Machine</option>
                    <option value="Wrapping Machine">Wrapping Machine</option>
                    <option value="Sealing Machine">Sealing Machine</option>
                    <option value="Loading Equipment">Loading Equipment</option>
                </select>
                {errors.machineCategory && <p style={styles.error}>{errors.machineCategory}</p>}

                <label htmlFor="duration-time" style={styles.label}>Duration Time (in hours):</label>
                <input
                    type="number"
                    id="duration-time"
                    name="duration-time"
                    placeholder="Enter duration time"
                    value={durationTime}
                    onChange={(e) => setDurationTime(e.target.value)}
                    required
                    style={styles.input}
                />
                {errors.durationTime && <p style={styles.error}>{errors.durationTime}</p>}

                <label htmlFor="description" style={styles.label}>Description:</label>
                <textarea
                    id="description"
                    name="description"
                    placeholder="Enter description"
                    rows="4"
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                        validateRealTime('description', e.target.value);
                    }}
                    required
                    style={styles.textarea}
                ></textarea>
                {errors.description && <p style={styles.error}>{errors.description}</p>}

                <label htmlFor="quality-details" style={styles.label}>Quality Details:</label>
                <textarea
                    id="quality-details"
                    name="quality-details"
                    placeholder="Enter quality details"
                    rows="4"
                    value={qualityDetails}
                    onChange={(e) => {
                        setQualityDetails(e.target.value);
                        validateRealTime('qualityDetails', e.target.value);
                    }}
                    required
                    style={styles.textarea}
                ></textarea>
                {errors.qualityDetails && <p style={styles.error}>{errors.qualityDetails}</p>}

                {/* Submit button */}
                <button type="submit" style={styles.button}>Add Machine</button>
            </form>
        </div>
    );
};

const styles = {
    formContainer: {
        background: 'linear-gradient(135deg, #ffffff 0%, #f7f9fc 100%)',
        padding: '30px 40px',
        borderRadius: '16px',
        boxShadow: '0 8px 24px rgba(33, 147, 176, 0.15)',
        maxWidth: '500px',
        width: '100%',
        margin: '40px auto'
    },
    heading: {
        textAlign: 'center',
        marginBottom: '30px',
        color: '#2193b0',
        fontSize: '28px',
        fontWeight: '600'
    },
    label: {
        display: 'block',
        marginBottom: '8px',
        fontWeight: '600',
        color: '#2c3e50',
        fontSize: '14px'
    },
    input: {
        padding: '12px 16px',
        marginBottom: '20px',
        border: '2px solid #e1e8ed',
        borderRadius: '8px',
        fontSize: '15px',
        width: '100%',
        boxSizing: 'border-box',
        transition: 'all 0.3s ease',
        outline: 'none'
    },
    select: {
        padding: '12px 16px',
        marginBottom: '20px',
        border: '2px solid #e1e8ed',
        borderRadius: '8px',
        fontSize: '15px',
        width: '100%',
        boxSizing: 'border-box',
        transition: 'all 0.3s ease',
        outline: 'none',
        backgroundColor: '#ffffff',
        cursor: 'pointer'
    },
    textarea: {
        padding: '12px 16px',
        marginBottom: '20px',
        border: '2px solid #e1e8ed',
        borderRadius: '8px',
        fontSize: '15px',
        width: '100%',
        boxSizing: 'border-box',
        transition: 'all 0.3s ease',
        outline: 'none',
        fontFamily: 'inherit',
        resize: 'vertical'
    },
    button: {
        width: '100%',
        padding: '14px',
        background: 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 12px rgba(33, 147, 176, 0.3)'
    },
    error: {
        color: '#e74c3c',
        fontSize: '13px',
        marginTop: '-15px',
        marginBottom: '15px',
        fontWeight: '500'
    }
};

export default MachineAdd;