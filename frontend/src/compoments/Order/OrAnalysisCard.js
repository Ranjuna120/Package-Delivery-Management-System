import React, { useEffect, useState } from "react";
import axios from "axios";

function Or_Analysis() {
    const [data, SetStatus] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fedata = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:8070/api/orders/Allread');
                SetStatus(response.data);
            } catch (error) {
                console.error("Error ", error);
            } finally {
                setLoading(false);
            }
        };
        fedata();
    }, []);

    let a = 0;
    let p = 0;
    let c = 0;

    data.forEach(order => {
        if (order.status === 'Approval') {
            a++;
        } else if (order.status === 'Cancel') {
            c++;
        } else if (order.status === 'Pending') {
            p++;
        }
    });
    
    const stats = [
        {
            title: 'Approved Orders',
            value: a,
            icon: '✓',
            color: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)',
            iconBg: '#27ae60',
        },
        {
            title: 'Pending Orders',
            value: p,
            icon: '⏱',
            color: 'linear-gradient(135deg, #f39c12 0%, #f1c40f 100%)',
            iconBg: '#f39c12',
        },
        {
            title: 'Cancelled Orders',
            value: c,
            icon: '✕',
            color: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
            iconBg: '#e74c3c',
        },
        {
            title: 'Total Orders',
            value: data.length,
            icon: '📦',
            color: 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)',
            iconBg: '#2193b0',
        },
    ];

    if (loading) {
        return (
            <div style={styles.container}>
                <div style={styles.loadingText}>Loading statistics...</div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            {stats.map((stat, index) => (
                <div
                    key={index}
                    style={{...styles.card, background: stat.color}}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(33,147,176,0.12)';
                    }}
                >
                    <div style={styles.cardContent}>
                        <div style={{...styles.iconCircle, backgroundColor: stat.iconBg}}>
                            <span style={styles.icon}>{stat.icon}</span>
                        </div>
                        <div style={styles.textContent}>
                            <div style={styles.title}>{stat.title}</div>
                            <div style={styles.value}>{stat.value}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

const styles = {
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '20px',
        marginBottom: '24px',
    },
    card: {
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(33,147,176,0.12)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
    },
    cardContent: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
    },
    iconCircle: {
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        flexShrink: 0,
    },
    icon: {
        fontSize: '28px',
        filter: 'brightness(0) invert(1)',
    },
    textContent: {
        flex: 1,
    },
    title: {
        color: 'rgba(255,255,255,0.95)',
        fontSize: '14px',
        fontWeight: 600,
        marginBottom: '4px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    },
    value: {
        color: '#ffffff',
        fontSize: '32px',
        fontWeight: 800,
        lineHeight: 1,
    },
    loadingText: {
        textAlign: 'center',
        padding: '24px',
        color: '#5f6b7a',
        fontSize: '16px',
        gridColumn: '1 / -1',
    },
};

export default Or_Analysis;