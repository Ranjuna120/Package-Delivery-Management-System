import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable'; // Recommended import for reliability

const MachineManager = () => {
    const navigate = useNavigate();
    const [machines, setMachines] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); 
    const [filteredMachines, setFilteredMachines] = useState([]); 
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchMachines();
    }, []);

    useEffect(() => {
        const filtered = machines.filter(machine => {
            const matchesName = machine.machineName?.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = !selectedCategory || machine.machineCategory === selectedCategory;
            return matchesName && matchesCategory;
        });
        setFilteredMachines(filtered);
    }, [searchQuery, selectedCategory, machines]);

    const fetchMachines = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:8070/machines/Allread');
            setMachines(response.data);
        } catch (error) {
            console.error('Error fetching machines:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const ok = window.confirm('Are you sure you want to delete this machine?');
        if (!ok) return;
        try {
            setLoading(true);
            await axios.delete(`http://localhost:8070/machines/delete/${id}`);
            fetchMachines();
        } catch (error) {
            console.error('Error deleting machine:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = (id) => {
        navigate(`/update-machine/${id}`);
    };

    const handleViewProcess = () => {
        const machineNames = machines.map(machine => machine.machineName);
        navigate('/MachineDashBoardPage/Machine-Status', { state: { machineNames } });
    };

    // Function to generate and download PDF
    const handleDownloadReport = () => {
        try {
            const doc = new jsPDF();
            doc.text('Machine Report', 14, 16);

            const tableColumn = ['Machine Name', 'Category', 'Duration Time', 'Description', 'Quality Details'];
            const tableRows = [];

            filteredMachines.forEach(machine => {
                const machineData = [
                    machine.machineName,
                    machine.machineCategory || 'N/A',
                    machine.durationTime,
                    machine.description,
                    machine.qualityDetails
                ];
                tableRows.push(machineData);
            });

            // Add table to PDF (using function import for reliability)
            autoTable(doc, {
                head: [tableColumn],
                body: tableRows,
                startY: 20,
                styles: { fontSize: 10 },
                headStyles: { fillColor: [33, 147, 176] },
            });

            const stamp = new Date().toISOString().slice(0,10);
            doc.save(`machines_report_${stamp}.pdf`);
        } catch (err) {
            console.error('Failed to generate PDF:', err);
            alert('Failed to generate PDF. Please try again.');
        }
    };

    // Derived: unique categories for filter and summary
    const categories = useMemo(() => {
        const set = new Set((machines || []).map(m => m.machineCategory).filter(Boolean));
        return Array.from(set);
    }, [machines]);

    const avgDuration = useMemo(() => {
        if (!machines || machines.length === 0) return 0;
        const sum = machines.reduce((acc, m) => acc + (Number(m.durationTime) || 0), 0);
        return Math.round((sum / machines.length) * 10) / 10; // 1 decimal
    }, [machines]);

    return (
        <div style={styles.container}>
            {/* Stats */}
            <div style={styles.statsRow}>
                <div style={styles.statCard}>
                    <div style={styles.statLabel}>Total Machines</div>
                    <div style={styles.statValue}>{machines.length}</div>
                </div>
                <div style={styles.statCard}>
                    <div style={styles.statLabel}>Categories</div>
                    <div style={styles.statValue}>{categories.length}</div>
                </div>
                <div style={styles.statCard}>
                    <div style={styles.statLabel}>Avg. Duration (h)</div>
                    <div style={styles.statValue}>{avgDuration}</div>
                </div>
            </div>
            <div style={styles.buttonContainer}>
                <button onClick={() => navigate('/MachineDashBoardPage/add-machine')} style={styles.addButton}>
                    Add Machine
                </button>
                <button onClick={handleViewProcess} style={styles.viewProcessButton}>
                    Manage Machine Process
                </button>
                {/* Report Generator Button */}
                <button onClick={handleDownloadReport} style={styles.reportButton}>
                    Generate PDF Report
                </button>
            </div>

            {/* Filters */}
            <div style={styles.filtersRow}>
                <input 
                    type="text" 
                    placeholder="Search by machine name..." 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    style={styles.searchInput} 
                />
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={styles.categorySelect}
                >
                    <option value="">All Categories</option>
                    {categories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </div>

            {loading ? (
                <div style={styles.emptyState}>Loading machines...</div>
            ) : filteredMachines.length === 0 ? (
                <div style={styles.emptyState}>No machines found. Try changing filters or add a new machine.</div>
            ) : (
            <div style={styles.tableFrame}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.tableHeader}>Machine Name</th>
                            <th style={styles.tableHeader}>Category</th>
                            <th style={styles.tableHeader}>Duration Time</th>
                            <th style={styles.tableHeader}>Description</th>
                            <th style={styles.tableHeader}>Quality Details</th>
                            <th style={styles.tableHeader}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMachines.map(machine => (
                            <tr key={machine._id}>
                                <td style={styles.tableCell}>{machine.machineName}</td>
                                <td style={styles.tableCell}>{machine.machineCategory || 'N/A'}</td>
                                <td style={styles.tableCell}>{machine.durationTime}</td>
                                <td style={styles.tableCell}>{machine.description}</td>
                                <td style={styles.tableCell}>{machine.qualityDetails}</td>
                                <td style={styles.tableCell}>
                                    <button onClick={() => handleUpdate(machine._id)} style={styles.editButton}>Edit</button>
                                    <button onClick={() => handleDelete(machine._id)} style={styles.deleteButton}>Delete</button>
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
        padding: '30px',
        background: 'linear-gradient(135deg, #ffffff 0%, #f7f9fc 100%)',
        minHeight: '100vh',
    },
    statsRow: {
        display: 'flex',
        gap: '16px',
        marginBottom: '20px',
        flexWrap: 'wrap',
    },
    statCard: {
        flex: '1 1 180px',
        minWidth: '180px',
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)',
        borderRadius: '12px',
        boxShadow: '0 6px 18px rgba(33,147,176,0.12)',
        padding: '16px 18px',
    },
    statLabel: {
        color: '#5f6b7a',
        fontSize: '13px',
        marginBottom: '6px',
    },
    statValue: {
        color: '#2193b0',
        fontWeight: 800,
        fontSize: '22px',
    },
    buttonContainer: {
        display: 'flex',
        gap: '15px',
        marginBottom: '25px',
        flexWrap: 'wrap',
    },
    addButton: {
        padding: '12px 24px',
        background: 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '15px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 12px rgba(33, 147, 176, 0.3)',
    },
    viewProcessButton: {
        padding: '12px 24px',
        background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '15px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 12px rgba(40, 167, 69, 0.3)',
    },
    reportButton: {
        padding: '12px 24px',
        background: 'linear-gradient(135deg, #17a2b8 0%, #5ac8d8 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '15px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 12px rgba(23, 162, 184, 0.3)',
    },
    filtersRow: {
        display: 'flex',
        gap: '12px',
        marginBottom: '25px',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    searchInput: {
        width: '100%',
        padding: '12px 16px',
        borderRadius: '8px',
        border: '2px solid #e1e8ed',
        fontSize: '15px',
        transition: 'all 0.3s ease',
        outline: 'none',
        boxSizing: 'border-box',
    },
    categorySelect: {
        minWidth: '220px',
        padding: '12px 16px',
        borderRadius: '8px',
        border: '2px solid #e1e8ed',
        fontSize: '15px',
        transition: 'all 0.3s ease',
        outline: 'none',
        backgroundColor: '#ffffff',
        cursor: 'pointer',
    },
    tableFrame: {
        border: 'none',
        borderRadius: '12px',
        padding: '0',
        backgroundColor: '#fff',
        boxShadow: '0 8px 24px rgba(33, 147, 176, 0.12)',
        overflow: 'hidden',
    },
    emptyState: {
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)',
        borderRadius: '12px',
        boxShadow: '0 6px 18px rgba(33,147,176,0.12)',
        padding: '24px',
        textAlign: 'center',
        color: '#5f6b7a',
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
        fontSize: '14px',
        color: '#2c3e50',
    },
    editButton: {
        padding: '6px 14px',
        background: 'linear-gradient(135deg, #ffc107 0%, #ffca2c 100%)',
        color: '#000',
        border: 'none',
        borderRadius: '6px',
        marginRight: '8px',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: '600',
        transition: 'all 0.3s ease',
    },
    deleteButton: {
        padding: '6px 14px',
        background: 'linear-gradient(135deg, #dc3545 0%, #e74c3c 100%)',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: '600',
        transition: 'all 0.3s ease',
    },
};

export default MachineManager;