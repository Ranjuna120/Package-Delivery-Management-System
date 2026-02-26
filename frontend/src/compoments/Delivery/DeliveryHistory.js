import React, { useState, useEffect } from 'react';
import DeliverySidebar from './DeliverySidebar';
import { FaSearch, FaFilter, FaCalendarAlt, FaFileDownload, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import axios from 'axios';
import '../../style/delivery/DeliveryHistory.css';

function DeliveryHistory() {
  const [deliveries, setDeliveries] = useState([]);
  const [filteredDeliveries, setFilteredDeliveries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDeliveries();
  }, []);

  useEffect(() => {
    filterDeliveries();
  }, [searchTerm, statusFilter, dateFilter, deliveries]);

  const fetchDeliveries = async () => {
    try {
      const response = await axios.get('http://localhost:8070/deliveries/');
      // Filter to only show completed deliveries
      const completedDeliveries = response.data.filter(d => 
        ['Delivered', 'Failed', 'Returned'].includes(d.deliveryStatus)
      );
      setDeliveries(completedDeliveries);
      setFilteredDeliveries(completedDeliveries);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching delivery history:', error);
      setLoading(false);
    }
  };

  const filterDeliveries = () => {
    let filtered = deliveries;

    // Filter by status
    if (statusFilter !== 'All') {
      filtered = filtered.filter(d => d.deliveryStatus === statusFilter);
    }

    // Filter by date
    const now = new Date();
    if (dateFilter === 'today') {
      filtered = filtered.filter(d => {
        const deliveryDate = new Date(d.actualDeliveryTime || d.estimatedDeliveryTime);
        return deliveryDate.toDateString() === now.toDateString();
      });
    } else if (dateFilter === 'week') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(d => {
        const deliveryDate = new Date(d.actualDeliveryTime || d.estimatedDeliveryTime);
        return deliveryDate >= weekAgo;
      });
    } else if (dateFilter === 'month') {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(d => {
        const deliveryDate = new Date(d.actualDeliveryTime || d.estimatedDeliveryTime);
        return deliveryDate >= monthAgo;
      });
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(d =>
        d.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.deliveryAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (d.orderId && d.orderId.toString().includes(searchTerm))
      );
    }

    setFilteredDeliveries(filtered);
  };

  const getStatusColor = (status) => {
    const colors = {
      'Delivered': '#27ae60',
      'Failed': '#e74c3c',
      'Returned': '#95a5a6'
    };
    return colors[status] || '#95a5a6';
  };

  const getStatusIcon = (status) => {
    if (status === 'Delivered') return <FaCheckCircle />;
    if (status === 'Failed') return <FaTimesCircle />;
    return <FaTimesCircle />;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateStats = () => {
    const total = filteredDeliveries.length;
    const delivered = filteredDeliveries.filter(d => d.deliveryStatus === 'Delivered').length;
    const failed = filteredDeliveries.filter(d => d.deliveryStatus === 'Failed').length;
    const returned = filteredDeliveries.filter(d => d.deliveryStatus === 'Returned').length;
    const successRate = total > 0 ? ((delivered / total) * 100).toFixed(1) : 0;

    return { total, delivered, failed, returned, successRate };
  };

  const stats = calculateStats();

  return (
    <div className="delivery-history-container">
      <DeliverySidebar />
      
      <div className="delivery-history-content">
        {/* Header */}
        <div className="history-header">
          <div>
            <h1>Delivery History</h1>
            <p>View and analyze completed deliveries</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-cards">
          <div className="stat-card">
            <div className="stat-icon total">
              <FaCalendarAlt />
            </div>
            <div className="stat-details">
              <h3>{stats.total}</h3>
              <p>Total Completed</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon success">
              <FaCheckCircle />
            </div>
            <div className="stat-details">
              <h3>{stats.delivered}</h3>
              <p>Delivered</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon failed">
              <FaTimesCircle />
            </div>
            <div className="stat-details">
              <h3>{stats.failed}</h3>
              <p>Failed</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon rate">
              <FaCheckCircle />
            </div>
            <div className="stat-details">
              <h3>{stats.successRate}%</h3>
              <p>Success Rate</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="filter-section">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by driver, customer, address, or order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-controls">
            <div className="filter-group">
              <FaFilter className="filter-icon" />
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="All">All Status</option>
                <option value="Delivered">Delivered</option>
                <option value="Failed">Failed</option>
                <option value="Returned">Returned</option>
              </select>
            </div>

            <div className="filter-group">
              <FaCalendarAlt className="filter-icon" />
              <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
              </select>
            </div>
          </div>
        </div>

        {/* History Table */}
        {loading ? (
          <div className="loading">Loading delivery history...</div>
        ) : (
          <div className="history-table-container">
            <table className="history-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Driver</th>
                  <th>Customer</th>
                  <th>Delivery Address</th>
                  <th>Status</th>
                  <th>Completed On</th>
                  <th>Priority</th>
                  <th>Fee</th>
                </tr>
              </thead>
              <tbody>
                {filteredDeliveries.length > 0 ? (
                  filteredDeliveries.map((delivery) => (
                    <tr key={delivery._id}>
                      <td>#{delivery.orderId ? delivery.orderId.toString().slice(-6) : 'N/A'}</td>
                      <td>{delivery.driverName}</td>
                      <td>{delivery.customerName}</td>
                      <td className="address-cell">{delivery.deliveryAddress}</td>
                      <td>
                        <span 
                          className="status-badge" 
                          style={{ backgroundColor: getStatusColor(delivery.deliveryStatus) }}
                        >
                          {getStatusIcon(delivery.deliveryStatus)}
                          {delivery.deliveryStatus}
                        </span>
                      </td>
                      <td>{formatDate(delivery.actualDeliveryTime || delivery.estimatedDeliveryTime)}</td>
                      <td>
                        <span className={`priority-badge priority-${delivery.priority.toLowerCase()}`}>
                          {delivery.priority}
                        </span>
                      </td>
                      <td className="fee-cell">Rs. {delivery.deliveryFee.toFixed(2)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="no-data">
                      No delivery history found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        <div className="results-summary">
          <span>Showing {filteredDeliveries.length} of {deliveries.length} completed deliveries</span>
        </div>
      </div>
    </div>
  );
}

export default DeliveryHistory;
