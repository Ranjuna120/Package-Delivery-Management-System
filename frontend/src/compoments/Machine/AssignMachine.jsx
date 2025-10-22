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
    background: 'linear-gradient(135deg, #ffffff 0%, #f7f9fc 100%)',
    minHeight: '100vh',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  title: {
    margin: 0,
    color: '#2193b0',
    fontSize: '28px',
    fontWeight: 800,
  },
  subtitle: {
    marginTop: 6,
    color: '#5f6b7a',
    fontSize: 14,
  },
  backButton: {
    padding: '10px 14px',
    background: 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontWeight: 700,
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(33,147,176,0.25)'
  },
  statsRow: {
    display: 'flex',
    gap: '16px',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  statCard: {
    flex: '1 1 200px',
    minWidth: '200px',
    background: 'linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)',
    borderRadius: '12px',
    boxShadow: '0 6px 18px rgba(33,147,176,0.12)',
    padding: '16px 18px',
  },
  statLabel: {
    color: '#5f6b7a',
    fontSize: '13px',
    marginBottom: '6px',
  },
  statValue: {
    color: '#2193b0',
    fontWeight: 800,
    fontSize: '22px',
  },
  manageOrderQueue: {
    width: '100%',
    backgroundColor: '#ffffff',
    padding: '25px',
    borderRadius: '12px',
    marginBottom: '25px',
    boxShadow: '0 8px 24px rgba(33, 147, 176, 0.12)',
  },
  infoSection: {
    width: '100%',
    backgroundColor: '#ffffff',
    padding: '25px',
    borderRadius: '12px',
    marginBottom: '25px',
    boxShadow: '0 8px 24px rgba(33, 147, 176, 0.12)',
  },
  box: {
    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
    padding: '20px',
    marginBottom: '15px',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '15px',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    flex: 1,
  },
  assignButton: {
    background: 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)',
    color: '#fff',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(33, 147, 176, 0.3)',
  },
  removeButton: {
    background: 'linear-gradient(135deg, #dc3545 0%, #e74c3c 100%)',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '13px',
    transition: 'all 0.3s ease',
    marginLeft: '8px',
  },
  completedButton: {
    background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '13px',
    transition: 'all 0.3s ease',
  },
  infoBox: {
    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
    padding: '18px',
    marginBottom: '12px',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px',
  },
  inputField: {
    padding: '10px 14px',
    borderRadius: '6px',
    border: '2px solid #e1e8ed',
    marginTop: '5px',
    width: '100%',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    outline: 'none',
  },
  emptyState: {
    background: 'linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)',
    borderRadius: '12px',
    boxShadow: '0 6px 18px rgba(33,147,176,0.12)',
    padding: '16px',
    textAlign: 'center',
    color: '#5f6b7a',
  },
};

export default AssignMachine;