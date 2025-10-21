


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
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <style>
        {`
<<<<<<< HEAD
=======
        body{background-color:#e6eee4;}
>>>>>>> main
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
<<<<<<< HEAD
            background-color: #ccc;
=======
            background-color: #000;  /* Black color for step line */
          }
          .or_completedLine {
            background-color: black;  /* Black bold line */
            height: 4px;  /* Bold line */
>>>>>>> main
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
<<<<<<< HEAD
            background-color: #2da6ab;
=======
            background-color: #439e2d;
>>>>>>> main
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
<<<<<<< HEAD
            cursor: pointer;
=======
            cursor: pointer; 
>>>>>>> main
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

      <h1 className="or_header">Ruchi Package</h1>

      <div className="or_orderSection">
        <div className="or_orderBox">
          <h2 className="or_title">ORDER TRACKING</h2>
          <div className="or_trackingBar">
            <div className="or_step or_completedStep">✔</div>
            <div className="or_stepLine"></div>
            <div className="or_step or_completedStep">✔</div>
            <div className="or_stepLine"></div>
            <div className="or_step">⚪</div>
          </div>
          <div className="or_trackingLabels">
            <p className="or_labelText">Approval Order</p>
            <p className="or_labelText">Processing Order</p>
            <p className="or_labelText">Finish Product</p>
          </div>
        </div>

        <div className="or_orderBox">
          <h2 className="or_title">ORDER INFO</h2>
          <div className="or_infoBox">
            <p className="or_infoText">Order ID : <span className="or_infoSpan">E43D213</span></p>
            <p className="or_infoText">Quantity : <span className="or_infoSpan">250 pcs</span></p>
            <p className="or_infoText">Package Type : <span className="or_infoSpan">restaurants pack</span></p>
            <p className="or_infoText">Finishing data : <span className="or_infoSpan">15/05/2024</span></p>
          </div>
          <div className="or_actionButtons">
            <button className="or_editButton">Edit</button>
            <button className="or_deleteButton">Delete</button>
          </div>
        </div>
      </div>

      {orderData ? (
        <div className="or_orderSection">
          {/* Order Tracking Section */}
          <div className="or_orderBox"> 
            <h2 className="or_title">ORDER TRACKING</h2>
            <div className="or_trackingBar">
              <div className={`or_step ${Tracking === 'Approval' || Tracking === 'Processing' || Tracking === 'Finish' ? 'or_completedStep' : ''}`}>✔</div>
              <div className={`or_stepLine ${Tracking === 'Processing' || Tracking === 'Finish' ? 'or_completedLine' : ''}`}></div>
              <div className={`or_step ${Tracking === 'Processing' || Tracking === 'Finish' ? 'or_completedStep' : ''}`}>✔</div>
              <div className={`or_stepLine ${Tracking === 'Finish' ? 'or_completedLine' : ''}`}></div>
              <div className={`or_step ${Tracking === 'Finish' ? 'or_completedStep' : ''}`}>✔</div>
            </div>
            <div className="or_trackingLabels">
              <p className="or_labelText">Approval Order</p>
              <p className="or_labelText">Processing Order</p>
              <p className="or_labelText">Finish Product</p>
            </div>
            <hr></hr>
            <h4>Order Status</h4>
            <select
              value={orderData.status}
              onChange={(e) => handleStatusChange(orderData._id, e.target.value)}
            >
              <option value="none">--</option>
              <option value="Pending">Pending</option>
              <option value="Approval">Approval</option>
              <option value="Cancel">Cancel</option>
            </select>
            <h4>Order Tracking</h4>
            <select
              value={Tracking}  
              onChange={(e) => handleTrackingStatus(orderData._id, e.target.value)}
            >
              <option value="Approval">Approval</option>
              <option value="Processing">Processing</option>
              <option value="Finish">Finish</option>
            </select>
          </div>
         
          <div className="or_orderBox">
            <h2 className="or_title">ORDER INFO</h2>
            <div className="or_infoBox">
              <p className="or_infoText">Order ID : <span className="or_infoSpan">{orderData._id}</span></p>
              <p className="or_infoText">Customer Email : <span className="or_infoSpan">{orderData.Cus_email}</span></p>
              <p className="or_infoText">Order Status : <span className="or_infoSpan"  style={{
                color: orderData.status === 'Approval' ? 'green' : orderData.status === 'Cancel' ? 'red' : 'blue',
                fontWeight: 'bold'
              }}>{orderData.status}</span></p>
              <p className="or_infoText">Quantity : <span className="or_infoSpan">{orderData.qty} pcs</span></p>
              <p className="or_infoText">Order Tracking Status : <span className="or_infoSpan"  style={{
                color: Tracking === 'Approval' ? 'green' : Tracking === 'Finish' ? 'red' : 'blue',
                fontWeight: 'bold'
              }}>{Tracking} Order</span></p>
              <p className="or_infoText">Package Type : <span className="or_infoSpan">{orderData.package_type}</span></p>
              <p className="or_infoText">Order Date : <span className="or_infoSpan">{orderData.date}</span></p>
            </div>

            <div className="or_actionButtons">
              <button className="or_editButton" onClick={() => handleNavigate("updateOrder", orderData._id)}>EDIT</button>
              <button className="or_deleteButton" onClick={() => handleDelete(orderData._id)}>DELETE</button>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      
      <div className="or_otherOrders">
        <h2 className="or_title">OTHER ORDERS</h2>
        <table className="or_table">
          <thead>
            <tr>
              <th className="or_tableHeader">Order ID</th>
              <th className="or_tableHeader">Package type</th>
              <th className="or_tableHeader">Order ID</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="or_tableData">E2895A</td>
              <td className="or_tableData">Cardboard pack</td>
              <td className="or_tableData"><button className="or_moreButton">More</button></td>
            </tr>
            <tr>
              <td className="or_tableData">E2895A</td>
              <td className="or_tableData">Restaurants pack</td>
              <td className="or_tableData">Restaurants packs</td>
              <td className="or_tableData"><button className="or_moreButton">More</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;