import React from "react";

function Or_Analysis() {
    return (
        <div>
            <style>{`
                .Or_anaCardrow {
                    display: flex;
                    flex-direction: row; 
                    gap: -10px; 
                    justify-content: center; 
                    flex-wrap: wrap; 
                    padding: 1rem;
                }
                .Or_anaCard {
                    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
                    transition: 0.3s;
                    width: 100%; 
                    max-width: 200px; 
                    margin: 0 auto; 
                    padding: 1rem; 
                    background-color: #fff; 
                    border-radius: 8px;
                    display: flex;
                    flex-direction: column; /* Changed from row to column */
                    align-items: center; /* Center the content horizontally */
                    justify-content: space-between; /* Space between h3 and h2 */
                    height: 150px; /* Ensure height is consistent for spacing */
                }
                .Or_anaCard h3 {
                    color: blue;
                    font-size: 20px;
                    text-align: center; /* Center align text */
                    margin: 0; /* Remove default margin */
                }
                .Or_anaCard h2 {
                    color: #333;
                    text-align: center;
                    margin: 0; 
                    
                }
            `}
            </style>
            <div className="Or_anaCardrow">
                <div className="Or_anaCard">
                    <h3 className="or_ana_h3">Approvals Orders</h3>
                    <h2>15</h2>
                </div>
                <div className="Or_anaCard">
                    <h3>Pending Orders</h3>
                    <h2>2</h2>
                </div>
                <div className="Or_anaCard">
                    <h3>Cancel Orders</h3>
                    <h2>4</h2>
                </div>
            </div>
        </div>
    );
}

export default Or_Analysis;
