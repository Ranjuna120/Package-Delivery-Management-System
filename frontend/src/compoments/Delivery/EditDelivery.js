import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DeliverySidebar from './DeliverySidebar';
import { FaSave, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import '../../style/delivery/AddDelivery.css';

function EditDelivery() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    orderId: '',
    driverName: '',
    driverContact: '',
    vehicleNumber: '',
    vehicleType: 'Van',
    deliveryStatus: 'Pending',
    pickupAddress: '',
    deliveryAddress: '',
    customerName: '',
    customerContact: '',
    packageDetails: '',
    estimatedDeliveryTime: '',
    deliveryNotes: '',
    distance: 0,
    deliveryFee: 0,
    priority: 'Medium'
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    fetchDelivery();
  }, [id]);

  const fetchDelivery = async () => {
    try {
      const response = await axios.get(`http://localhost:8070/deliveries/${id}`);
      const delivery = response.data;
      
      // Format datetime for input field
      const formattedTime = delivery.estimatedDeliveryTime 
        ? new Date(delivery.estimatedDeliveryTime).toISOString().slice(0, 16)
        : '';

      setFormData({
        orderId: delivery.orderId || '',
        driverName: delivery.driverName || '',
        driverContact: delivery.driverContact || '',
        vehicleNumber: delivery.vehicleNumber || '',
        vehicleType: delivery.vehicleType || 'Van',
        deliveryStatus: delivery.deliveryStatus || 'Pending',
        pickupAddress: delivery.pickupAddress || '',
        deliveryAddress: delivery.deliveryAddress || '',
        customerName: delivery.customerName || '',
        customerContact: delivery.customerContact || '',
        packageDetails: delivery.packageDetails || '',
        estimatedDeliveryTime: formattedTime,
        deliveryNotes: delivery.deliveryNotes || '',
        distance: delivery.distance || 0,
        deliveryFee: delivery.deliveryFee || 0,
        priority: delivery.priority || 'Medium'
      });
      setFetchLoading(false);
    } catch (error) {
      console.error('Error fetching delivery:', error);
      alert('Failed to fetch delivery details');
      setFetchLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.driverName.trim()) newErrors.driverName = 'Driver name is required';
    if (!formData.driverContact.trim()) newErrors.driverContact = 'Driver contact is required';
    if (!formData.vehicleNumber.trim()) newErrors.vehicleNumber = 'Vehicle number is required';
    if (!formData.pickupAddress.trim()) newErrors.pickupAddress = 'Pickup address is required';
    if (!formData.deliveryAddress.trim()) newErrors.deliveryAddress = 'Delivery address is required';
    if (!formData.customerName.trim()) newErrors.customerName = 'Customer name is required';
    if (!formData.customerContact.trim()) newErrors.customerContact = 'Customer contact is required';
    if (!formData.packageDetails.trim()) newErrors.packageDetails = 'Package details are required';
    if (!formData.estimatedDeliveryTime) newErrors.estimatedDeliveryTime = 'Estimated delivery time is required';

    const phoneRegex = /^[0-9]{9,15}$/;
    if (formData.driverContact) {
      const cleanPhone = formData.driverContact.replace(/\D/g, '');
      if (cleanPhone.length < 9 || cleanPhone.length > 15) {
        newErrors.driverContact = 'Phone number must be 9-15 digits';
      }
    }
    if (formData.customerContact) {
      const cleanPhone = formData.customerContact.replace(/\D/g, '');
      if (cleanPhone.length < 9 || cleanPhone.length > 15) {
        newErrors.customerContact = 'Phone number must be 9-15 digits';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert('Please fix the errors in the form');
      return;
    }

    setLoading(true);

    try {
      await axios.put(`http://localhost:8070/deliveries/${id}`, formData);
      alert('Delivery updated successfully!');
      navigate('/DeliveryDashBoardPage/deliveries');
    } catch (error) {
      console.error('Error updating delivery:', error);
      alert('Failed to update delivery. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="add-delivery-container">
        <DeliverySidebar />
        <div className="add-delivery-content">
          <div className="loading">Loading delivery details...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="add-delivery-container">
      <DeliverySidebar />
      
      <div className="add-delivery-content">
        <div className="form-header">
          <h1>Edit Delivery</h1>
          <button className="back-btn" onClick={() => navigate('/DeliveryDashBoardPage/deliveries')}>
            <FaTimes /> Cancel
          </button>
        </div>

        <form className="delivery-form" onSubmit={handleSubmit}>
          {/* Order Information */}
          <div className="form-section">
            <h2>Order Information</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Order ID (Optional)</label>
                <input
                  type="text"
                  name="orderId"
                  value={formData.orderId}
                  onChange={handleChange}
                  placeholder="Enter order ID (optional)"
                  className={errors.orderId ? 'error' : ''}
                />
                {errors.orderId && <span className="error-message">{errors.orderId}</span>}
              </div>

              <div className="form-group">
                <label>Package Details *</label>
                <input
                  type="text"
                  name="packageDetails"
                  value={formData.packageDetails}
                  onChange={handleChange}
                  placeholder="Enter package details"
                  className={errors.packageDetails ? 'error' : ''}
                />
                {errors.packageDetails && <span className="error-message">{errors.packageDetails}</span>}
              </div>
            </div>
          </div>

          {/* Driver Information */}
          <div className="form-section">
            <h2>Driver Information</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Driver Name *</label>
                <input
                  type="text"
                  name="driverName"
                  value={formData.driverName}
                  onChange={handleChange}
                  placeholder="Enter driver name"
                  className={errors.driverName ? 'error' : ''}
                />
                {errors.driverName && <span className="error-message">{errors.driverName}</span>}
              </div>

              <div className="form-group">
                <label>Driver Contact *</label>
                <input
                  type="tel"
                  name="driverContact"
                  value={formData.driverContact}
                  onChange={handleChange}
                  placeholder="Enter driver contact"
                  className={errors.driverContact ? 'error' : ''}
                />
                {errors.driverContact && <span className="error-message">{errors.driverContact}</span>}
              </div>

              <div className="form-group">
                <label>Vehicle Number *</label>
                <input
                  type="text"
                  name="vehicleNumber"
                  value={formData.vehicleNumber}
                  onChange={handleChange}
                  placeholder="Enter vehicle number"
                  className={errors.vehicleNumber ? 'error' : ''}
                />
                {errors.vehicleNumber && <span className="error-message">{errors.vehicleNumber}</span>}
              </div>

              <div className="form-group">
                <label>Vehicle Type *</label>
                <select name="vehicleType" value={formData.vehicleType} onChange={handleChange}>
                  <option value="Bike">Bike</option>
                  <option value="Van">Van</option>
                  <option value="Truck">Truck</option>
                  <option value="Car">Car</option>
                </select>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="form-section">
            <h2>Customer Information</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Customer Name *</label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  placeholder="Enter customer name"
                  className={errors.customerName ? 'error' : ''}
                />
                {errors.customerName && <span className="error-message">{errors.customerName}</span>}
              </div>

              <div className="form-group">
                <label>Customer Contact *</label>
                <input
                  type="tel"
                  name="customerContact"
                  value={formData.customerContact}
                  onChange={handleChange}
                  placeholder="Enter customer contact"
                  className={errors.customerContact ? 'error' : ''}
                />
                {errors.customerContact && <span className="error-message">{errors.customerContact}</span>}
              </div>
            </div>
          </div>

          {/* Delivery Details */}
          <div className="form-section">
            <h2>Delivery Details</h2>
            <div className="form-grid">
              <div className="form-group full-width">
                <label>Pickup Address *</label>
                <textarea
                  name="pickupAddress"
                  value={formData.pickupAddress}
                  onChange={handleChange}
                  placeholder="Enter pickup address"
                  rows="2"
                  className={errors.pickupAddress ? 'error' : ''}
                />
                {errors.pickupAddress && <span className="error-message">{errors.pickupAddress}</span>}
              </div>

              <div className="form-group full-width">
                <label>Delivery Address *</label>
                <textarea
                  name="deliveryAddress"
                  value={formData.deliveryAddress}
                  onChange={handleChange}
                  placeholder="Enter delivery address"
                  rows="2"
                  className={errors.deliveryAddress ? 'error' : ''}
                />
                {errors.deliveryAddress && <span className="error-message">{errors.deliveryAddress}</span>}
              </div>

              <div className="form-group">
                <label>Delivery Status *</label>
                <select name="deliveryStatus" value={formData.deliveryStatus} onChange={handleChange}>
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
                <label>Estimated Delivery Time *</label>
                <input
                  type="datetime-local"
                  name="estimatedDeliveryTime"
                  value={formData.estimatedDeliveryTime}
                  onChange={handleChange}
                  className={errors.estimatedDeliveryTime ? 'error' : ''}
                />
                {errors.estimatedDeliveryTime && <span className="error-message">{errors.estimatedDeliveryTime}</span>}
              </div>

              <div className="form-group">
                <label>Priority *</label>
                <select name="priority" value={formData.priority} onChange={handleChange}>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>

              <div className="form-group">
                <label>Distance (km)</label>
                <input
                  type="number"
                  name="distance"
                  value={formData.distance}
                  onChange={handleChange}
                  placeholder="Enter distance"
                  min="0"
                  step="0.1"
                />
              </div>

              <div className="form-group">
                <label>Delivery Fee (Rs.)</label>
                <input
                  type="number"
                  name="deliveryFee"
                  value={formData.deliveryFee}
                  onChange={handleChange}
                  placeholder="Enter delivery fee"
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="form-group full-width">
                <label>Delivery Notes</label>
                <textarea
                  name="deliveryNotes"
                  value={formData.deliveryNotes}
                  onChange={handleChange}
                  placeholder="Enter any special instructions or notes"
                  rows="3"
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={() => navigate('/DeliveryDashBoardPage/deliveries')}>
              <FaTimes /> Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              <FaSave /> {loading ? 'Updating...' : 'Update Delivery'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditDelivery;
