import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useNavigate } from 'react-router-dom';

function OrAdminTable() {
    const [data, setData] = useState([]); 
    const [filterOrder, setFilterOrder] = useState([]); 
    const navigate = useNavigate();

  
    const handleNavigate = (action, id) => {
        navigate(`/OrderDashBoardPage${action}/${id}`);
    };


    const handleSearch = (e) => {
        const searchValue = e.target.value.toLowerCase();
        if (searchValue === '') {
            setFilterOrder(data); 
        } else {
            const filtered = data.filter((order) =>
                order.Cus_email.toLowerCase().includes(searchValue),
            
            );
            setFilterOrder(filtered);
        }
    };


    const handleGeneratePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16); 
        doc.text("Order Details", 14, 20);
        
        const tableclm = [
            "Order ID",
            "Customer Name",
            "Quantity",
            "Package Type",
            "Order Status",
            "Tracking Status"
        ];
    
        const tablerow = data.map((order) => [
            order._id,
            order.Cus_name,
            order.qty,
            order.package_type,
            order.status,
            order.Or_tracking
        ]);
    
    
        doc.autoTable({
            head: [tableclm],
            body: tablerow,
            startY: 30 
        });
    
        doc.save("Order_Details.pdf");
    };
    
    const columns = [
        {
            name: 'Order ID',
            selector: row => row._id,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.Cus_name,
        },
        {
            name: 'Email',
            selector: row => row.Cus_email,
        },
        {
            name: 'Status',
            selector: row => row.status,
            cell: row => (
                <span
                    style={{
                        color: row.status === 'Approval' ? 'green' : row.status === 'Cancel' ? 'red' : row.status === 'Pending' ? 'blue' : 'black',
                        fontWeight: 'bold',
                    }}
                >
                    {row.status}
                </span>
            ),
        },
        {
            name: 'Tracking',
            selector: row => row.Or_tracking,
            cell: row => (
                <span
                    style={{
                        color: row.Or_tracking === 'Approval' ? 'green' : row.Or_tracking === 'Pending' ? 'red' : row.Or_tracking === 'Finish' ? 'blue' : 'black',
                        fontWeight: 'bold',
                    }}
                >
                    {row.Or_tracking}
                </span>
            ),
        },
        {
            name: 'Action',
            cell: row => (
                <>
                    <button onClick={() => handleNavigate('/orderTrack', row._id)}>
                        More
                    </button>
                </>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    // Fetch data from backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8070/api/orders/Allread'); 
                setData(response.data); 
                setFilterOrder(response.data); 
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };
        fetchData(); 
    }, []);

    return (
        <div className='container mt-5'>
            <style>
                {`
                body{background-color:#e6eee4;}

                    .or_search {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        margin-bottom: 1rem; 
                        justify-content: space-between;
                        position: relative;
                    }
                    .or_card {
                        box-shadow: 0 4px 8px 0 rgba(0.8,0,0,0.2);
                        transition: 0.4s;
                        width: 100%; 
                        max-width: 1200px; 
                        margin: 0 auto; 
                        padding: 1rem; 
                        background-color: #fff; 
                        border-radius: 8px;
                        
                    }
                    .or_search .search-wrapper {
                        position: relative;
                        flex: 1;
                    }
                    .or_search input {
                        width: 20%;
                        padding: 0.5rem 0.5rem 0.5rem 2.5rem; /* Adjust padding to make space for the icon */
                        border: 1px solid #ccc;
                        border-radius: 10px;
                        height: 35px;
                        font-size: 16px;
                    }
                    .or_search .fa-search {
                        position: absolute;
                        left: -2px;
                        top: 68%;
                        transform: translateY(-50%);
                        color: #9ca3af;
                        font-size: 15px;
                    }
                    .or_button {
                        display: flex;
                        justify-content: flex-end;
                    }
                    .or_button button {
                        padding: 0.5rem 1rem;
                        border: none;
                        border-radius: 4px;
                        background-color: #007bff; 
                        color: #fff; 
                        cursor: pointer;
                    }
                    .or_button button:hover {
                        background-color: #0056b3; 
                    }
                    @media (max-width: 768px) {
                        .or_card {
                            width: 95%; 
                        }
                    }
                `}
            </style>
            <div className='or_card'>
                <div className='or_search'>
                    <div className='search-wrapper'>
                        <i className="fa fa-search"></i>
                        <input type='text' placeholder='Search...' onChange={handleSearch} />
                    </div>
                    <div className='or_button'>
                        <button onClick={handleGeneratePDF}>Print <i className="bi bi-printer"></i></button>
                    </div>
                </div>
                <DataTable
                    columns={columns}
                    data={filterOrder} 
                    // pagination
                />
            </div>
        </div>
    );
}

export default OrAdminTable;