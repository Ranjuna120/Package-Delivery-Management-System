import React from 'react';
import { useNavigate } from 'react-router-dom';
import Or_AnalysisCard from '../../compoments/Order/OrAnalysisCard'
import Or_AdminTable from "../../compoments/Order/OrAdminTable"; 

function Or_Dashboard() {
    const navigate = useNavigate();
    return (
        <div>
            <h1 style={{ fontSize: '30px',fontWeight: 'bold', marginLeft:'25px' }}>Order Dashboard</h1>
           <Or_AnalysisCard/>
            <Or_AdminTable />
            <button onClick={() => navigate('/Or_Add')}>Add</button>
        </div>
    );
}

export default Or_Dashboard;
