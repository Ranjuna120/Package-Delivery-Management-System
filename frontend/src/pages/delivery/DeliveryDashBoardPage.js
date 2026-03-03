import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DeliverySidebar from '../../compoments/Delivery/DeliverySidebar';
import { FaTruck, FaBox, FaCheckCircle, FaExclamationTriangle, FaClock, FaSpinner } from 'react-icons/fa';
import '../../style/delivery/DeliveryDashBoard.css';
import axios from 'axios';

function DeliveryDashBoardPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    assigned: 0,
    inTransit: 0,
    delivered: 0,
    failed: 0
  });
  const [recentDeliveries, setRecentDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    fetchRecentDeliveries();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:8070/deliveries/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching delivery stats:', error);
    }
  };

  const fetchRecentDeliveries = async () => {
    try {
      const response = await axios.get('http://localhost:8070/deliveries/');
      setRecentDeliveries(response.data.slice(0, 5));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching recent deliveries:', error);
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Pending': '#ffa500',
      'Assigned': '#4a90e2',
      'Picked Up': '#9b59b6',
      'In Transit': '#3498db',
      'Out for Delivery': '#f39c12',
      'Delivered': '#27ae60',
      'Failed': '#e74c3c',
      'Returned': '#95a5a6'
    };
    return colors[status] || '#95a5a6';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="delivery-dashboard-container">
      <DeliverySidebar />
      
      <div className="delivery-dashboard-content">
        <div className="dashboard-header">
          <h1>Delivery Management Dashboard</h1>
          <p>Monitor and manage all delivery operations</p>
        </div>

        {/* Statistics Cards */}
        <div className="stats-grid">
          <div className="stat-card total">
            <div className="stat-icon">
              <FaTruck />
            </div>
            <div className="stat-info">
              <h3>{stats.total}</h3>
              <p>Total Deliveries</p>
            </div>
          </div>

          <div className="stat-card pending">
            <div className="stat-icon">
              <FaClock />
            </div>
            <div className="stat-info">
              <h3>{stats.pending}</h3>
              <p>Pending</p>
            </div>
          </div>

          <div className="stat-card in-transit">
            <div className="stat-icon">
              <FaSpinner />
            </div>
            <div className="stat-info">
              <h3>{stats.inTransit}</h3>
              <p>In Transit</p>
            </div>
          </div>

          <div className="stat-card delivered">
            <div className="stat-icon">
              <FaCheckCircle />
            </div>
            <div className="stat-info">
              <h3>{stats.delivered}</h3>
              <p>Delivered</p>
            </div>
          </div>

          <div className="stat-card assigned">
            <div className="stat-icon">
              <FaBox />
            </div>
            <div className="stat-info">
              <h3>{stats.assigned}</h3>
              <p>Assigned</p>
            </div>
          </div>

          <div className="stat-card failed">
            <div className="stat-icon">
              <FaExclamationTriangle />
            </div>
            <div className="stat-info">
              <h3>{stats.failed}</h3>
              <p>Failed</p>
            </div>
          </div>
        </div>

        {/* Recent Deliveries */}
        <div className="recent-deliveries-section">
          <h2>Recent Deliveries</h2>
          
          {loading ? (
            <div className="loading-spinner">
              <FaSpinner className="spinner-icon" />
              <p>Loading deliveries...</p>
            </div>
          ) : (
            <div className="deliveries-table-container">
              <table className="deliveries-table">
                <thead>
                  <tr>
                    <th>Driver</th>
                    <th>Customer</th>
                    <th>Delivery Address</th>
                    <th>Status</th>
                    <th>Estimated Time</th>
                    <th>Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {recentDeliveries.length > 0 ? (
                    recentDeliveries.map((delivery) => (
                      <tr key={delivery._id}>
                        <td>{delivery.driverName}</td>
                        <td>{delivery.customerName}</td>
                        <td className="address-cell">{delivery.deliveryAddress}</td>
                        <td>
                          <span 
                            className="status-badge" 
                            style={{ backgroundColor: getStatusColor(delivery.deliveryStatus) }}
                          >
                            {delivery.deliveryStatus}
                          </span>
                        </td>
                        <td>{formatDate(delivery.estimatedDeliveryTime)}</td>
                        <td>
                          <span className={`priority-badge priority-${delivery.priority.toLowerCase()}`}>
                            {delivery.priority}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="no-data">
                        No recent deliveries found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <button className="action-btn create" onClick={() => window.location.href = '/DeliveryDashBoardPage/add-delivery'}>
              <FaTruck />
              <span>Create Delivery</span>
            </button>
            <button className="action-btn assign" onClick={() => window.location.href = '/DeliveryDashBoardPage/assign-delivery'}>
              <FaBox />
              <span>Assign Delivery</span>
            </button>
            <button className="action-btn track" onClick={() => window.location.href = '/DeliveryDashBoardPage/tracking'}>
              <FaCheckCircle />
              <span>Track Deliveries</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeliveryDashBoardPage;