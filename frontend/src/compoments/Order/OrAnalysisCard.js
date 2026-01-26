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
            color: '#27AE60',
            bgColor: '#E8F8F5',
        },
        {
            title: 'Pending Orders',
            value: p,
            icon: '⏱',
            color: '#F39C12',
            bgColor: '#FEF5E7',
        },
        {
            title: 'Cancelled Orders',
            value: c,
            icon: '✕',
            color: '#E74C3C',
            bgColor: '#FADBD8',
        },
        {
            title: 'Total Orders',
            value: data.length,
            icon: '📦',
            color: '#3498DB',
            bgColor: '#EBF5FB',
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
                    style={{...styles.card, backgroundColor: '#ffffff'}}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                    }}
                >
                    <div style={styles.cardContent}>
                        <div style={{...styles.iconCircle, backgroundColor: stat.bgColor}}>
                            <span style={{...styles.icon, color: stat.color}}>{stat.icon}</span>
                        </div>
                        <div style={styles.textContent}>
                            <div style={styles.title}>{stat.title}</div>
                            <div style={{...styles.value, color: stat.color}}>{stat.value}</div>
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
        borderRadius: '8px',
        border: '1px solid #E1E8ED',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
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
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    icon: {
        fontSize: '24px',
        fontWeight: 'bold',
    },
    textContent: {
        flex: 1,
    },
    title: {
        color: '#7F8C8D',
        fontSize: '13px',
        fontWeight: 600,
        marginBottom: '8px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    },
    value: {
        fontSize: '32px',
        fontWeight: 700,
        lineHeight: 1,
    },
    loadingText: {
        textAlign: 'center',
        padding: '24px',
        color: '#7F8C8D',
        fontSize: '16px',
        gridColumn: '1 / -1',
    },
};

export default Or_Analysis;