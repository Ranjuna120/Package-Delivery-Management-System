import React, { useState, useEffect } from 'react';
import DeliverySidebar from './DeliverySidebar';
import { FaMapMarkedAlt, FaSearch, FaSync } from 'react-icons/fa';
import axios from 'axios';
import '../../style/delivery/DeliveryTracking.css';

function DeliveryTracking() {
  const [deliveries, setDeliveries] = useState([]);
  const [filteredDeliveries, setFilteredDeliveries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Active');
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [statusNotes, setStatusNotes] = useState('');

  useEffect(() => {
    fetchDeliveries();
    const interval = setInterval(fetchDeliveries, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    filterDeliveries();
  }, [searchTerm, statusFilter, deliveries]);

  const fetchDeliveries = async () => {
    try {
      const response = await axios.get('http://localhost:8070/deliveries/');
      setDeliveries(response.data);
    } catch (error) {
      console.error('Error fetching deliveries:', error);
    }
  };

  const filterDeliveries = () => {
    let filtered = deliveries;

    // Filter by status category
    if (statusFilter === 'Active') {
      filtered = filtered.filter(d => 
        ['Assigned', 'Picked Up', 'In Transit', 'Out for Delivery'].includes(d.deliveryStatus)
      );
    } else if (statusFilter === 'Pending') {
      filtered = filtered.filter(d => d.deliveryStatus === 'Pending');
    } else if (statusFilter === 'Completed') {
      filtered = filtered.filter(d => ['Delivered', 'Failed', 'Returned'].includes(d.deliveryStatus));
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(d =>
        d.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.deliveryAddress.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredDeliveries(filtered);
  };

  const handleUpdateStatus = (delivery) => {
    setSelectedDelivery(delivery);
    setNewStatus(delivery.deliveryStatus);
    setStatusNotes('');
    setShowStatusModal(true);
  };

  const handleStatusSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(`http://localhost:8070/deliveries/${selectedDelivery._id}/status`, {
        status: newStatus,
        notes: statusNotes
      });
      alert('Delivery status updated successfully!');
      setShowStatusModal(false);
      fetchDeliveries();
    } catch (error) {
      console.error('Error updating delivery status:', error);
      alert('Failed to update delivery status');
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

  const getProgressPercentage = (status) => {
    const statusOrder = {
      'Pending': 0,
      'Assigned': 20,
      'Picked Up': 40,
      'In Transit': 60,
      'Out for Delivery': 80,
      'Delivered': 100
    };
    return statusOrder[status] || 0;
  };

  return (
    <div className="delivery-tracking-container">
      <DeliverySidebar />
      
      <div className="delivery-tracking-content">
        <div className="tracking-header">
          <div>
            <h1>Live Delivery Tracking</h1>
            <p>Monitor real-time delivery status</p>
          </div>
          <button className="refresh-btn" onClick={fetchDeliveries}>
            <FaSync /> Refresh
          </button>
        </div>

        {/* Filter Controls */}
        <div className="filter-controls">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search deliveries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="status-tabs">
            <button 
              className={statusFilter === 'Active' ? 'active' : ''}
              onClick={() => setStatusFilter('Active')}
            >
              Active
            </button>
            <button 
              className={statusFilter === 'Pending' ? 'active' : ''}
              onClick={() => setStatusFilter('Pending')}
            >
              Pending
            </button>
            <button 
              className={statusFilter === 'Completed' ? 'active' : ''}
              onClick={() => setStatusFilter('Completed')}
            >
              Completed
            </button>
          </div>
        </div>

        {/* Deliveries List */}
        <div className="tracking-list">
          {filteredDeliveries.length > 0 ? (
            filteredDeliveries.map((delivery) => (
              <div key={delivery._id} className="tracking-card">
                <div className="tracking-card-header">
                  <div className="header-left">
                    <h3>Order #{delivery.orderId ? delivery.orderId.toString().slice(-6) : 'N/A'}</h3>
                    <span className={`priority-badge priority-${delivery.priority.toLowerCase()}`}>
                      {delivery.priority}
                    </span>
                  </div>
                  <span 
                    className="status-badge" 
                    style={{ backgroundColor: getStatusColor(delivery.deliveryStatus) }}
                  >
                    {delivery.deliveryStatus}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="progress-section">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${getProgressPercentage(delivery.deliveryStatus)}%`,
                        background: getStatusColor(delivery.deliveryStatus)
                      }}
                    />
                  </div>
                  <div className="progress-percentage">
                    {getProgressPercentage(delivery.deliveryStatus)}% Complete
                  </div>
                </div>

                <div className="tracking-details">
                  <div className="detail-row">
                    <div className="detail-item">
                      <strong>Driver:</strong>
                      <span>{delivery.driverName}</span>
                    </div>
                    <div className="detail-item">
                      <strong>Vehicle:</strong>
                      <span>{delivery.vehicleNumber} ({delivery.vehicleType})</span>
                    </div>
                  </div>

                  <div className="detail-row">
                    <div className="detail-item">
                      <strong>Customer:</strong>
                      <span>{delivery.customerName}</span>
                    </div>
                    <div className="detail-item">
                      <strong>Contact:</strong>
                      <span>{delivery.customerContact}</span>
                    </div>
                  </div>

                  <div className="detail-row">
                    <div className="detail-item full-width">
                      <strong><FaMapMarkedAlt /> Delivery Address:</strong>
                      <span>{delivery.deliveryAddress}</span>
                    </div>
                  </div>

                  <div className="detail-row">
                    <div className="detail-item">
                      <strong>Est. Delivery:</strong>
                      <span>{formatDate(delivery.estimatedDeliveryTime)}</span>
                    </div>
                    <div className="detail-item">
                      <strong>Distance:</strong>
                      <span>{delivery.distance} km</span>
                    </div>
                  </div>
                </div>

                {/* Status History */}
                {delivery.statusHistory && delivery.statusHistory.length > 0 && (
                  <div className="status-history">
                    <strong>Status History:</strong>
                    <div className="history-timeline">
                      {delivery.statusHistory.slice(-3).reverse().map((history, index) => (
                        <div key={index} className="history-item">
                          <div className="history-dot" style={{ background: getStatusColor(history.status) }}></div>
                          <div className="history-content">
                            <span className="history-status">{history.status}</span>
                            <span className="history-time">{formatDate(history.timestamp)}</span>
                            {history.notes && <span className="history-notes">{history.notes}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button 
                  className="update-status-btn"
                  onClick={() => handleUpdateStatus(delivery)}
                >
                  Update Status
                </button>
              </div>
            ))
          ) : (
            <div className="no-deliveries">
              <FaMapMarkedAlt className="no-data-icon" />
              <p>No deliveries found</p>
            </div>
          )}
        </div>

        {/* Status Update Modal */}
        {showStatusModal && (
          <div className="modal-overlay" onClick={() => setShowStatusModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Update Delivery Status</h2>
                <button className="close-btn" onClick={() => setShowStatusModal(false)}>×</button>
              </div>

              <form onSubmit={handleStatusSubmit}>
                <div className="modal-body">
                  <div className="current-status">
                    <p><strong>Current Status:</strong></p>
                    <span 
                      className="status-badge" 
                      style={{ backgroundColor: getStatusColor(selectedDelivery?.deliveryStatus) }}
                    >
                      {selectedDelivery?.deliveryStatus}
                    </span>
                  </div>

                  <div className="form-group">
                    <label>New Status *</label>
                    <select 
                      value={newStatus} 
                      onChange={(e) => setNewStatus(e.target.value)}
                      required
                    >
                      <option value="Pending">Pending</option>
                      <option value="Assigned">Assigned</option>
                      <option value="Picked Up">Picked Up</option>
                      <option value="In Transit">In Transit</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Failed">Failed</option>
                      <option value="Returned">Returned</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Notes</label>
                    <textarea
                      value={statusNotes}
                      onChange={(e) => setStatusNotes(e.target.value)}
                      placeholder="Add any notes about this status update..."
                      rows="3"
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="cancel-btn" onClick={() => setShowStatusModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn">
                    Update Status
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DeliveryTracking;
