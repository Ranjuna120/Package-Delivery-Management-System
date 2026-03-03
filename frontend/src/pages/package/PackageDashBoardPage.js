import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../style/package/PackageDashBoard.css';

function PackageDashBoardPage() {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [totalPackages, setTotalPackages] = useState(0);
  const [activePackages, setActivePackages] = useState(0);
  const [deliveredPackages, setDeliveredPackages] = useState(0);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await axios.get('http://localhost:8070/packages/');
      const data = response.data;
      setPackages(data);
      setTotalPackages(data.length);
      // Count active and delivered packages based on your status field
      const active = data.filter(pkg => pkg.status === 'active' || pkg.status === 'in transit' || pkg.status === 'pending').length;
      const delivered = data.filter(pkg => pkg.status === 'delivered').length;
      setActivePackages(active);
      setDeliveredPackages(delivered);
    } catch (error) {
      console.error('Error fetching packages:', error);
      setPackages([]);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.mainContent}>
        <div style={styles.contentWrapper}>
          {/* Header */}
          <div style={styles.header}>
            <button 
              style={styles.backBtn} 
              className="package-back-btn"
              onClick={() => navigate('/AdminChoose/GMChoose')}
            >
              ← BACK
            </button>
            <div>
              <h1 style={styles.title}>Package Management Dashboard</h1>
              <p style={styles.subtitle}>Monitor and manage all packages</p>
            </div>
          </div>

          {/* Summary Cards */}
          <div style={styles.summarySection}>
            <div style={styles.summaryCard} className="package-summary-card">
              <div style={styles.cardIcon}>📦</div>
              <div style={styles.cardContent}>
                <p style={styles.cardLabel}>Total Packages</p>
                <h2 style={styles.cardValue}>{totalPackages}</h2>
                <p style={styles.cardSubtext}>All packages in system</p>
              </div>
            </div>

            <div style={{...styles.summaryCard, ...styles.summaryCardOrange}} className="package-summary-card">
              <div style={styles.cardIcon}>🚚</div>
              <div style={styles.cardContent}>
                <p style={styles.cardLabel}>Active Packages</p>
                <h2 style={styles.cardValue}>{activePackages}</h2>
                <p style={styles.cardSubtext}>In transit</p>
              </div>
            </div>

            <div style={{...styles.summaryCard, ...styles.summaryCardGreen}} className="package-summary-card">
              <div style={styles.cardIcon}>✅</div>
              <div style={styles.cardContent}>
                <p style={styles.cardLabel}>Delivered</p>
                <h2 style={styles.cardValue}>{deliveredPackages}</h2>
                <p style={styles.cardSubtext}>Successfully delivered</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={styles.actionsSection}>
            <h2 style={styles.sectionTitle}>Quick Actions</h2>
            <div style={styles.actionCards}>
              <div 
                style={styles.actionCard} 
                className="package-action-card"
                onClick={() => navigate('/create')}
              >
                <div style={styles.actionIcon}>➕</div>
                <h3 style={styles.actionTitle}>Create Package</h3>
                <p style={styles.actionDescription}>Add new package to system</p>
              </div>

              <div 
                style={styles.actionCard}
                className="package-action-card"
                onClick={() => navigate('/packages')}
              >
                <div style={styles.actionIcon}>📋</div>
                <h3 style={styles.actionTitle}>View All Packages</h3>
                <p style={styles.actionDescription}>Browse all packages</p>
              </div>

              <div 
                style={styles.actionCard}
                className="package-action-card"
                onClick={() => navigate('/reportGen')}
              >
                <div style={styles.actionIcon}>📊</div>
                <h3 style={styles.actionTitle}>Generate Report</h3>
                <p style={styles.actionDescription}>Create package reports</p>
              </div>
            </div>
          </div>

          {/* Recent Packages */}
          <div style={styles.tableSection}>
            <h2 style={styles.sectionTitle}>Recent Packages</h2>
            {packages.length > 0 ? (
              <div style={styles.tableWrapper}>
                <table style={styles.table} className="package-table">
                  <thead>
                    <tr>
                      <th style={styles.th}>Package ID</th>
                      <th style={styles.th}>Name</th>
                      <th style={styles.th}>Type</th>
                      <th style={styles.th}>Description</th>
                      <th style={styles.th}>Material</th>
                      <th style={styles.th}>Dimensions (L×W×H)</th>
                      <th style={styles.th}>Status</th>
                      <th style={styles.th}>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {packages.slice(0, 5).map((pkg) => (
                      <tr key={pkg._id}>
                        <td style={styles.td}>{pkg._id?.substring(0, 8)}...</td>
                        <td style={styles.td}>{pkg.PackageName || 'N/A'}</td>
                        <td style={styles.td}>{pkg.PackageType || 'N/A'}</td>
                        <td style={styles.td}>{pkg.PackageDescription || 'N/A'}</td>
                        <td style={styles.td}>{pkg.Material || 'N/A'}</td>
                        <td style={styles.td}>{pkg.Length || 0} × {pkg.Width || 0} × {pkg.Height || 0}</td>
                        <td style={styles.td}>
                          <span style={getStatusStyle(pkg.status)}>
                            {pkg.status || 'pending'}
                          </span>
                        </td>
                        <td style={styles.td}>
                          {pkg.createdAt ? new Date(pkg.createdAt).toLocaleDateString() : 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={styles.noDataCard}>
                <p style={styles.noDataText}>No packages found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const getStatusStyle = (status) => {
  const baseStyle = {
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  };

  switch (status?.toLowerCase()) {
    case 'delivered':
      return { ...baseStyle, backgroundColor: '#d4edda', color: '#155724' };
    case 'active':
    case 'in transit':
      return { ...baseStyle, backgroundColor: '#fff3cd', color: '#856404' };
    case 'pending':
      return { ...baseStyle, backgroundColor: '#d1ecf1', color: '#0c5460' };
    default:
      return { ...baseStyle, backgroundColor: '#e9ecef', color: '#495057' };
  }
};

const styles = {
  container: {
    display: 'flex',
    minHeight: 'calc(100vh - 120px)',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    fontFamily: "'Roboto', sans-serif",
  },
  mainContent: {
    flex: 1,
    padding: '48px 32px 80px 32px',
  },
  contentWrapper: {
    maxWidth: '100%',
    margin: '0 auto',
  },
  header: {
    marginBottom: '40px',
    background: 'white',
    padding: '32px 40px',
    borderRadius: '20px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
  },
  backBtn: {
    padding: '12px 24px',
    background: '#6c757d',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontWeight: '700',
    cursor: 'pointer',
    fontSize: '14px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    transition: 'all 0.3s ease',
    marginBottom: '16px',
  },
  title: {
    fontSize: '36px',
    fontWeight: '800',
    color: '#2c3e50',
    margin: 0,
  },
  subtitle: {
    fontSize: '16px',
    color: '#6c757d',
    margin: '12px 0 0 0',
    fontWeight: '500',
  },
  summarySection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
    marginBottom: '30px',
  },
  summaryCard: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '10px',
    padding: '18px 22px',
    color: '#fff',
    boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  summaryCardOrange: {
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    boxShadow: '0 4px 20px rgba(245, 87, 108, 0.3)',
  },
  summaryCardGreen: {
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    boxShadow: '0 4px 20px rgba(79, 172, 254, 0.3)',
  },
  cardIcon: {
    fontSize: '36px',
    lineHeight: 1,
  },
  cardContent: {
    flex: 1,
    textAlign: 'left',
  },
  cardLabel: {
    fontSize: '12px',
    fontWeight: '500',
    opacity: 0.9,
    margin: '0 0 6px 0',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  cardValue: {
    fontSize: '24px',
    fontWeight: '700',
    margin: '0 0 6px 0',
  },
  cardSubtext: {
    fontSize: '11px',
    opacity: 0.8,
    margin: 0,
  },
  actionsSection: {
    marginBottom: '40px',
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: '24px',
  },
  actionCards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '24px',
  },
  actionCard: {
    background: '#fff',
    borderRadius: '16px',
    padding: '32px 28px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
    border: '2px solid transparent',
    cursor: 'pointer',
    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
    textAlign: 'center',
  },
  actionIcon: {
    fontSize: '56px',
    marginBottom: '16px',
    filter: 'drop-shadow(0 4px 8px rgba(102, 126, 234, 0.2))',
  },
  actionTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#2c3e50',
    margin: '0 0 12px 0',
  },
  actionDescription: {
    fontSize: '15px',
    color: '#6c757d',
    margin: 0,
    lineHeight: 1.5,
  },
  tableSection: {
    background: '#fff',
    borderRadius: '20px',
    padding: '32px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
    border: 'none',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: 0,
    overflow: 'hidden',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
  },
  th: {
    padding: '18px 16px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: '13px',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
  },
  td: {
    padding: '16px',
    borderBottom: '1px solid #e9ecef',
    textAlign: 'center',
    fontSize: '13px',
    color: '#495057',
  },
  noDataCard: {
    textAlign: 'center',
    padding: '60px 20px',
    background: '#f8f9fa',
    borderRadius: '8px',
    marginTop: '20px',
  },
  noDataText: {
    color: '#7F8C8D',
    fontSize: '16px',
    margin: 0,
  },
};

export default PackageDashBoardPage;