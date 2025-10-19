import React from 'react';

const OrderForm = () => {
    const orderData = JSON.parse(localStorage.getItem('orderData'));

    return (
        <div>
            <style>
                {`
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
                    text-align: center; /* Align text to the left */
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
                    text-align: right; /* Align titles to the right */
                    margin-right: 1rem;
                }

                .or_colon {
                    margin-right: 1rem;
                }

                .or_value {
                    flex: 2;
                    text-align: left;
                }
                    .or_all{
                    margin-left:200px;
                    }
                `}
            </style>
            <div className="Or_addcard">
                <h2>Order Details</h2>
              <div className='or_all'>
                <div className="or_row">
                    <div className="or_title">Your Name</div>
                    <div className="or_colon">:</div>
                    <div className="or_value">{orderData.customerName}</div>
                </div>
                <div className="or_row">
                    <div className="or_title">Customer Email</div>
                    <div className="or_colon">:</div>
                    <div className="or_value">{orderData.customerEmail}</div>
                </div>
                <div className="or_row">
                    <div className="or_title">Quantity</div>
                    <div className="or_colon">:</div>
                    <div className="or_value">{orderData.quantity}</div>
                </div>
                <div className="or_row">
                    <div className="or_title">Package Type</div>
                    <div className="or_colon">:</div>
                    <div className="or_value">{orderData.packageType}</div>
                </div>
                <div className="or_row">
                    <div className="or_title">Customer Note</div>
                    <div className="or_colon">:</div>
                    <div className="or_value">{orderData.customerNote}</div>
                </div>
                </div>
                <div>
                    <button className="or_addbuttonx">Confirm</button>
                </div>
            
            </div>
        </div>
    );
};

export default OrderForm;
