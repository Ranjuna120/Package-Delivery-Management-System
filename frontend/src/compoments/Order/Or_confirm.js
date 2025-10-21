import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OrderConfirm = () => {
    const navigate = useNavigate();
    const initialOrderData = JSON.parse(localStorage.getItem('orderData')) || {};

    const [customerName] = useState(initialOrderData.customerName || '');
    const [customerEmail] = useState(initialOrderData.customerEmail || '');
    const [quantity] = useState(initialOrderData.quantity || '');
    const [packageType] = useState(initialOrderData.packageType || '');
    const [customerNote] = useState(initialOrderData.customerNote || '');
    const [date] = useState(initialOrderData.date || '');
    const [isSubmitting, setIsSubmitting] = useState(false);
 
    const handleBack = () => {
        navigate('/Or_add');
    };

    const sendData = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
    
        const order = {
            Cus_name: customerName,
            Cus_email: customerEmail,
            qty: quantity,
            package_type: packageType,
            Cus_note: customerNote,
            date: date,
        };
    
        try {
            const response = await axios.post("http://localhost:8070/api/orders/add", order);
            console.log('Order created:', response.data);
            
            // Get the created order ID from response
            const createdOrderId = response.data._id;
            
            alert("✓ Order placed successfully!");
            localStorage.removeItem('orderData');
            
            // Redirect to order tracking page with the new order ID
            navigate(`/OrderDashBoardPage/orderTracks/${createdOrderId}`);
        } catch (err) {
            console.error("Error details:", err.response ? err.response.data : err.message);
            alert("Failed to place order: " + (err.response ? err.response.data.message : err.message));
        } finally {
            setIsSubmitting(false);
        }
    };
    

    return (
        <>
            <style>{`
                body {
                    background: linear-gradient(135deg, #f5f7fa 0%, #e3e9f0 100%) !important;
                    min-height: 100vh;
                }
            `}</style>
            <div style={{
                marginLeft: '50px',
                padding: '30px 60px',
                minHeight: '100vh',
                background: 'transparent',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            {/* Centered Content */}
            <div style={{
                width: '100%',
                maxWidth: '700px',
            }}>
            {/* Order Details Card */}
            <div style={{
                width: '100%',
                background: 'white',
                borderRadius: '12px',
                padding: '30px',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
            }}>
                {/* Back Button */}
                <div style={{
                    marginBottom: '20px',
                }}>
                    <button
                        onClick={handleBack}
                        disabled={isSubmitting}
                        style={{
                            background: 'white',
                            border: '2px solid #2193b0',
                            borderRadius: '6px',
                            padding: '6px 14px',
                            fontSize: '13px',
                            fontWeight: '600',
                            color: '#2193b0',
                            cursor: isSubmitting ? 'not-allowed' : 'pointer',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            opacity: isSubmitting ? 0.5 : 1,
                        }}
                        onMouseEnter={(e) => {
                            if (!isSubmitting) {
                                e.target.style.background = '#2193b0';
                                e.target.style.color = 'white';
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 4px 12px rgba(33, 147, 176, 0.3)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isSubmitting) {
                                e.target.style.background = 'white';
                                e.target.style.color = '#2193b0';
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                            }
                        }}
                    >
                        <span style={{ fontSize: '14px' }}>←</span>
                        Back to Form
                    </button>
                </div>

                {/* Icon and Title Section */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: '25px',
                }}>
                    <div style={{
                        width: '70px',
                        height: '70px',
                        margin: '0 auto 15px',
                        background: 'linear-gradient(135deg, #17a2b8, #20c997)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '36px',
                        boxShadow: '0 6px 20px rgba(23, 162, 184, 0.4)',
                    }}>
                        📋
                    </div>
                    <h1 style={{
                        fontSize: '32px',
                        fontWeight: '700',
                        color: '#17a2b8',
                        marginBottom: '8px',
                    }}>
                        Review Your Order
                    </h1>
                    <p style={{
                        fontSize: '16px',
                        color: '#6c757d',
                        fontWeight: '500',
                    }}>
                        Please review the details before confirming
                    </p>
                </div>

                {/* Order Details */}
                <div style={{
                    display: 'grid',
                    gap: '10px',
                }}>
                    {/* Customer Name */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '10px',
                        background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
                        borderRadius: '6px',
                        borderLeft: '3px solid #2193b0',
                    }}>
                        <span style={{ fontSize: '18px', marginRight: '10px' }}>👤</span>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '11px', color: '#666', marginBottom: '2px' }}>Customer Name</div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>{customerName}</div>
                        </div>
                    </div>

                    {/* Customer Email */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '10px',
                        background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
                        borderRadius: '6px',
                        borderLeft: '3px solid #2193b0',
                    }}>
                        <span style={{ fontSize: '18px', marginRight: '10px' }}>✉️</span>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '11px', color: '#666', marginBottom: '2px' }}>Email Address</div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>{customerEmail}</div>
                        </div>
                    </div>

                    {/* Quantity */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '10px',
                        background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
                        borderRadius: '6px',
                        borderLeft: '3px solid #2193b0',
                    }}>
                        <span style={{ fontSize: '18px', marginRight: '10px' }}>🔢</span>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '11px', color: '#666', marginBottom: '2px' }}>Quantity</div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>{quantity}</div>
                        </div>
                    </div>

                    {/* Package Type */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '10px',
                        background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
                        borderRadius: '6px',
                        borderLeft: '3px solid #2193b0',
                    }}>
                        <span style={{ fontSize: '18px', marginRight: '10px' }}>📦</span>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '11px', color: '#666', marginBottom: '2px' }}>Package Type</div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>{packageType}</div>
                        </div>
                    </div>

                    {/* Customer Note */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '10px',
                        background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
                        borderRadius: '6px',
                        borderLeft: '3px solid #2193b0',
                    }}>
                        <span style={{ fontSize: '18px', marginRight: '10px' }}>📝</span>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '11px', color: '#666', marginBottom: '2px' }}>Special Instructions</div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>{customerNote || 'No special instructions'}</div>
                        </div>
                    </div>

                    {/* Date */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '10px',
                        background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
                        borderRadius: '6px',
                        borderLeft: '3px solid #2193b0',
                    }}>
                        <span style={{ fontSize: '18px', marginRight: '10px' }}>📅</span>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '11px', color: '#666', marginBottom: '2px' }}>Delivery Date</div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>{date}</div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div style={{
                    display: 'flex',
                    gap: '10px',
                    marginTop: '18px',
                    justifyContent: 'center',
                }}>
                    <button
                        type="button"
                        onClick={handleBack}
                        disabled={isSubmitting}
                        style={{
                            padding: '10px 28px',
                            fontSize: '14px',
                            fontWeight: '600',
                            border: '2px solid #6c757d',
                            borderRadius: '6px',
                            background: 'white',
                            color: '#6c757d',
                            cursor: isSubmitting ? 'not-allowed' : 'pointer',
                            transition: 'all 0.3s ease',
                            opacity: isSubmitting ? 0.5 : 1,
                        }}
                        onMouseEnter={(e) => {
                            if (!isSubmitting) {
                                e.target.style.background = '#6c757d';
                                e.target.style.color = 'white';
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 4px 12px rgba(108, 117, 125, 0.3)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isSubmitting) {
                                e.target.style.background = 'white';
                                e.target.style.color = '#6c757d';
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = 'none';
                            }
                        }}
                    >
                        Edit Order
                    </button>

                    <button
                        type="button"
                        onClick={sendData}
                        disabled={isSubmitting}
                        style={{
                            padding: '10px 28px',
                            fontSize: '14px',
                            fontWeight: '600',
                            border: 'none',
                            borderRadius: '6px',
                            background: isSubmitting 
                                ? '#ccc' 
                                : '#2193b0',
                            color: 'white',
                            cursor: isSubmitting ? 'not-allowed' : 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: isSubmitting 
                                ? 'none' 
                                : '0 4px 12px rgba(33, 147, 176, 0.4)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                        }}
                        onMouseEnter={(e) => {
                            if (!isSubmitting) {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 6px 16px rgba(33, 147, 176, 0.5)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isSubmitting) {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 4px 12px rgba(33, 147, 176, 0.4)';
                            }
                        }}
                    >
                        {isSubmitting ? (
                            <>
                                <span style={{
                                    display: 'inline-block',
                                    width: '13px',
                                    height: '13px',
                                    border: '2px solid white',
                                    borderTop: '2px solid transparent',
                                    borderRadius: '50%',
                                    animation: 'spin 1s linear infinite',
                                }}></span>
                                Processing...
                            </>
                        ) : (
                            <>
                                Confirm Order ✓
                            </>
                        )}
                    </button>
                </div>
            </div>
            </div>

            {/* Spinner Animation */}
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
        </>
    );
};

export default OrderConfirm;