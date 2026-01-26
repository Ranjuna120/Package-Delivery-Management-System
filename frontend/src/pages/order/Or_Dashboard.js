import React from 'react';
import { useNavigate } from 'react-router-dom';
import Or_AnalysisCard from '../../compoments/Order/OrAnalysisCard';
import Or_AdminTable from "../../compoments/Order/OrAdminTable"; 

function Or_Dashboard() {
    const navigate = useNavigate();

    const actionCards = [
        {
            title: 'Add New Order',
            description: 'Create a new order',
            icon: '➕',
            path: '/Or_add',
            color: '#4A90E2',
        },
        {
            title: 'Track Orders',
            description: 'Monitor order status',
            icon: '📍',
            path: '/OrderTracking',
            color: '#2ECC71',
        },
    ];

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <h1 style={styles.title}>Order Dashboard</h1>
                <p style={styles.subtitle}>Manage and monitor all orders</p>
            </div>

            {/* Analysis Cards */}
            <Or_AnalysisCard />

            {/* Quick Actions */}
            <div style={styles.actionsRow}>
                {actionCards.map((card, index) => (
                    <div
                        key={index}
                        style={styles.actionCard}
                        onClick={() => navigate(card.path)}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                            e.currentTarget.style.borderColor = card.color;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                            e.currentTarget.style.borderColor = '#E1E8ED';
                        }}
                    >
                        <div style={{...styles.actionIcon, backgroundColor: card.color + '15', color: card.color}}>
                            {card.icon}
                        </div>
                        <div>
                            <div style={styles.actionTitle}>{card.title}</div>
                            <div style={styles.actionDescription}>{card.description}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Orders Table */}
            <div style={styles.tableSection}>
                <Or_AdminTable />
            </div>
        </div>
    );
}

const styles = {
    container: {
        padding: '30px',
        minHeight: '100vh',
        background: '#F5F7FA',
    },
    header: {
        marginBottom: '32px',
    },
    title: {
        margin: 0,
        color: '#2C3E50',
        fontSize: '32px',
        fontWeight: 700,
        letterSpacing: '-0.5px',
    },
    subtitle: {
        marginTop: 8,
        color: '#7F8C8D',
        fontSize: 16,
        fontWeight: 400,
    },
    actionsRow: {
        display: 'flex',
        gap: '20px',
        marginTop: '24px',
        marginBottom: '32px',
        flexWrap: 'wrap',
    },
    actionCard: {
        flex: '1 1 300px',
        minWidth: '280px',
        padding: '24px',
        borderRadius: '8px',
        backgroundColor: '#ffffff',
        border: '1px solid #E1E8ED',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
    },
    actionIcon: {
        fontSize: '32px',
        width: '48px',
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
        flexShrink: 0,
    },
    actionTitle: {
        color: '#2C3E50',
        fontSize: '18px',
        fontWeight: 600,
        marginBottom: '4px',
    },
    actionDescription: {
        color: '#7F8C8D',
        fontSize: '14px',
        fontWeight: 400,
    },
    tableSection: {
        background: '#ffffff',
        borderRadius: '8px',
        padding: '24px',
        border: '1px solid #E1E8ED',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    },
};

export default Or_Dashboard;