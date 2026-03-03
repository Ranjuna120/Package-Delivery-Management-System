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
            <button
                onClick={() => navigate('/AdminChoose/GMChoose')}
                style={styles.backBtn}
            >
                <span>←</span> Back
            </button>

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
                            e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                            e.currentTarget.style.boxShadow = '0 16px 40px rgba(102, 126, 234, 0.25)';
                            e.currentTarget.style.borderColor = '#667eea';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.08)';
                            e.currentTarget.style.borderColor = 'transparent';
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
        padding: '48px 32px 80px 32px',
        minHeight: 'calc(100vh - 120px)',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        position: 'relative',
    },
    header: {
        marginBottom: '40px',
        marginTop: '60px',
        background: 'white',
        padding: '32px 40px',
        borderRadius: '20px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
        textAlign: 'center',
    },
    title: {
        margin: 0,
        color: '#2c3e50',
        fontSize: '36px',
        fontWeight: 800,
        letterSpacing: '-0.5px',
    },
    subtitle: {
        marginTop: 12,
        color: '#6c757d',
        fontSize: 16,
        fontWeight: 500,
    },
    actionsRow: {
        display: 'flex',
        gap: '24px',
        marginTop: '32px',
        marginBottom: '40px',
        flexWrap: 'wrap',
    },
    actionCard: {
        flex: '1 1 340px',
        minWidth: '300px',
        padding: '32px',
        borderRadius: '16px',
        backgroundColor: '#ffffff',
        border: '2px solid transparent',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
        cursor: 'pointer',
        transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
    },
    actionIcon: {
        fontSize: '40px',
        width: '64px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '12px',
        flexShrink: 0,
        filter: 'drop-shadow(0 4px 8px rgba(102, 126, 234, 0.2))',
    },
    actionTitle: {
        color: '#2c3e50',
        fontSize: '20px',
        fontWeight: 700,
        marginBottom: '8px',
    },
    actionDescription: {
        color: '#6c757d',
        fontSize: '15px',
        fontWeight: 400,
        lineHeight: 1.5,
    },
    tableSection: {
        background: '#ffffff',
        borderRadius: '20px',
        padding: '32px',
        border: 'none',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
    },
    backBtn: {
        position: 'absolute',
        top: 20,
        left: 20,
        padding: '12px 24px',
        background: 'white',
        color: '#667eea',
        border: '2px solid #667eea',
        borderRadius: 10,
        fontSize: 15,
        fontWeight: 700,
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        zIndex: 10,
    },
};

export default Or_Dashboard;