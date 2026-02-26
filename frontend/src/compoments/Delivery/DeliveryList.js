import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DeliverySidebar from './DeliverySidebar';
import { FaSearch, FaEdit, FaTrash, FaEye, FaFilter } from 'react-icons/fa';
import axios from 'axios';
import '../../style/delivery/DeliveryList.css';

function DeliveryList() {
  const navigate = useNavigate();
  const [deliveries, setDeliveries] = useState([]);
  const [filteredDeliveries, setFilteredDeliveries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDeliveries();
  }, []);

  useEffect(() => {
    filterDeliveries();
  }, [searchTerm, statusFilter, deliveries]);

  const fetchDeliveries = async () => {
    try {
      const response = await axios.get('http://localhost:8070/deliveries/');
      setDeliveries(response.data);
      setFilteredDeliveries(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching deliveries:', error);
      setLoading(false);
    }
  };

  const filterDeliveries = () => {
    let filtered = deliveries;

    if (statusFilter !== 'All') {
      filtered = filtered.filter(d => d.deliveryStatus === statusFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(d =>
        d.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.deliveryAddress.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredDeliveries(filtered);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this delivery?')) {
      try {
        await axios.delete(`http://localhost:8070/deliveries/${id}`);
        alert('Delivery deleted successfully!');
        fetchDeliveries();
      } catch (error) {
        console.error('Error deleting delivery:', error);
        alert('Failed to delete delivery');
      }
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
    <div className="delivery-list-container">
      <DeliverySidebar />
      
      <div className="delivery-list-content">
        <div className="list-header">
          <h1>All Deliveries</h1>
          <button className="add-delivery-btn" onClick={() => navigate('/DeliveryDashBoardPage/add-delivery')}>
            + Add New Delivery
          </button>
        </div>

        {/* Search and Filter */}
        <div className="search-filter-section">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by driver, customer, or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-box">
            <FaFilter className="filter-icon" />
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="All">All Status</option>
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
        </div>

        {/* Deliveries Table */}
        {loading ? (
          <div className="loading">Loading deliveries...</div>
        ) : (
          <div className="table-container">
            <table className="deliveries-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Driver</th>
                  <th>Customer</th>
                  <th>Delivery Address</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Estimated Time</th>
                  <th>Actions</th>
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
                          {delivery.deliveryStatus}
                        </span>
                      </td>
                      <td>
                        <span className={`priority-badge priority-${delivery.priority.toLowerCase()}`}>
                          {delivery.priority}
                        </span>
                      </td>
                      <td>{formatDate(delivery.estimatedDeliveryTime)}</td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="action-btn view"
                            onClick={() => navigate(`/DeliveryDashBoardPage/view/${delivery._id}`)}
                            title="View Details"
                          >
                            <FaEye />
                          </button>
                          <button 
                            className="action-btn edit"
                            onClick={() => navigate(`/DeliveryDashBoardPage/edit/${delivery._id}`)}
                            title="Edit Delivery"
                          >
                            <FaEdit />
                          </button>
                          <button 
                            className="action-btn delete"
                            onClick={() => handleDelete(delivery._id)}
                            title="Delete Delivery"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="no-data">
                      No deliveries found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        <div className="results-count">
          Showing {filteredDeliveries.length} of {deliveries.length} deliveries
        </div>
      </div>
    </div>
  );
}

export default DeliveryList;
