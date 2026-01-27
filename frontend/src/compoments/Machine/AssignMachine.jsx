import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AssignMachine = () => {
  const navigate = useNavigate();
  const [orderQueue, setOrderQueue] = useState({ orderId: '', machineId: '' });
  const [infoOrders, setInfoOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8070/orderqueues/Allread');
        setInfoOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };
    fetchOrders();

    // Load completed orders from localStorage
    const storedCompletedOrders = localStorage.getItem('completedOrders');
    if (storedCompletedOrders) {
      setCompletedOrders(JSON.parse(storedCompletedOrders));
    }
  }, []);

  // Handling form input changes
  const handleOrderInputChange = (e) => {
    setOrderQueue({
      ...orderQueue,
      [e.target.name]: e.target.value,
    });
  };

  // Assigning order to machine
  const handleAssignOrder = async (e) => {
    e.preventDefault();
    if (orderQueue.orderId && orderQueue.machineId) {
      const orderData = {
        orderid: orderQueue.orderId,
        machineid: orderQueue.machineId,
      };
      try {
        setLoading(true);
        const response = await axios.post('http://localhost:8070/orderqueues/add', orderData);
        alert('Order assigned successfully!');
        setInfoOrders([...infoOrders, response.data]);
        setOrderQueue({ orderId: '', machineId: '' });
        setLoading(false);
      } catch (error) {
        console.error('Error assigning order:', error);
        alert('Error assigning order.');
        setLoading(false);
      }
    }
  };

  // Removing an order
  const handleRemoveOrder = async (id, index) => {
    const ok = window.confirm('Are you sure you want to remove this assigned order?');
    if (!ok) return;
    try {
      setLoading(true);
      await axios.delete(`http://localhost:8070/orderqueues/delete/${id}`);
      alert('Order removed successfully!');
      const updatedOrders = [...infoOrders];
      updatedOrders.splice(index, 1);
      setInfoOrders(updatedOrders);
      setLoading(false);
    } catch (error) {
      console.error('Error removing order:', error);
      alert('Error removing order.');
      setLoading(false);
    }
  };

  // Marking an order as completed
  const handleMarkAsCompleted = (order, index) => {
    // Move the order to completedOrders list
    const updatedCompletedOrders = [...completedOrders, order];
    setCompletedOrders(updatedCompletedOrders);

    // Save completed orders to localStorage
    localStorage.setItem('completedOrders', JSON.stringify(updatedCompletedOrders));

    // Remove from infoOrders list
    const updatedOrders = [...infoOrders];
    updatedOrders.splice(index, 1);
    setInfoOrders(updatedOrders);
  };

  const assignedCount = infoOrders.length;
  const completedCount = completedOrders.length;

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.headerRow}>
        <div>
          <h1 style={styles.title}>Assign Machine</h1>
          <p style={styles.subtitle}>Link orders with machines and track progress</p>
        </div>
        <button style={styles.backButton} onClick={() => navigate(-1)}>← Back</button>
      </div>

      {/* Stats */}
      <div style={styles.statsRow}>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Assigned</div>
          <div style={styles.statValue}>{assignedCount}</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Completed</div>
          <div style={styles.statValue}>{completedCount}</div>
        </div>
      </div>
      {/* Assign Machine to Order Form */}
      <div style={styles.manageOrderQueue}>
        <h2>Assign Machine to Order</h2>
        <form onSubmit={handleAssignOrder} style={styles.box}>
          <div style={styles.details}>
            <div>
              <label>Order ID:</label>
              <input
                type="text"
                name="orderId"
                value={orderQueue.orderId}
                onChange={handleOrderInputChange}
                style={styles.inputField}
              />
            </div>
            <div>
              <label>Machine ID:</label>
              <input
                type="text"
                name="machineId"
                value={orderQueue.machineId}
                onChange={handleOrderInputChange}
                style={styles.inputField}
              />
            </div>
          </div>
          <button type="submit" style={{...styles.assignButton, opacity: loading ? 0.8 : 1}} disabled={loading}>
            {loading ? 'Assigning...' : 'Assign'}
          </button>
        </form>
      </div>

      {/* Assigned Orders */}
      <div style={styles.infoSection}>
        <h2>Assigned Orders</h2>
        {loading ? (
          <div style={styles.emptyState}>Loading orders...</div>
        ) : infoOrders.length === 0 ? (
          <div style={styles.emptyState}>No orders assigned yet. Use the form above to assign one.</div>
        ) : (
          infoOrders.map((order, index) => (
            <div key={order._id} style={styles.infoBox}>
              <div>
                <strong>Order ID:</strong> {order.orderid}
              </div>
              <div>
                <strong>Machine ID:</strong> {order.machineid}
              </div>
              <button onClick={() => handleMarkAsCompleted(order, index)} style={styles.completedButton} disabled={loading}>
                Mark as Completed
              </button>
              <button onClick={() => handleRemoveOrder(order._id, index)} style={styles.removeButton} disabled={loading}>
                {loading ? 'Removing...' : 'Remove'}
              </button>
            </div>
          ))
        )}
      </div>

      {/* Completed Orders Section */}
      <div style={styles.infoSection}>
        <h2>Completed Orders</h2>
        {completedOrders.length === 0 ? (
          <div style={styles.emptyState}>No completed orders yet.</div>
        ) : (
          completedOrders.map((order, index) => (
            <div key={order._id} style={styles.infoBox}>
              <div>
                <strong>Order ID:</strong> {order.orderid}
              </div>
              <div>
                <strong>Machine ID:</strong> {order.machineid}
              </div>
              <div>
                <strong>Status:</strong> Completed
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Inline styles for the component
const styles = {
  container: {
    padding: '30px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    minHeight: '100vh',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '28px',
  },
  title: {
    margin: 0,
    color: '#ffffff',
    fontSize: '36px',
    fontWeight: 700,
    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  subtitle: {
    marginTop: 8,
    color: '#f0f0f0',
    fontSize: 16,
  },
  backButton: {
    padding: '10px 24px',
    background: 'rgba(255,255,255,0.2)',
    color: '#fff',
    border: '2px solid rgba(255,255,255,0.3)',
    borderRadius: 8,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
  },
  statsRow: {
    display: 'flex',
    gap: '20px',
    marginBottom: '32px',
    flexWrap: 'wrap',
  },
  statCard: {
    flex: '1 1 200px',
    minWidth: '200px',
    background: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
    borderTop: '4px solid #667eea',
    padding: '24px 28px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  statLabel: {
    color: '#7F8C8D',
    fontSize: '14px',
    marginBottom: '10px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  statValue: {
    color: '#667eea',
    fontWeight: 700,
    fontSize: '32px',
  },
  manageOrderQueue: {
    width: '100%',
    backgroundColor: '#ffffff',
    padding: '32px',
    borderRadius: '16px',
    marginBottom: '32px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
    borderTop: '4px solid #667eea',
  },
  infoSection: {
    width: '100%',
    backgroundColor: '#ffffff',
    padding: '32px',
    borderRadius: '16px',
    marginBottom: '32px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
    borderTop: '4px solid #764ba2',
  },
  box: {
    background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f0ff 100%)',
    padding: '24px',
    marginBottom: '16px',
    borderRadius: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
    border: '2px solid rgba(102, 126, 234, 0.2)',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    flex: 1,
  },
  assignButton: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    border: 'none',
    padding: '14px 32px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '15px',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  removeButton: {
    background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
    color: '#fff',
    border: 'none',
    padding: '9px 18px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '13px',
    transition: 'all 0.3s ease',
    marginLeft: '8px',
    boxShadow: '0 3px 10px rgba(255, 107, 107, 0.3)',
  },
  completedButton: {
    background: 'linear-gradient(135deg, #51cf66 0%, #37b24d 100%)',
    color: '#fff',
    border: 'none',
    padding: '9px 18px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '13px',
    transition: 'all 0.3s ease',
    boxShadow: '0 3px 10px rgba(81, 207, 102, 0.3)',
  },
  infoBox: {
    background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f0ff 100%)',
    padding: '22px',
    marginBottom: '14px',
    borderRadius: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '14px',
    border: '2px solid rgba(102, 126, 234, 0.2)',
    transition: 'all 0.3s ease',
  },
  inputField: {
    padding: '12px 16px',
    borderRadius: '8px',
    border: '2px solid rgba(102, 126, 234, 0.3)',
    marginTop: '8px',
    width: '100%',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    outline: 'none',
    backgroundColor: '#ffffff',
  },
  emptyState: {
    background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f0ff 100%)',
    borderRadius: '12px',
    border: '2px solid rgba(102, 126, 234, 0.2)',
    padding: '32px',
    textAlign: 'center',
    color: '#667eea',
    fontWeight: '500',
    fontSize: '15px',
  },
};

export default AssignMachine;