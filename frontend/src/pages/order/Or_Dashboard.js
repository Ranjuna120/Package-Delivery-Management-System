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
            color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        },
        {
            title: 'Track Orders',
            description: 'Monitor order status',
            icon: '📍',
            path: '/OrderTracking',
            color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
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
                        style={{...styles.actionCard, background: card.color}}
                        onClick={() => navigate(card.path)}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.boxShadow = '0 10px 28px rgba(0,0,0,0.18)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.12)';
                        }}
                    >
                        <div style={styles.actionIcon}>{card.icon}</div>
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
        background: 'linear-gradient(135deg, #ffffff 0%, #f7f9fc 100%)',
    },
    header: {
        marginBottom: '24px',
    },
    title: {
        margin: 0,
        color: '#2193b0',
        fontSize: '32px',
        fontWeight: 800,
    },
    subtitle: {
        marginTop: 6,
        color: '#5f6b7a',
        fontSize: 15,
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
        borderRadius: '12px',
        boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
    },
    actionIcon: {
        fontSize: '42px',
    },
    actionTitle: {
        color: '#ffffff',
        fontSize: '20px',
        fontWeight: 700,
        marginBottom: '4px',
    },
    actionDescription: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: '14px',
    },
    tableSection: {
        background: '#ffffff',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 8px 24px rgba(33,147,176,0.12)',
    },
};

export default Or_Dashboard;