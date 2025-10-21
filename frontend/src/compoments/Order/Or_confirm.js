import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OrderForm = () => {
    const navigate = useNavigate();
    const initialOrderData = JSON.parse(localStorage.getItem('orderData')) || {};

    const [customerName, setCustomerName] = useState(initialOrderData.customerName || '');
    const [customerEmail, setCustomerEmail] = useState(initialOrderData.customerEmail || '');
    const [quantity, setQuantity] = useState(initialOrderData.quantity || '');
    const [packageType, setPackageType] = useState(initialOrderData.packageType || '');
    const [customerNote, setCustomerNote] = useState(initialOrderData.customerNote || '');
    const [date, setDate] = useState(initialOrderData.date || '');
 
    const sendData = (e) => {
        e.preventDefault();
    
        const order = {
            Cus_name: customerName,
            Cus_email: customerEmail,
            qty: quantity,
            package_type: packageType,
            Cus_note: customerNote,
            date: date,
        
        };
    
        console.log('Order Data:', order);
    
        axios.post("http://localhost:8070/api/orders/add", order)
            .then((response) => {
                alert("Order added successfully!");
                console.log(response.data);
                // Reset form fields
                setCustomerName('');
                setCustomerEmail('');
                setQuantity('');
                setPackageType('');
                setCustomerNote('');
                setDate('');
                localStorage.removeItem('orderData');
                navigate('/OrderDashBoardPage'); 
            })
            .catch((err) => {
                console.error("Error details:", err.response ? err.response.data : err.message);
                alert("Order not added: " + (err.response ? err.response.data.message : err.message));
            });
    };
    

    return (
        <div>
            <style>
                {`
                body{background-color:#e6eee4;}
                .Or_addcard {
                    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
                    transition: 0.3s;
                    width: 50%; 
                    max-width: 1200px; 
                    margin: 0 auto; 
                    padding: 2rem; 
                    background-color: #fff; 
                    border-radius: 8px;
                    margin-bottom: 4.3rem;
                    margin-top: 4.3rem;
                    text-align: center;
                }
                .or_addbuttonx {
                    padding: 0.7rem 1.5rem;
                    border: none;
                    background-color: #7289d5;
                    color: white;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }
                .or_addbuttonx:hover {
                    background-color: #385cd2;
                }
                .or_row {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    margin-bottom: 1rem;
                    width: 100%;
                    max-width: 600px;
                }
                .or_title {
                    flex: 1;
                    font-weight: bold;
                    text-align: right;
                    margin-right: 1rem;
                }
                .or_colon {
                    margin-right: 1rem;
                }
                .or_value {
                    flex: 2;
                    text-align: left;
                }
                .or_all {
                    margin-left: 200px;
                }
                `}
            </style>
            <div className="Or_addcard">
                <h2>Order Details</h2>
                <div className='or_all'>
                    <div className="or_row">
                        <div className="or_title">Your Name</div>
                        <div className="or_colon">:</div>
                        <div className="or_value">
                            <input
                            readOnly
                                type="text" 
                                value={customerName} 
                                onChange={(e) => setCustomerName(e.target.value)} 
                                required
                            />
                        </div>
                    </div>
                    <div className="or_row">
                        <div className="or_title">Customer Email</div>
                        <div className="or_colon">:</div>
                        <div className="or_value">
                            <input 
                            readOnly
                                type="email" 
                                value={customerEmail} 
                                onChange={(e) => setCustomerEmail(e.target.value)} 
                                required
                            />
                        </div>
                    </div>
                    <div className="or_row">
                        <div className="or_title">Quantity</div>
                        <div className="or_colon">:</div>
                        <div className="or_value">
                            <input 
                            readOnly
                                type="number" 
                                value={quantity} 
                                onChange={(e) => setQuantity(e.target.value)} 
                                required
                                min="1"
                            />
                        </div>
                    </div>
                    <div className="or_row">
                        <div className="or_title">Package Type</div>
                        <div className="or_colon">:</div>
                        <div className="or_value">
                            <input 
                            readOnly
                                type="text" 
                                value={packageType} 
                                onChange={(e) => setPackageType(e.target.value)} 
                                required
                            />
                        </div>
                    </div>
                    <div className="or_row">
                        <div className="or_title">Customer Note</div>
                        <div className="or_colon">:</div>
                        <div className="or_value">
                            <textarea 
                            readOnly
                                value={customerNote} 
                                onChange={(e) => setCustomerNote(e.target.value)} 
                                rows="3"
                            />
                        </div>
                    </div>
                    <div className="or_row">
                        <div className="or_title">Date</div>
                        <div className="or_colon">:</div>
                        <div className="or_value"> 
                            <input
                            readOnly
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <button className="or_addbuttonx" onClick={sendData}>Confirm</button>
                </div>
            </div>
        </div>
    );
};

export default OrderForm;