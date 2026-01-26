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
    const ok = window.confirm('Remove this machine from the list?');
    if (!ok) return;
    const updatedNames = currentMachineNames.filter((_, i) => i !== index);
    const updatedStatuses = machineStatuses.filter((_, i) => i !== index);
    setCurrentMachineNames(updatedNames);
    setMachineStatuses(updatedStatuses);
  };

  // Count the machines by status
  const availableCount = machineStatuses.filter(status => status === 'Available').length;
  const inProcessCount = machineStatuses.filter(status => status === 'In process').length;
  const maintainCount = machineStatuses.filter(status => status === 'Maintain').length;

  // Inline helpers for status chip/select styles
  const statusColor = (status) => {
    switch (status) {
      case 'Available':
        return { bg: '#d4edda', dot: '#2ecc71', border: '#b5e2c3' };
      case 'In process':
        return { bg: '#f8d7da', dot: '#e74c3c', border: '#f1b0b7' };
      case 'Maintain':
        return { bg: '#fff3cd', dot: '#f1c40f', border: '#ffe08a' };
      default:
        return { bg: 'transparent', dot: '#95a5a6', border: '#ecf0f1' };
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.headerRow}>
        <div>
          <h1 style={styles.title}>Machine Status</h1>
          <p style={styles.subtitle}>Track availability and manage assignments</p>
        </div>
        <button style={styles.backButton} onClick={() => navigate('/MachineDashBoardPage')}>← Back to Machines</button>
      </div>

      {/* Legend */}
      <div style={styles.legendRow}>
        <span style={styles.legendItem}><span style={{...styles.legendDot, backgroundColor: '#2ecc71'}}></span>Available</span>
        <span style={styles.legendItem}><span style={{...styles.legendDot, backgroundColor: '#e74c3c'}}></span>In process</span>
        <span style={styles.legendItem}><span style={{...styles.legendDot, backgroundColor: '#f1c40f'}}></span>Maintain</span>
      </div>
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

      {/* Empty state */}
      {currentMachineNames.length === 0 ? (
        <div style={styles.emptyState}>No machines provided. Go back and select machines to manage.</div>
      ) : (
      /* Machines table with status dropdowns */
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
                  <div style={styles.statusCell}>
                    <span style={{
                      ...styles.statusChip,
                      backgroundColor: statusColor(machineStatuses[index]).bg,
                      borderColor: statusColor(machineStatuses[index]).border,
                    }}>
                      <span style={{...styles.statusDot, backgroundColor: statusColor(machineStatuses[index]).dot}}></span>
                      {machineStatuses[index]}
                    </span>
                    <select
                      value={machineStatuses[index]}
                      onChange={(e) => handleStatusChange(index, e.target.value)}
                      style={{
                        ...styles.select,
                        borderColor: statusColor(machineStatuses[index]).border,
                      }}
                    >
                      <option value="Available">Available</option>
                      <option value="In process">In process</option>
                      <option value="Maintain">Maintain</option>
                    </select>
                  </div>
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
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    background: '#F5F7FA',
    minHeight: '100vh',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    margin: 0,
    color: '#2C3E50',
    fontSize: 32,
    fontWeight: 700,
    letterSpacing: '-0.5px',
  },
  subtitle: {
    marginTop: 8,
    color: '#7F8C8D',
    fontSize: 15,
    fontWeight: 400,
  },
  backButton: {
    padding: '12px 20px',
    background: '#4A90E2',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontWeight: 600,
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(74, 144, 226, 0.3)',
    transition: 'all 0.2s ease',
  },
  legendRow: {
    display: 'flex',
    gap: 20,
    alignItems: 'center',
    marginBottom: 24,
  },
  legendItem: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    color: '#7F8C8D',
    fontSize: 13,
    fontWeight: 600,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: '50%',
    display: 'inline-block',
  },
  statusBoxes: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '20px',
    marginBottom: '32px',
  },
  statusBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: '#ffffff',
    padding: '28px',
    borderRadius: '12px',
    border: '1px solid #E1E8ED',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
    textAlign: 'center',
    transition: 'all 0.3s ease',
  },
  tableFrame: {
    width: '100%',
    border: 'none',
    borderRadius: '12px',
    padding: '0',
    backgroundColor: '#fff',
    border: '1px solid #E1E8ED',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
    overflow: 'hidden',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  emptyState: {
    background: '#ffffff',
    borderRadius: '12px',
    border: '1px solid #E1E8ED',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
    padding: 32,
    textAlign: 'center',
    color: '#7F8C8D',
    fontSize: 15,
  },
  tableHeader: {
    background: '#2C3E50',
    color: '#fff',
    padding: '16px 20px',
    textAlign: 'left',
    fontWeight: '600',
    fontSize: '13px',
    border: 'none',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  tableCell: {
    padding: '16px 20px',
    borderBottom: '1px solid #E1E8ED',
    textAlign: 'left',
    fontSize: '14px',
    color: '#2C3E50',
  },
  statusCell: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    flexWrap: 'wrap',
  },
  statusChip: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '6px 12px',
    borderRadius: 6,
    border: '1px solid transparent',
    fontWeight: 600,
    fontSize: '13px',
    color: '#2C3E50',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    display: 'inline-block',
  },
  select: {
    padding: '8px 12px',
    fontSize: '13px',
    borderRadius: '6px',
    border: '1px solid #E1E8ED',
    outline: 'none',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    backgroundColor: '#ffffff',
  },
  actionButton: {
    padding: '8px 16px',
    marginRight: '8px',
    background: '#27AE60',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '13px',
    transition: 'all 0.2s ease',
  },
  removeButton: {
    padding: '8px 16px',
    background: '#E74C3C',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '13px',
    transition: 'all 0.2s ease',
  },
};

export default MachineStatus;