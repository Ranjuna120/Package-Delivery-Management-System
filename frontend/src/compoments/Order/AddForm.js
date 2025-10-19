import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

const OrderForm = () => {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [packageType, setPackageType] = useState('');
  const [customerNote, setCustomerNote] = useState('');
  const navigate = useNavigate();

  const handleNext = () => {
    const orderData = {
      customerName,
      customerEmail,
      quantity,
      packageType,
      customerNote,
    };

    
    localStorage.setItem('orderData', JSON.stringify(orderData));

    navigate(`/Or_Add/order-details`);
  };

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
          text-align: center;
          margin-bottom:2rem;
          margin-top:2rem;
        }

        .Or_addhead {
          text-align: center;
          
        }

        .or_addform {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top:50px;
        }

        .or_form-group {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
          width: 100%;
          max-width: 600px;
        }

        .or_addleable {
          flex: 1;
          margin-right: 1rem;
          text-align: right;
          font-weight: bold;
        }

        .or_form-group input, select, textarea {
          flex: 2;
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .or_addtextarea {
          height: 100px;
          resize: vertical;
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
        `}
      </style>
      <div className="Or_addcard">
        <h2 className="Or_addhead">Place Your Order</h2>
        <form className='or_addform' onSubmit={(e) => e.preventDefault()}>
          <div className="or_form-group">
            <label className='or_addleable' htmlFor="customerName">Customer Name:</label>
            <input
              type="text"
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </div>
          <div className="or_form-group">
            <label className='or_addleable' htmlFor="customerName">Your Email:</label>
            <input
              type="email"
              id="customerName"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              required
            />
          </div>
          <div className="or_form-group">
            <label className='or_addleable' htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              required
            />
          </div>
          <div className="or_form-group">
            <label className='or_addleable' htmlFor="packageType">Package Type:</label>
            <select
              id="packageType"
              value={packageType}
              onChange={(e) => setPackageType(e.target.value)}
              required
            >
              <option value="">Select a package</option>
              <option value="standard">Standard</option>
              <option value="premium">Premium</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          <div className="or_form-group">
            <label className='or_addleable' htmlFor="customerNote">Customer Note:</label>
            <textarea className='or_addtextarea'
              id="customerNote"
              value={customerNote}
              onChange={(e) => setCustomerNote(e.target.value)}
              required
            />
          </div>
          <button className="or_addbuttonx" type="submit" onClick={handleNext} >Next</button>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
