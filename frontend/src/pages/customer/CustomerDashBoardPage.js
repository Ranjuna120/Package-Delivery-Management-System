import React from 'react';
import { useNavigate } from 'react-router-dom';

function CustomerDashBoard() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(`/AdminChoose/DMChoose/CustomerDashBoardPage${path}`);
  };

  return (
    <div>
      <div>
        <style>
          {`
          .tilesAdmin {
              display: inline-block;
              width: 21%;
              height: 500px;
              margin: 50px 20px 50px 20px;
              padding: 20px;
              color: black;
              text-align: center;
              text-decoration: none;
              border-radius: 15px;
              border: 3px solid #031f42;
              font-family: Arial, sans-serif;
              font-weight: bold;
              font-size: 40px;
          }
          .DMCTileLayout {  
              text-align: center;
          }
          `}
        </style>
      </div>
      
      <div className='DMCTileLayout'>
        
        <button className="tilesAdmin" onClick={() => handleNavigate('/Cusdetails')}>Customer Details</button>
        <button className="tilesAdmin" onClick={() => handleNavigate('/FeedbackList')}>Feedback</button>
      </div>
    </div>
  );
}

export default CustomerDashBoard;
