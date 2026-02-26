import React, { useState, useEffect } from 'react';
import DeliverySidebar from './DeliverySidebar';
import { FaTruck, FaSearch } from 'react-icons/fa';
import axios from 'axios';
import '../../style/delivery/AssignDelivery.css';

function AssignDelivery() {
  const [deliveries, setDeliveries] = useState([]);
  const [filteredDeliveries, setFilteredDeliveries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [assignData, setAssignData] = useState({
    driverName: '',
    driverContact: '',
    vehicleNumber: '',
    vehicleType: 'Van'
  });

  useEffect(() => {
    fetchPendingDeliveries();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setFilteredDeliveries(
        deliveries.filter(d =>
          d.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          d.deliveryAddress.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredDeliveries(deliveries);
    }
  }, [searchTerm, deliveries]);

  const fetchPendingDeliveries = async () => {
    try {
      const response = await axios.get('http://localhost:8070/deliveries/status/Pending');
      setDeliveries(response.data);
      setFilteredDeliveries(response.data);
    } catch (error) {
      console.error('Error fetching pending deliveries:', error);
    }
  };

  const handleAssignClick = (delivery) => {
    setSelectedDelivery(delivery);
    setAssignData({
      driverName: delivery.driverName || '',
      driverContact: delivery.driverContact || '',
      vehicleNumber: delivery.vehicleNumber || '',
      vehicleType: delivery.vehicleType || 'Van'
    });
    setShowModal(true);
  };

  const handleAssignSubmit = async (e) => {
    e.preventDefault();

    if (!assignData.driverName || !assignData.driverContact || !assignData.vehicleNumber) {
      alert('Please fill in all driver details');
      return;
    }

    try {
      await axios.patch(`http://localhost:8070/deliveries/${selectedDelivery._id}/assign`, assignData);
      alert('Delivery assigned successfully!');
      setShowModal(false);
      fetchPendingDeliveries();
    } catch (error) {
      console.error('Error assigning delivery:', error);
      alert('Failed to assign delivery');
    }
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
    <div className="assign-delivery-container">
      <DeliverySidebar />
      
      <div className="assign-delivery-content">
        <div className="header-section">
          <h1>Assign Deliveries</h1>
          <p>Assign pending deliveries to available drivers</p>
        </div>

        <div className="search-section">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by customer or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="delivery-count">
            {filteredDeliveries.length} pending deliveries
          </div>
        </div>

        <div className="deliveries-grid">
          {filteredDeliveries.length > 0 ? (
            filteredDeliveries.map((delivery) => (
              <div key={delivery._id} className="delivery-card">
                <div className="card-header">
                  <span className="order-id">Order #{delivery.orderId ? delivery.orderId.toString().slice(-6) : 'N/A'}</span>
                  <span className={`priority-badge priority-${delivery.priority.toLowerCase()}`}>
                    {delivery.priority}
                  </span>
                </div>

                <div className="card-body">
                  <div className="info-row">
                    <strong>Customer:</strong>
                    <span>{delivery.customerName}</span>
                  </div>
                  <div className="info-row">
                    <strong>Contact:</strong>
                    <span>{delivery.customerContact}</span>
                  </div>
                  <div className="info-row">
                    <strong>Pickup:</strong>
                    <span className="address">{delivery.pickupAddress}</span>
                  </div>
                  <div className="info-row">
                    <strong>Delivery:</strong>
                    <span className="address">{delivery.deliveryAddress}</span>
                  </div>
                  <div className="info-row">
                    <strong>Package:</strong>
                    <span>{delivery.packageDetails}</span>
                  </div>
                  <div className="info-row">
                    <strong>Est. Time:</strong>
                    <span>{formatDate(delivery.estimatedDeliveryTime)}</span>
                  </div>
                  <div className="info-row">
                    <strong>Distance:</strong>
                    <span>{delivery.distance} km</span>
                  </div>
                  <div className="info-row">
                    <strong>Fee:</strong>
                    <span>Rs. {delivery.deliveryFee}</span>
                  </div>
                </div>

                <button className="assign-btn" onClick={() => handleAssignClick(delivery)}>
                  <FaTruck /> Assign Driver
                </button>
              </div>
            ))
          ) : (
            <div className="no-deliveries">
              <p>No pending deliveries to assign</p>
            </div>
          )}
        </div>

        {/* Assignment Modal */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Assign Driver</h2>
                <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
              </div>

              <form onSubmit={handleAssignSubmit}>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Driver Name *</label>
                    <input
                      type="text"
                      value={assignData.driverName}
                      onChange={(e) => setAssignData({ ...assignData, driverName: e.target.value })}
                      placeholder="Enter driver name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Driver Contact *</label>
                    <input
                      type="tel"
                      value={assignData.driverContact}
                      onChange={(e) => setAssignData({ ...assignData, driverContact: e.target.value })}
                      placeholder="Enter driver contact"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Vehicle Number *</label>
                    <input
                      type="text"
                      value={assignData.vehicleNumber}
                      onChange={(e) => setAssignData({ ...assignData, vehicleNumber: e.target.value })}
                      placeholder="Enter vehicle number"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Vehicle Type *</label>
                    <select
                      value={assignData.vehicleType}
                      onChange={(e) => setAssignData({ ...assignData, vehicleType: e.target.value })}
                    >
                      <option value="Bike">Bike</option>
                      <option value="Van">Van</option>
                      <option value="Truck">Truck</option>
                      <option value="Car">Car</option>
                    </select>
                  </div>

                  {selectedDelivery && (
                    <div className="delivery-summary">
                      <h3>Delivery Details</h3>
                      <p><strong>Customer:</strong> {selectedDelivery.customerName}</p>
                      <p><strong>Address:</strong> {selectedDelivery.deliveryAddress}</p>
                      <p><strong>Package:</strong> {selectedDelivery.packageDetails}</p>
                    </div>
                  )}
                </div>

                <div className="modal-footer">
                  <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn">
                    Assign Delivery
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

export default AssignDelivery;
