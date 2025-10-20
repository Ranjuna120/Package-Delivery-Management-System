import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const MachineStatus = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { machineNames } = location.state || { machineNames: [] };

  // Function to get the initial statuses from localStorage or default to 'Available'
  const getInitialStatuses = (machineNames) => {
    const savedStatuses = localStorage.getItem('machineStatuses');
    return savedStatuses ? JSON.parse(savedStatuses) : machineNames.map(() => 'Available');
  };

  // State to hold the status for each machine
  const [machineStatuses, setMachineStatuses] = useState(getInitialStatuses(machineNames));
  const [currentMachineNames, setCurrentMachineNames] = useState(machineNames);

  // Sync machineStatuses to localStorage on every change
  useEffect(() => {
    localStorage.setItem('machineStatuses', JSON.stringify(machineStatuses));
  }, [machineStatuses]);

  // Update machine statuses when currentMachineNames change
  useEffect(() => {
    setMachineStatuses(getInitialStatuses(currentMachineNames));
  }, [currentMachineNames]);

  // Function to update machine status
  const handleStatusChange = (index, newStatus) => {
    const updatedStatuses = [...machineStatuses];
    updatedStatuses[index] = newStatus;
    setMachineStatuses(updatedStatuses);
  };

  // Function to get the row color based on machine status
  const getRowColor = (status) => {
    switch (status) {
      case 'Available':
        return '#d4edda'; // Green background for Available
      case 'In process':
        return '#f8d7da'; // Red background for In process
      case 'Maintain':
        return '#fff3cd'; // Yellow background for Maintain
      default:
        return 'transparent'; // Default background
    }
  };

  // Function to handle Assign Order and navigate to AssignMachine
  const handleAssignOrder = (index) => {
    console.log(`Assigning order to machine: ${currentMachineNames[index]}`);
    navigate('/MachineStatus/Assign-machine', { state: { machineId: currentMachineNames[index] } });
  };

  // Function to remove a machine
  const handleRemoveMachine = (index) => {
    const updatedNames = currentMachineNames.filter((_, i) => i !== index);
    const updatedStatuses = machineStatuses.filter((_, i) => i !== index);
    
    setCurrentMachineNames(updatedNames);
    setMachineStatuses(updatedStatuses);
  };

  // Count the machines by status
  const availableCount = machineStatuses.filter(status => status === 'Available').length;
  const inProcessCount = machineStatuses.filter(status => status === 'In process').length;
  const maintainCount = machineStatuses.filter(status => status === 'Maintain').length;

  return (
    <div style={styles.container}>
      {/* Status summary boxes */}
      <div style={styles.statusBoxes}>
        <div style={styles.statusBox}>
          <h3>Available Machines</h3>
          <h2>{availableCount}</h2>
        </div>
        <div style={styles.statusBox}>
          <h3>Machines in Process</h3>
          <h2>{inProcessCount}</h2>
        </div>
        <div style={styles.statusBox}>
          <h3>Maintenance</h3>
          <h2>{maintainCount}</h2>
        </div>
      </div>

      {/* Machines table with status dropdowns */}
      <div style={styles.tableFrame}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Machine ID</th>
              <th style={styles.tableHeader}>Status</th>
              <th style={styles.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentMachineNames.map((machineName, index) => (
              <tr
                key={index}
                style={{ backgroundColor: getRowColor(machineStatuses[index]) }} // Apply dynamic background color
              >
                <td style={styles.tableCell}>{machineName}</td>
                <td style={styles.tableCell}>
                  <select
                    value={machineStatuses[index]}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                    style={styles.select}
                  >
                    <option value="Available">Available</option>
                    <option value="In process">In process</option>
                    <option value="Maintain">Maintain</option>
                  </select>
                </td>
                <td style={styles.tableCell}>
                  {machineStatuses[index] === 'Available' && (
                    <button
                      onClick={() => handleAssignOrder(index)}
                      style={styles.actionButton}
                    >
                      Assign Order
                    </button>
                  )}
                  <button
                    onClick={() => handleRemoveMachine(index)}
                    style={styles.removeButton}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    background: 'linear-gradient(135deg, #ffffff 0%, #f7f9fc 100%)',
    minHeight: '100vh',
  },
  statusBoxes: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    marginBottom: '30px',
    flexWrap: 'wrap',
  },
  statusBox: {
    flex: '1',
    minWidth: '250px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(33, 147, 176, 0.12)',
    textAlign: 'center',
  },
  tableFrame: {
    width: '100%',
    border: 'none',
    borderRadius: '12px',
    padding: '0',
    backgroundColor: '#fff',
    boxShadow: '0 8px 24px rgba(33, 147, 176, 0.12)',
    overflow: 'hidden',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    background: 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)',
    color: '#fff',
    padding: '16px',
    textAlign: 'left',
    fontWeight: '600',
    fontSize: '14px',
    border: 'none',
  },
  tableCell: {
    padding: '14px 16px',
    borderBottom: '1px solid #e1e8ed',
    textAlign: 'left',
    fontSize: '14px',
    color: '#2c3e50',
  },
  select: {
    padding: '8px 12px',
    fontSize: '14px',
    borderRadius: '6px',
    border: '2px solid #e1e8ed',
    outline: 'none',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    backgroundColor: '#ffffff',
  },
  actionButton: {
    padding: '8px 16px',
    marginRight: '8px',
    background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '13px',
    transition: 'all 0.3s ease',
  },
  removeButton: {
    padding: '8px 16px',
    background: 'linear-gradient(135deg, #dc3545 0%, #e74c3c 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '13px',
    transition: 'all 0.3s ease',
  },
};

export default MachineStatus;