import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const OrderUpdateForm = () => {
  const navigate = useNavigate();
    const { id } = useParams(); 
    const [orderData, setOrderData] = useState(null);
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [qty, setQty] = useState(''); 
    const [packageType, setPackageType] = useState('');
    const [Cus_note, setCus_note] = useState(''); 

    const validateForm = () => {
      if (!customerName) {
        window.alert('Please enter your name.');
        return false;
      }
      if (!customerEmail || !/\S+@\S+\.\S+/.test(customerEmail)) {
        window.alert('Please enter a valid email.');
        return false;
      }
      if (qty < 1) {
        window.alert('Quantity must be at least 1.');
        return false;
      }
      if (!packageType) {
        window.alert('Please select a package type.');
        return false;
      }
      if (!Cus_note) {
        window.alert('Please add a customer note.');
        return false;
      }
      return true;
    };
  
    const handleNext = () => {
      if (!validateForm()) {
        return; 
      }}

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/api/orders/read/${id}`);
                const data = response.data;
                setOrderData(data);
                setCustomerName(data.Cus_name);
                setCustomerEmail(data.Cus_email);
                setQty(data.qty); 
                setPackageType(data.package_type);
                setCus_note(data.Cus_note); 
            } catch (error) {
                console.error("Error fetching order data", error);
            }
        };

        fetchOrderData();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8070/api/orders/update/${id}`, {
                Cus_name: customerName,
                Cus_email: customerEmail,
                qty: qty, 
                package_type: packageType,
                Cus_note: Cus_note, 
            });
            console.log("Update response:", response.data); 
            alert("Order updated successfully!"); 
            
            // Redirect to order tracking page with the updated order ID
            navigate(`/OrderDashBoardPage/orderTracks/${id}`); 
        } catch (error) {
            console.error("Error updating order", error);
            alert("Failed to update the order. Please try again.");
        }
    };
    
    if (!orderData) {
        return <div>Loading...</div>; 
    }

    return (
        <>
            <style>{`
                body {
                    background: linear-gradient(135deg, #f5f7fa 0%, #e3e9f0 100%) !important;
                    min-height: 100vh;
                }
            `}</style>
            <div style={{
                marginLeft: '200px',
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
                    {/* Update Order Card */}
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
                                onClick={() => navigate('/OrderDashBoardPage')}
                                type="button"
                                style={{
                                    background: 'white',
                                    border: '2px solid #2193b0',
                                    borderRadius: '6px',
                                    padding: '6px 14px',
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    color: '#2193b0',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.background = '#2193b0';
                                    e.target.style.color = 'white';
                                    e.target.style.transform = 'translateY(-2px)';
                                    e.target.style.boxShadow = '0 4px 12px rgba(33, 147, 176, 0.3)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.background = 'white';
                                    e.target.style.color = '#2193b0';
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                                }}
                            >
                                <span style={{ fontSize: '14px' }}>←</span>
                                Back
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
                                📝
                            </div>
                            <h1 style={{
                                fontSize: '32px',
                                fontWeight: '700',
                                color: '#17a2b8',
                                marginBottom: '8px',
                            }}>
                                Update Your Order
                            </h1>
                            <p style={{
                                fontSize: '16px',
                                color: '#6c757d',
                                fontWeight: '500',
                            }}>
                                Modify your order details below
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleUpdate} style={{ marginTop: '20px' }}>
                            {/* Customer Name */}
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '15px',
                                    fontWeight: '600',
                                    color: '#333',
                                    marginBottom: '8px',
                                }}>
                                    <span style={{ marginRight: '8px', fontSize: '18px' }}>👤</span>
                                    Customer Name
                                </label>
                                <input
                                    type="text"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    placeholder="Enter your full name"
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        fontSize: '14px',
                                        border: '2px solid #e0e0e0',
                                        borderRadius: '8px',
                                        transition: 'all 0.3s ease',
                                        outline: 'none',
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#17a2b8'}
                                    onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                                />
                            </div>

                            {/* Email */}
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '15px',
                                    fontWeight: '600',
                                    color: '#333',
                                    marginBottom: '8px',
                                }}>
                                    <span style={{ marginRight: '8px', fontSize: '18px' }}>✉️</span>
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={customerEmail}
                                    onChange={(e) => setCustomerEmail(e.target.value)}
                                    placeholder="your.email@example.com"
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        fontSize: '14px',
                                        border: '2px solid #e0e0e0',
                                        borderRadius: '8px',
                                        transition: 'all 0.3s ease',
                                        outline: 'none',
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#17a2b8'}
                                    onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                                />
                            </div>

                            {/* Quantity */}
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '15px',
                                    fontWeight: '600',
                                    color: '#333',
                                    marginBottom: '8px',
                                }}>
                                    <span style={{ marginRight: '8px', fontSize: '18px' }}>🔢</span>
                                    Quantity
                                </label>
                                <input
                                    type="number"
                                    value={qty}
                                    onChange={(e) => setQty(e.target.value)}
                                    placeholder="Enter quantity"
                                    required
                                    min="1"
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        fontSize: '14px',
                                        border: '2px solid #e0e0e0',
                                        borderRadius: '8px',
                                        transition: 'all 0.3s ease',
                                        outline: 'none',
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#17a2b8'}
                                    onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                                />
                            </div>

                            {/* Package Type */}
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '15px',
                                    fontWeight: '600',
                                    color: '#333',
                                    marginBottom: '8px',
                                }}>
                                    <span style={{ marginRight: '8px', fontSize: '18px' }}>📦</span>
                                    Package Type
                                </label>
                                <select
                                    value={packageType}
                                    onChange={(e) => setPackageType(e.target.value)}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        fontSize: '14px',
                                        border: '2px solid #e0e0e0',
                                        borderRadius: '8px',
                                        transition: 'all 0.3s ease',
                                        outline: 'none',
                                        backgroundColor: 'white',
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#17a2b8'}
                                    onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                                >
                                    <option value="">Select a package</option>
                                    <option value="standard">Standard</option>
                                    <option value="premium">Premium</option>
                                    <option value="custom">Custom</option>
                                </select>
                            </div>

                            {/* Customer Note */}
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '15px',
                                    fontWeight: '600',
                                    color: '#333',
                                    marginBottom: '8px',
                                }}>
                                    <span style={{ marginRight: '8px', fontSize: '18px' }}>📝</span>
                                    Special Instructions
                                </label>
                                <textarea
                                    value={Cus_note}
                                    onChange={(e) => setCus_note(e.target.value)}
                                    placeholder="Add any special instructions or notes here..."
                                    rows="4"
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        fontSize: '14px',
                                        border: '2px solid #e0e0e0',
                                        borderRadius: '8px',
                                        transition: 'all 0.3s ease',
                                        outline: 'none',
                                        resize: 'vertical',
                                        fontFamily: 'inherit',
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#17a2b8'}
                                    onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                style={{
                                    width: '100%',
                                    padding: '14px',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    border: 'none',
                                    borderRadius: '8px',
                                    background: 'linear-gradient(135deg, #17a2b8, #20c997)',
                                    color: 'white',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 4px 12px rgba(23, 162, 184, 0.4)',
                                    marginTop: '10px',
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.transform = 'translateY(-2px)';
                                    e.target.style.boxShadow = '0 6px 16px rgba(23, 162, 184, 0.5)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = '0 4px 12px rgba(23, 162, 184, 0.4)';
                                }}
                            >
                                Update Order
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderUpdateForm;