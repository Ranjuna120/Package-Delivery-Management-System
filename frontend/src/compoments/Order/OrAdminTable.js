import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useNavigate } from 'react-router-dom';

function OrAdminTable() {
    const [data, setData] = useState([]); 
    const [filterOrder, setFilterOrder] = useState([]); 
    const navigate = useNavigate();

  
    const handleNavigate = (action, id) => {
        navigate(`/OrderDashBoardPage${action}/${id}`);
    };


    const handleSearch = (e) => {
        const searchValue = e.target.value.toLowerCase();
        if (searchValue === '') {
            setFilterOrder(data); 
        } else {
            const filtered = data.filter((order) =>
                order.Cus_email.toLowerCase().includes(searchValue),
            
            );
            setFilterOrder(filtered);
        }
    };


    const handleGeneratePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16); 
        doc.text("Order Details", 14, 20);
        
        const tableclm = [
            "Order ID",
            "Customer Name",
            "Quantity",
            "Package Type",
            "Order Status",
            "Tracking Status"
        ];
    
        const tablerow = data.map((order) => [
            order._id,
            order.Cus_name,
            order.qty,
            order.package_type,
            order.status,
            order.Or_tracking
        ]);
    
    
        doc.autoTable({
            head: [tableclm],
            body: tablerow,
            startY: 30 
        });
    
        doc.save("Order_Details.pdf");
    };
    
    const columns = [
        {
            name: 'Order ID',
            selector: row => row._id,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.Cus_name,
        },
        {
            name: 'Email',
            selector: row => row.Cus_email,
        },
        {
            name: 'Status',
            selector: row => row.status,
            cell: row => {
                const getStatusStyle = (status) => {
                    switch(status) {
                        case 'Approval':
                            return { bg: '#d4edda', color: '#155724', border: '#c3e6cb' };
                        case 'Cancel':
                            return { bg: '#f8d7da', color: '#721c24', border: '#f5c6cb' };
                        case 'Pending':
                            return { bg: '#d1ecf1', color: '#0c5460', border: '#bee5eb' };
                        default:
                            return { bg: '#e2e3e5', color: '#383d41', border: '#d6d8db' };
                    }
                };
                const style = getStatusStyle(row.status);
                return (
                    <span
                        style={{
                            padding: '6px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: 600,
                            backgroundColor: style.bg,
                            color: style.color,
                            border: `1px solid ${style.border}`,
                            display: 'inline-block',
                        }}
                    >
                        {row.status || 'N/A'}
                    </span>
                );
            },
        },
        {
            name: 'Tracking',
            selector: row => row.Or_tracking,
            cell: row => {
                const getTrackingStyle = (tracking) => {
                    switch(tracking) {
                        case 'Approval':
                            return { bg: '#d4edda', color: '#155724', border: '#c3e6cb', label: '✓ Approved' };
                        case 'Processing':
                            return { bg: '#fff3cd', color: '#856404', border: '#ffeaa7', label: '⏱ Processing' };
                        case 'Finish':
                            return { bg: '#d1ecf1', color: '#0c5460', border: '#bee5eb', label: '✓ Finished' };
                        default:
                            return { bg: '#e2e3e5', color: '#383d41', border: '#d6d8db', label: tracking || 'N/A' };
                    }
                };
                const style = getTrackingStyle(row.Or_tracking);
                return (
                    <span
                        style={{
                            padding: '6px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: 600,
                            backgroundColor: style.bg,
                            color: style.color,
                            border: `1px solid ${style.border}`,
                            display: 'inline-block',
                        }}
                    >
                        {style.label}
                    </span>
                );
            },
        },
        {
            name: 'Action',
            cell: row => (
                <button 
                    onClick={() => handleNavigate('/orderTrack', row._id)}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: '#4A90E2',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        fontSize: '13px',
                        transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#357ABD';
                        e.target.style.transform = 'scale(1.02)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#4A90E2';
                        e.target.style.transform = 'scale(1)';
                    }}
                >
                    View Details
                </button>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    // Fetch data from backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8070/api/orders/Allread'); 
                setData(response.data); 
                setFilterOrder(response.data); 
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };
        fetchData(); 
    }, []);

    const customStyles = {
        headRow: {
            style: {
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: '700',
                borderRadius: '0',
                minHeight: '52px',
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
            },
        },
        headCells: {
            style: {
                paddingLeft: '16px',
                paddingRight: '16px',
            },
        },
        rows: {
            style: {
                fontSize: '14px',
                minHeight: '64px',
                '&:hover': {
                    backgroundColor: '#f8fffe',
                    cursor: 'pointer',
                },
            },
        },
        cells: {
            style: {
                paddingLeft: '16px',
                paddingRight: '16px',
            },
        },
    };

    return (
        <div>
            <div style={styles.tableHeader}>
                <h2 style={styles.tableTitle}>All Orders</h2>
                <div style={styles.actions}>
                    <div style={styles.searchWrapper}>
                        <input
                            type='text'
                            placeholder='Search by email...'
                            onChange={handleSearch}
                            style={styles.searchInput}
                        />
                        <span style={styles.searchIcon}>🔍</span>
                    </div>
                    <button onClick={handleGeneratePDF} style={styles.pdfButton}>
                        📄 Export PDF
                    </button>
                </div>
            </div>
            <DataTable
                columns={columns}
                data={filterOrder}
                customStyles={customStyles}
                highlightOnHover
                pointerOnHover
                noDataComponent={
                    <div style={styles.noData}>
                        <p>No orders found</p>
                    </div>
                }
            />
        </div>
    );
}

const styles = {
    tableHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        flexWrap: 'wrap',
        gap: '20px',
    },
    tableTitle: {
        margin: 0,
        color: '#2c3e50',
        fontSize: '24px',
        fontWeight: 700,
    },
    actions: {
        display: 'flex',
        gap: '16px',
        alignItems: 'center',
    },
    searchWrapper: {
        position: 'relative',
    },
    searchInput: {
        padding: '12px 44px 12px 18px',
        borderRadius: '10px',
        border: '2px solid #e0e0e0',
        fontSize: '14px',
        width: '300px',
        outline: 'none',
        transition: 'all 0.3s ease',
        backgroundColor: '#f8f9fa',
    },
    searchIcon: {
        position: 'absolute',
        right: '16px',
        top: '50%',
        transform: 'translateY(-50%)',
        fontSize: '18px',
        color: '#6c757d',
    },
    pdfButton: {
        padding: '12px 24px',
        background: '#E74C3C',
        color: '#fff',
        border: 'none',
        borderRadius: '10px',
        fontWeight: 700,
        cursor: 'pointer',
        fontSize: '14px',
        transition: 'all 0.3s ease',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    },
    noData: {
        padding: '60px',
        textAlign: 'center',
        color: '#6c757d',
        fontSize: '16px',
    },
};

export default OrAdminTable;