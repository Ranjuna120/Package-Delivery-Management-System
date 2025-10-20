import React, { useState, useEffect } from 'react';
import axios from 'axios';  
import { useParams, useNavigate } from 'react-router-dom'; 

const UpdateMachine = () => {
    const [machineName, setMachineName] = useState('');
    const [machineCategory, setMachineCategory] = useState('');
    const [durationTime, setDurationTime] = useState('');
    const [description, setDescription] = useState('');
    const [qualityDetails, setQualityDetails] = useState('');
    const { id } = useParams(); // Fetching machine ID from the URL params
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMachineDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/machines/read/${id}`); // Ensure the correct endpoint
                const { machineName, machineCategory, durationTime, description, qualityDetails } = response.data;
                setMachineName(machineName);
                setMachineCategory(machineCategory || '');
                setDurationTime(durationTime);
                setDescription(description);
                setQualityDetails(qualityDetails);
            } catch (error) {
                console.error('Error fetching machine details:', error);
            }
        };
        fetchMachineDetails();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        const updatedMachineData = {
            machineName,
            machineCategory,
            durationTime,
            description,
            qualityDetails,
        };

        try {
            await axios.put(`http://localhost:8070/machines/update/${id}`, updatedMachineData);
            console.log('Machine updated successfully');
            navigate('/MachineDashBoardPage'); // Redirect to MachineManager.jsx after update
        } catch (error) {
            console.error('There was an error updating the machine:', error);
        }
    };

    return (
        <div style={styles.formContainer}>
            <form onSubmit={handleUpdate}>
                <h2 style={styles.heading}>Update Machine</h2>
                <label htmlFor="machine-name" style={styles.label}>Machine Name:</label>
                <input
                    type="text"
                    id="machine-name"
                    name="machine-name"
                    placeholder="Enter machine name"
                    value={machineName}
                    onChange={(e) => setMachineName(e.target.value)}
                    required
                    style={styles.input}
                />

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

                <label htmlFor="description" style={styles.label}>Description:</label>
                <textarea
                    type="text"
                    id="description"
                    name="description"
                    placeholder="Enter description"
                    rows="4"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    style={styles.textarea}
                ></textarea>

                <label htmlFor="quality-details" style={styles.label}>Quality Details:</label>
                <textarea
                    type="text"
                    id="quality-details"
                    name="quality-details"
                    placeholder="Enter quality details"
                    rows="4"
                    value={qualityDetails}
                    onChange={(e) => setQualityDetails(e.target.value)}
                    required
                    style={styles.textarea}
                ></textarea>

                <button type="submit" style={styles.button}>Update Machine</button>
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
        background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 12px rgba(40, 167, 69, 0.3)'
    }
};

export default UpdateMachine;