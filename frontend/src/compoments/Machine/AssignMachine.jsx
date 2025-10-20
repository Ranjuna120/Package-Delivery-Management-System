import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AssignMachine = () => {
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

  return (
    <div style={styles.container}>
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
          <button type="submit" style={styles.assignButton} disabled={loading}>
            {loading ? 'Assigning...' : 'Assign'}
          </button>
        </form>
      </div>

      {/* Assigned Orders */}
      <div style={styles.infoSection}>
        <h2>Assigned Orders</h2>
        {loading ? (
          <p>Loading orders...</p>
        ) : infoOrders.length === 0 ? (
          <p>No orders assigned yet.</p>
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
          <p>No completed orders yet.</p>
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
};

export default AssignMachine;