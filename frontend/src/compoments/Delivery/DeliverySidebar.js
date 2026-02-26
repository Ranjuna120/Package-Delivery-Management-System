import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTruck, FaClipboardList, FaUserPlus, FaChartBar, FaMapMarkedAlt, FaHistory, FaArrowLeft } from 'react-icons/fa';
import '../../style/delivery/DeliverySidebar.css';

function DeliverySidebar() {
  const navigate = useNavigate();

  return (
    <div className="delivery-sidebar">
      <h2 className="sidebar-title">
        <FaTruck className="sidebar-icon" />
        Delivery Management
      </h2>
      
      <nav className="sidebar-nav">
        <Link to="/DeliveryDashBoardPage" className="sidebar-link">
          <FaChartBar className="link-icon" />
          <span>Dashboard</span>
        </Link>
        
        <Link to="/DeliveryDashBoardPage/deliveries" className="sidebar-link">
          <FaClipboardList className="link-icon" />
          <span>All Deliveries</span>
        </Link>
        
        <Link to="/DeliveryDashBoardPage/add-delivery" className="sidebar-link">
          <FaUserPlus className="link-icon" />
          <span>Create Delivery</span>
        </Link>
        
        <Link to="/DeliveryDashBoardPage/assign-delivery" className="sidebar-link">
          <FaTruck className="link-icon" />
          <span>Assign Deliveries</span>
        </Link>
        
        <Link to="/DeliveryDashBoardPage/tracking" className="sidebar-link">
          <FaMapMarkedAlt className="link-icon" />
          <span>Track Deliveries</span>
        </Link>
        
        <Link to="/DeliveryDashBoardPage/history" className="sidebar-link">
          <FaHistory className="link-icon" />
          <span>Delivery History</span>
        </Link>
      </nav>

      <button 
        onClick={() => navigate('/AdminChoose/PMChoose')}
        className="sidebar-back-btn"
      >
        <FaArrowLeft className="link-icon" />
        <span>Back</span>
      </button>
    </div>
  );
}

export default DeliverySidebar;
