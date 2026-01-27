
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function OrderTracking() {
  
  const [orderData, setOrderData] = useState(null);
  const [Tracking, setTracking] = useState("");  
  const [loading, setLoading] = useState(false);
  const [searchOrderId, setSearchOrderId] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [searchMethod, setSearchMethod] = useState('email'); // 'email' or 'id'
  const [showSearch, setShowSearch] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  const handleNavigate = (action, id) => {
    navigate(`/OrderDashBoardPage/${action}/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this order?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8070/api/orders/delete/${id}`); 
        alert("Order deleted successfully!");
        navigate('/OrderDashBoardPage'); 
      } catch (error) {
        console.error("Error deleting order", error);
        alert("Failed to delete order");
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:8070/api/orders/update/${id}`, {
        status: newStatus,
      });
      setOrderData((prevData) => ({
        ...prevData,
        status: newStatus,
      }));
      alert("✓ Order status updated successfully!");
    } catch (error) {
      console.error("Error updating order status", error);
      alert(`Failed to update order status`);
    }
  };

  const handleTrackingStatus = async (id, newTracking) => {
    try {
      await axios.put(`http://localhost:8070/api/orders/update/${id}`, {
        Or_tracking: newTracking,
      });
      setTracking(newTracking);  
      alert("✓ Order tracking updated successfully!");
    } catch (error) {
      console.error("Error updating order tracking", error);
      alert("Failed to update order tracking");
    }
    return newTracking;
  };

  useEffect(() => {
    if (!id) {
      setShowSearch(true);
      setLoading(false);
      return;
    }

    const fetchOrderData = async () => {
      try {
        setLoading(true);
        setShowSearch(false);
        const response = await axios.get(`http://localhost:8070/api/orders/read/${id}`);
        setOrderData(response.data);
        setTracking(response.data.Or_tracking || 'Approval'); 
      } catch (error) {
        console.error("Error fetching order data", error);
        alert("Failed to load order data");
        setShowSearch(true);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrderData();
  }, [id]); 

  const getStatusColor = (status) => {
    switch(status) {
      case 'Approval': return '#27ae60';
      case 'Pending': return '#f39c12';
      case 'Cancel': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const getTrackingSteps = () => {
    const steps = [
      { key: 'Approval', label: 'Order Approved' },
      { key: 'Processing', label: 'Processing' },
      { key: 'Finish', label: 'Completed' }
    ];
    
    const currentIndex = steps.findIndex(s => s.key === Tracking);
    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex,
      active: index === currentIndex
    }));
  };

  const handleSearch = async () => {
    if (searchMethod === 'email') {
      if (!searchEmail.trim()) {
        alert('Please enter your email address');
        return;
      }
      
      try {
        setLoading(true);
        // Fetch all orders and filter by email
        const response = await axios.get('http://localhost:8070/api/orders/Allread');
        const orders = response.data;
        const userOrders = orders.filter(order => 
          order.Cus_email.toLowerCase() === searchEmail.toLowerCase()
        );
        
        if (userOrders.length === 0) {
          alert('No orders found for this email address.');
          setLoading(false);
          return;
        }
        
        // If multiple orders, show the most recent one
        const latestOrder = userOrders.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
        setOrderData(latestOrder);
        setTracking(latestOrder.Or_tracking || 'Approval');
        setShowSearch(false);
      } catch (error) {
        console.error("Error fetching order data", error);
        alert("Error searching for orders. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      // Search by Order ID
      if (!searchOrderId.trim()) {
        alert('Please enter an Order ID');
        return;
      }
      
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8070/api/orders/read/${searchOrderId}`);
        setOrderData(response.data);
        setTracking(response.data.Or_tracking || 'Approval');
        setShowSearch(false);
      } catch (error) {
        console.error("Error fetching order data", error);
        alert("Order not found. Please check your Order ID and try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  if (showSearch && !id) {
    return (
      <div style={styles.container}>
        <button 
          onClick={() => navigate('/')}
          style={styles.searchBackButton}
        >
          ← Back
        </button>
        <div style={styles.searchCard}>
          <div style={styles.searchIcon}>📦</div>
          <h1 style={styles.searchTitle}>Track Your Order</h1>
          <p style={styles.searchSubtitle}>Enter your details to track your package</p>
          
          {/* Toggle between Email and Order ID */}
          <div style={styles.toggleButtons}>
            <button
              style={{
                ...styles.toggleButton,
                ...(searchMethod === 'email' ? styles.toggleButtonActive : {}),
              }}
              onClick={() => setSearchMethod('email')}
            >
              Track by Email
            </button>
            <button
              style={{
                ...styles.toggleButton,
                ...(searchMethod === 'id' ? styles.toggleButtonActive : {}),
              }}
              onClick={() => setSearchMethod('id')}
            >
              Track by Order ID
            </button>
          </div>

          <div style={styles.searchBox}>
            {searchMethod === 'email' ? (
              <input
                type="email"
                placeholder="Enter your email address"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                style={styles.searchInput}
              />
            ) : (
              <input
                type="text"
                placeholder="Enter Order ID"
                value={searchOrderId}
                onChange={(e) => setSearchOrderId(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                style={styles.searchInput}
              />
            )}
            <button 
              onClick={handleSearch}
              style={styles.searchButton}
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Track Order'}
            </button>
          </div>
          
          <p style={styles.helpText}>
            {searchMethod === 'email' 
              ? 'Enter the email address you used when placing the order'
              : 'Your Order ID was sent to your email when you placed the order'
            }
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingCard}>
          <div style={styles.loader}></div>
          <p style={styles.loadingText}>Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div style={styles.container}>
        <div style={styles.errorCard}>
          <h2 style={styles.errorTitle}>Order Not Found</h2>
          <p style={styles.errorText}>The order you're looking for doesn't exist.</p>
          <button style={styles.backButton} onClick={() => navigate('/OrderDashBoardPage')}>
            ← Back to Orders
          </button>
        </div>
      </div>
    );
  }

  const trackingSteps = getTrackingSteps();

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <button style={styles.backBtn} onClick={() => navigate('/OrderDashBoardPage')}>
          ← Back
        </button>
        <div>
          <h1 style={styles.title}>Order Tracking</h1>
          <p style={styles.subtitle}>Track and manage your order</p>
        </div>
        <div style={styles.headerActions}>
          <button 
            style={styles.editBtn}
            onClick={() => navigate(`/OrderDashBoardPage/updateOrder/${orderData._id}`)}
          >
            ✎ Edit
          </button>
          <button 
            style={styles.deleteBtn}
            onClick={() => handleDelete(orderData._id)}
          >
            🗑 Delete
          </button>
        </div>
      </div>

      <div style={styles.mainContent}>
        {/* Order Info Card */}
        <div style={styles.infoCard}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>Order Information</h2>
            <div style={{...styles.statusBadge, backgroundColor: getStatusColor(orderData.status)}}>
              {orderData.status || 'Pending'}
            </div>
          </div>
          
          <div style={styles.infoGrid}>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Order ID</span>
              <span style={styles.infoValue}>{orderData._id}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Customer</span>
              <span style={styles.infoValue}>{orderData.Cus_name}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Email</span>
              <span style={styles.infoValue}>{orderData.Cus_email}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Quantity</span>
              <span style={styles.infoValue}>{orderData.qty} pcs</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Package Type</span>
              <span style={styles.infoValue}>{orderData.package_type}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Order Date</span>
              <span style={styles.infoValue}>{new Date(orderData.date).toLocaleDateString()}</span>
            </div>
          </div>

          {orderData.Cus_note && (
            <div style={styles.noteSection}>
              <span style={styles.infoLabel}>Customer Note</span>
              <p style={styles.noteText}>{orderData.Cus_note}</p>
            </div>
          )}
        </div>

        {/* Tracking Card */}
        <div style={styles.trackingCard}>
          <h2 style={styles.cardTitle}>Order Progress</h2>
          
          <div style={styles.trackingTimeline}>
            {trackingSteps.map((step, index) => (
              <div key={step.key} style={styles.timelineStep}>
                <div style={styles.stepIndicatorRow}>
                  <div style={{
                    ...styles.stepCircle,
                    backgroundColor: step.completed ? '#27ae60' : '#e0e0e0',
                    border: step.active ? '3px solid #2193b0' : 'none'
                  }}>
                    {step.completed && <span style={styles.checkMark}>✓</span>}
                  </div>
                  {index < trackingSteps.length - 1 && (
                    <div style={{
                      ...styles.stepLine,
                      backgroundColor: trackingSteps[index + 1].completed ? '#27ae60' : '#e0e0e0'
                    }}></div>
                  )}
                </div>
                <div style={styles.stepLabel}>{step.label}</div>
              </div>
            ))}
          </div>

          <div style={styles.controlsSection}>
            <div style={styles.controlGroup}>
              <label style={styles.controlLabel}>Order Status</label>
              <select
                style={styles.select}
                value={orderData.status || 'Pending'}
                onChange={(e) => handleStatusChange(orderData._id, e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Approval">Approval</option>
                <option value="Cancel">Cancel</option>
              </select>
            </div>

            <div style={styles.controlGroup}>
              <label style={styles.controlLabel}>Tracking Stage</label>
              <select
                style={styles.select}
                value={Tracking}
                onChange={(e) => handleTrackingStatus(orderData._id, e.target.value)}
              >
                <option value="Approval">Approval</option>
                <option value="Processing">Processing</option>
                <option value="Finish">Finish</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '30px',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #ffffff 0%, #f7f9fc 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    flexWrap: 'wrap',
    gap: '16px',
  },
  backBtn: {
    padding: '10px 16px',
    background: 'linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: '14px',
  },
  title: {
    margin: 0,
    color: '#2193b0',
    fontSize: '28px',
    fontWeight: 800,
  },
  subtitle: {
    marginTop: 4,
    color: '#5f6b7a',
    fontSize: 14,
  },
  headerActions: {
    display: 'flex',
    gap: '12px',
  },
  editBtn: {
    padding: '10px 20px',
    background: 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: '14px',
  },
  deleteBtn: {
    padding: '10px 20px',
    background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: '14px',
  },
  mainContent: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
    '@media (max-width: 968px)': {
      gridTemplateColumns: '1fr',
    }
  },
  infoCard: {
    background: '#ffffff',
    borderRadius: '16px',
    padding: '28px',
    boxShadow: '0 8px 24px rgba(33,147,176,0.12)',
  },
  trackingCard: {
    background: '#ffffff',
    borderRadius: '16px',
    padding: '28px',
    boxShadow: '0 8px 24px rgba(33,147,176,0.12)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  cardTitle: {
    margin: 0,
    color: '#2c3e50',
    fontSize: '20px',
    fontWeight: 700,
  },
  statusBadge: {
    padding: '6px 16px',
    borderRadius: '20px',
    color: '#fff',
    fontSize: '13px',
    fontWeight: 600,
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
  },
  infoItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  infoLabel: {
    color: '#7f8c8d',
    fontSize: '13px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  infoValue: {
    color: '#2c3e50',
    fontSize: '15px',
    fontWeight: 600,
  },
  noteSection: {
    marginTop: '24px',
    padding: '16px',
    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
    borderRadius: '8px',
  },
  noteText: {
    margin: '8px 0 0 0',
    color: '#2c3e50',
    fontSize: '14px',
    lineHeight: '1.6',
  },
  trackingTimeline: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '32px',
    marginTop: '24px',
  },
  timelineStep: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  stepIndicatorRow: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  stepCircle: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    flexShrink: 0,
    zIndex: 1,
  },
  checkMark: {
    color: '#fff',
    fontWeight: 'bold',
  },
  stepLine: {
    flex: 1,
    height: '4px',
    marginLeft: '-24px',
  },
  stepLabel: {
    marginTop: '12px',
    fontSize: '13px',
    fontWeight: 600,
    color: '#2c3e50',
    textAlign: 'center',
  },
  controlsSection: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    marginTop: '24px',
    paddingTop: '24px',
    borderTop: '2px solid #ecf0f1',
  },
  controlGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  controlLabel: {
    color: '#2c3e50',
    fontSize: '14px',
    fontWeight: 600,
  },
  select: {
    padding: '12px 14px',
    borderRadius: '8px',
    border: '2px solid #e1e8ed',
    fontSize: '14px',
    fontWeight: 500,
    color: '#2c3e50',
    backgroundColor: '#fff',
    cursor: 'pointer',
    outline: 'none',
    transition: 'all 0.3s ease',
  },
  loadingCard: {
    maxWidth: '400px',
    margin: '100px auto',
    padding: '48px',
    background: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 8px 24px rgba(33,147,176,0.12)',
    textAlign: 'center',
  },
  loader: {
    width: '48px',
    height: '48px',
    border: '4px solid #e1e8ed',
    borderTop: '4px solid #2193b0',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 20px',
  },
  loadingText: {
    color: '#5f6b7a',
    fontSize: '16px',
  },
  errorCard: {
    maxWidth: '500px',
    margin: '100px auto',
    padding: '48px',
    background: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 8px 24px rgba(33,147,176,0.12)',
    textAlign: 'center',
  },
  errorTitle: {
    margin: '0 0 12px 0',
    color: '#e74c3c',
    fontSize: '24px',
    fontWeight: 700,
  },
  errorText: {
    margin: '0 0 24px 0',
    color: '#5f6b7a',
    fontSize: '16px',
  },
  backButton: {
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: '14px',
  },
  searchCard: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '60px 40px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    width: '100%',
    textAlign: 'center',
  },
  searchIcon: {
    fontSize: '72px',
    marginBottom: '24px',
  },
  searchTitle: {
    color: '#2c3e50',
    fontSize: '32px',
    fontWeight: 700,
    marginBottom: '12px',
  },
  searchSubtitle: {
    color: '#7f8c8d',
    fontSize: '16px',
    marginBottom: '40px',
  },
  searchBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  searchInput: {
    padding: '16px 20px',
    borderRadius: '8px',
    border: '2px solid #e1e8ed',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  },
  searchButton: {
    padding: '16px 32px',
    background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  toggleButtons: {
    display: 'flex',
    gap: '12px',
    marginBottom: '24px',
    justifyContent: 'center',
  },
  toggleButton: {
    padding: '12px 24px',
    background: '#ecf0f1',
    color: '#7f8c8d',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  toggleButtonActive: {
    background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
    color: '#fff',
  },
  helpText: {
    marginTop: '20px',
    color: '#95a5a6',
    fontSize: '13px',
    fontStyle: 'italic',
  },
  searchBackButton: {
    padding: '10px 20px',
    background: '#6c757d',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '14px',
    marginBottom: '20px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    alignSelf: 'flex-start',
  },
};

export default OrderTracking;