import React from 'react';
import DataTable from 'react-data-table-component';


function OrAdminTable() {
    const columns = [
        {
            name: 'Order ID',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Date',
            selector: row => row.date,
        },
        {
            name: 'Email',
            selector: row => row.email,
        },
        {
            name: 'Status',
            selector: row => row.age,
        },
        {
            name: 'Action',
            selector: row => row.button,
        },
    ];

    const data = [
        {
            id: 1,
            name: 'Yousaf',
            email: 'abd@gmail.com',
            age: '22',
            button: <button>more</button>
        },
        {
            id: 2,
            name: 'Yousaf',
            email: 'abd@gmail.com',
            age: '24',
            button: <button>more</button>
        },
        {
            id: 3,
            name: 'Yousaf',
            email: 'abd@gmail.com',
            age: '30',
            button: <button className='or_button'>more</button>
        },
        {
            id: 4,
            name: 'Yoffusaf',
            email: 'abd@gmail.com',
            age: '35',
            button: <button className='or_button'>more</button>
        },
    ];

    return (
        <div className='container mt-5'>
            <style>
                {`
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
            <button href="/add">add</button>
            <div className='or_card'>
                <div className='or_search'>
                    <div className='search-wrapper'>
                        <i className="fa fa-search"></i>
                        <input type='text' placeholder='Search...' />
                    </div>
                    <div className='or_button'>
                        <button>Print <i className="bi bi-printer"></i></button>
                    </div>
                </div>
                <DataTable
                    columns={columns}
                    data={data}
                />


            </div>
        </div>
    );
}

export default OrAdminTable;
