import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function App() {
  
  const [orderData, setOrderData] = useState(null);
  const [Tracking, setTracking] = useState("");  

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
        alert("Order deleted successfully");
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
      alert("Order status updated successfully");
    } catch (error) {
      console.error("Error updating order status", error.response.data);
      alert(`Failed to update order status: ${error.response.data.message}`);
    }
    
  };

  const handleTrackingStatus = async (id, newTracking) => {
    try {
      await axios.put(`http://localhost:8070/api/orders/update/${id}`, {
        Or_tracking: newTracking,
      });
      setTracking(newTracking);  
      alert("Order tracking updated successfully");
    } catch (error) {
      console.error("Error updating order tracking", error);
      alert("Failed to update order tracking");
    }
    return newTracking;
  };

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/api/orders/read/${id}`);
        setOrderData(response.data);
        setTracking(response.data.Or_tracking); 
      } catch (error) {
        console.error("Error fetching order data", error);
      }
    };
    
    fetchOrderData();
  }, [id]); 

  return (
    <>
      <style>
        {`
        body{
          background: linear-gradient(135deg, #f5f7fa 0%, #e3e9f0 100%) !important;
          min-height: 100vh !important;
          margin: 0 !important;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
        }
          .or_container {
            font-family: Arial, sans-serif;
            padding: 20px;
          }
          .or_header {
            font-size: 24px;
            text-align: center;
            color: #031f42;
            margin-bottom: 30px;
          }
          .or_orderSection {
            display: flex;
            justify-content: space-between;
          }
          .or_orderBox {
            width: 45%;
            border: 1px solid #ccc;
            border-radius: 8px;
            padding: 20px;
            background-color: #f7f7f7;
          }
          .or_title {
            font-size: 18px;
            margin-bottom: 20px;
          }
          .or_trackingBar {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .or_step {
            width: 25px;
            height: 25px;
            border-radius: 50%;
            background-color: #ccc;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            color: #fff;
          }
          .or_completedStep {
            background-color: green;
          }
          .or_stepLine {
            width: 100%;
            height: 2px;
            background-color: #000;  /* Black color for step line */
          }
          .or_completedLine {
            background-color: black;  /* Black bold line */
            height: 4px;  /* Bold line */
          }
          .or_trackingLabels {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
          }
          .or_labelText {
            font-size: 14px;
          }
          .or_infoBox {
            background-color: #ccc;
            padding: 10px;
            border-radius: 5px;
          }
          .or_infoText {
            font-size: 14px;
            margin: 5px 0;
          }
          .or_infoSpan {
            font-weight: bold;
          }
          .or_actionButtons {
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
          }
          .or_editButton {
            background-color: #439e2d;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer; 
          }
          .or_deleteButton {
            background-color: #f44336;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
          }
          .or_otherOrders {
            margin-top: 30px;
          }
          .or_table {
            width: 100%;
            border-collapse: collapse;
          }
          .or_tableHeader {
            border: 1px solid #ccc;
            padding: 10px;
            text-align: left;
          }
          .or_tableData {
            border: 1px solid #ccc;
            padding: 10px;
            text-align: left;
          }
          .or_moreButton {
            background-color: #6a5acd;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 5px;
            cursor: pointer;
          }
        `}
      </style>

      <div style={{
        minHeight: '100vh',
        padding: '40px 20px',
        maxWidth: '1400px',
        margin: '0 auto',
      }}>
        <button 
          onClick={() => navigate('/OrderDashBoardPage')}
          style={{
            padding: '10px 20px',
            background: '#6c757d',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '14px',
            marginBottom: '30px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          ← BACK
        </button>

        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '30px',
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #17a2b8, #20c997)',
            fontSize: '35px',
            boxShadow: '0 4px 12px rgba(23, 162, 184, 0.3)',
            marginBottom: '15px',
          }}>
            📋
          </div>
          <h1 style={{
            color: '#17a2b8',
            fontSize: '32px',
            fontWeight: '700',
            margin: '10px 0',
          }}>
            Order Details
          </h1>
          <p style={{
            color: '#6c757d',
            fontSize: '14px',
          }}>
            View and manage your order information
          </p>
        </div>

        {orderData ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
          gap: '25px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          {/* Order Tracking Section */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '30px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          }}> 
            <h2 style={{
              color: '#17a2b8',
              fontSize: '20px',
              fontWeight: '700',
              marginBottom: '25px',
              display: 'flex',
              alignItems: 'center',
            }}>
              <span style={{ marginRight: '10px', fontSize: '24px' }}>🚚</span>
              ORDER TRACKING
            </h2>
            <div className="or_trackingBar">
              <div className={`or_step ${Tracking === 'Approval' || Tracking === 'Processing' || Tracking === 'Finish' ? 'or_completedStep' : ''}`}>✔</div>
              <div className={`or_stepLine ${Tracking === 'Processing' || Tracking === 'Finish' ? 'or_completedLine' : ''}`}></div>
              <div className={`or_step ${Tracking === 'Processing' || Tracking === 'Finish' ? 'or_completedStep' : ''}`}>✔</div>
              <div className={`or_stepLine ${Tracking === 'Finish' ? 'or_completedLine' : ''}`}></div>
              <div className={`or_step ${Tracking === 'Finish' ? 'or_completedStep' : ''}`}>✔</div>
            </div>
            <div className="or_trackingLabels">
              <p style={{
                fontSize: '12px',
                fontWeight: '600',
                color: Tracking === 'Approval' || Tracking === 'Processing' || Tracking === 'Finish' ? '#28a745' : '#6c757d',
              }}>Approval Order</p>
              <p style={{
                fontSize: '12px',
                fontWeight: '600',
                color: Tracking === 'Processing' || Tracking === 'Finish' ? '#28a745' : '#6c757d',
              }}>Processing Order</p>
              <p style={{
                fontSize: '12px',
                fontWeight: '600',
                color: Tracking === 'Finish' ? '#28a745' : '#6c757d',
              }}>Finish Product</p>
            </div>
            {/* <h4>Order Status</h4>
            <select
              value={orderData.status}
              onChange={(e) => handleStatusChange(orderData._id, e.target.value)}
            >
              <option value="none">--</option>
              <option value="Pending">Pending</option>
              <option value="Approval">Approval</option>
              <option value="Cancel">Cancel</option>
            </select>  */}
             {/* <h4>Order Tracking</h4>
            <select
              value={Tracking}  
              onChange={(e) => handleTrackingStatus(orderData._id, e.target.value)}
            >
              <option value="Approval">Approval</option>
              <option value="Processing">Processing</option>
              <option value="Finish">Finish</option>
            </select> */}
          </div>
         
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '30px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          }}>
            <h2 style={{
              color: '#17a2b8',
              fontSize: '20px',
              fontWeight: '700',
              marginBottom: '25px',
              display: 'flex',
              alignItems: 'center',
            }}>
              <span style={{ marginRight: '10px', fontSize: '24px' }}>ℹ️</span>
              ORDER INFO
            </h2>
            <div style={{
              background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
              padding: '20px',
              borderRadius: '8px',
              borderLeft: '4px solid #17a2b8',
            }}>
              <p style={{
                fontSize: '14px',
                margin: '12px 0',
                color: '#495057',
                display: 'flex',
                alignItems: 'center',
              }}>
                <span style={{ marginRight: '8px' }}>🆔</span>
                <strong>Order ID:</strong>&nbsp;
                <span style={{ fontFamily: 'monospace', fontSize: '13px' }}>{orderData._id}</span>
              </p>
              <p style={{
                fontSize: '14px',
                margin: '12px 0',
                color: '#495057',
                display: 'flex',
                alignItems: 'center',
              }}>
                <span style={{ marginRight: '8px' }}>✉️</span>
                <strong>Customer Email:</strong>&nbsp;{orderData.Cus_email}
              </p>
              <p style={{
                fontSize: '14px',
                margin: '12px 0',
                color: '#495057',
                display: 'flex',
                alignItems: 'center',
              }}>
                <span style={{ marginRight: '8px' }}>📊</span>
                <strong>Order Status:</strong>&nbsp;
                <span style={{
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: '600',
                  backgroundColor: orderData.status === 'Approval' ? '#d4edda' : orderData.status === 'Cancel' ? '#f8d7da' : '#cfe2ff',
                  color: orderData.status === 'Approval' ? '#155724' : orderData.status === 'Cancel' ? '#721c24' : '#084298',
                }}>{orderData.status}</span>
              </p>
              <p style={{
                fontSize: '14px',
                margin: '12px 0',
                color: '#495057',
                display: 'flex',
                alignItems: 'center',
              }}>
                <span style={{ marginRight: '8px' }}>🔢</span>
                <strong>Quantity:</strong>&nbsp;{orderData.qty} pcs
              </p>
              <p style={{
                fontSize: '14px',
                margin: '12px 0',
                color: '#495057',
                display: 'flex',
                alignItems: 'center',
              }}>
                <span style={{ marginRight: '8px' }}>📍</span>
                <strong>Tracking Status:</strong>&nbsp;
                <span style={{
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: '600',
                  backgroundColor: Tracking === 'Finish' ? '#d4edda' : Tracking === 'Processing' ? '#fff3cd' : '#cfe2ff',
                  color: Tracking === 'Finish' ? '#155724' : Tracking === 'Processing' ? '#856404' : '#084298',
                }}>{Tracking} Order</span>
              </p>
              <p style={{
                fontSize: '14px',
                margin: '12px 0',
                color: '#495057',
                display: 'flex',
                alignItems: 'center',
              }}>
                <span style={{ marginRight: '8px' }}>📦</span>
                <strong>Package Type:</strong>&nbsp;{orderData.package_type}
              </p>
              <p style={{
                fontSize: '14px',
                margin: '12px 0',
                color: '#495057',
                display: 'flex',
                alignItems: 'center',
              }}>
                <span style={{ marginRight: '8px' }}>📅</span>
                <strong>Order Date:</strong>&nbsp;{orderData.date}
              </p>
            </div>

            <div style={{
              marginTop: '25px',
              display: 'flex',
              gap: '15px',
            }}>
              <button 
                onClick={() => handleNavigate("updateOrder", orderData._id)}
                style={{
                  flex: 1,
                  padding: '12px',
                  fontSize: '15px',
                  fontWeight: '600',
                  border: '2px solid #17a2b8',
                  borderRadius: '8px',
                  background: 'white',
                  color: '#17a2b8',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#17a2b8';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'white';
                  e.target.style.color = '#17a2b8';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                ✏️ EDIT
              </button>
              <button 
                onClick={() => handleDelete(orderData._id)}
                style={{
                  flex: 1,
                  padding: '12px',
                  fontSize: '15px',
                  fontWeight: '600',
                  border: '2px solid #dc3545',
                  borderRadius: '8px',
                  background: 'white',
                  color: '#dc3545',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#dc3545';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'white';
                  e.target.style.color = '#dc3545';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                🗑️ DELETE
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '400px',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              border: '4px solid #17a2b8',
              borderTopColor: 'transparent',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
            }}></div>
            <p style={{
              marginTop: '20px',
              color: '#6c757d',
              fontSize: '16px',
            }}>Loading order details...</p>
          </div>
        </div>
      )}
      </div>
    </>
  );
}

export default App; 