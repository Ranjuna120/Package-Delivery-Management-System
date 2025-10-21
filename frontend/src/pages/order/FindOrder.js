import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from 'mdb-react-ui-kit';

function App() {
  const [orderId, setOrderId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleNavigate = async () => {
    if (orderId) {
      try {
        const response = await fetch(`/api/orders/${orderId}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          setErrorMessage(errorData.error); // Show error message if order not found
          return;
        }

        const orderData = await response.json();
        navigate(`/OrderDashBoardPage/orderTracks/${orderId}`, { state: { orderData } });
      } catch (error) {
        console.error('Error fetching order:', error);
        setErrorMessage('Invalid Order Id.');
      }
    } else {
      alert('Please enter a valid Order ID');
    }
  };

  return (
    <MDBContainer fluid>
      <style>
        {`
          body {
            background-color: #f8f9fa; /* Light gray background for contrast */
            font-family: 'Arial', sans-serif; /* Font style for the page */
          }

          h2 {
            color: #343a40; /* Dark gray color for the header */
          }

          p {
            color: #6c757d; /* Gray color for the subtitle text */
          }

          .mdb-card {
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow effect for card */
          }

          .mdb-btn {
            background-color: #3b5998; /* Facebook-like color */
            color: white; /* White text for button */
            transition: background-color 0.3s; /* Smooth transition for hover effect */
          }

          .mdb-btn:hover {
            background-color: #2d4373; /* Darker color on hover */
          }

          .mdb-input {
            border-radius: 0.5rem; /* Rounded corners for input fields */
            border: 1px solid #ced4da; /* Light border for input fields */
          }

          .mdb-input:focus {
            border-color: #3b5998; /* Change border color on focus */
            box-shadow: 0 0 0.2rem rgba(59, 89, 152, 0.25); /* Light blue shadow on focus */
          }

          hr {
            border-top: 1px solid #ced4da; /* Light gray horizontal line */
          }

          @media (max-width: 768px) {
            .mdb-card {
              max-width: 90%; /* Responsive width for smaller screens */
            }
          }
        `}
      </style>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>
              <h2 className="fw-bold mb-2 text-center">Find Your Order</h2>
              <p className="text-white-50 mb-3">Please enter your Order ID!</p>

              {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}

              <MDBInput
                wrapperClass='mb-4 w-100'
                id='formControlLg'
                type='text'
                size="lg"
                placeholder='Order Id'
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
              />

              <hr className="my-4" />

              <MDBBtn className="mb-4 w-100" size="lg" style={{ backgroundColor: '#3b5998' }} onClick={handleNavigate}>
                Find My Order
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default App;