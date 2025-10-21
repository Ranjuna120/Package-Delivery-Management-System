import React, { useEffect, useState } from "react";
import axios from "axios";

function Or_Analysis() {
    let a =0;
    let p =0;
    let c =0;

    const[data,SetStatus]=useState([]);

    useEffect(() => {
        const fedata = async ()=>{
            try{
               const response= await axios.get('http://localhost:8070/api/orders/Allread');
               SetStatus(response.data);

            }catch(error){
                console.error("Error ",error);

            }
        };
        fedata();
    },[]);
data.forEach(order => {
    if(order.status == 'Approval'){
        a++;
    }
    else if (order.status == 'Cancel'){
        c++;
    }else if (order.status == 'Pending'){
        p++;
    }
    
});
    

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
                    flex-direction: column; 
                    align-items: center; 
                    justify-content: space-between; 
                    height: 150px; 
                }
                .Or_anaCard h3 {
                    color: #329f1f;
                    font-size: 20px;
                    text-align: center; 
                    margin: 0; 
                    
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
                    <h2 style={{ color: 'darkgreen' }}>{a}</h2>
                </div>
                <div className="Or_anaCard">
                    <h3>Pending Orders</h3>
                    <h2 style={{ color: 'blue' }}>{p}</h2>
                </div>
                <div className="Or_anaCard">
                    <h3>Cancel Orders</h3>
                    <h2 style={{ color: 'red' }}>{c}</h2>
                </div>
            </div>
        </div>
    );
}

export default Or_Analysis;