import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // For automatic table generation
import '../../style/customer/Cusdetails.css';

const Cusdetails = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:8070/api/customers/all');
        setCustomers(response.data);
      } catch (err) {
        setError('Error fetching customer data');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleDelete = async (customerId) => {
    try {
      await axios.delete(`http://localhost:8070/api/customers/${customerId}`);
      setCustomers(customers.filter(customer => customer._id !== customerId));
      alert('Customer deleted successfully');
    } catch (err) {
      console.error('Delete failed', err);
      alert('Failed to delete customer');
    }
  };

  const handleUpdate = (customerId) => {
    window.location.href = `/update-customer/${customerId}`;
  };

  // Function to handle PDF generation
  const generatePDF = () => {
    const doc = new jsPDF();
    const tableColumn = [ "Customer Name" ,"Username","Email","Address", "Age"];
    const tableRows = [];

    customers.forEach(customer => {
      const customerData = [
        customer.name,
        customer.username,
        customer.email,
        customer.address,
        customer.age,
      ];
      tableRows.push(customerData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Customer Report", 14, 15);
    doc.save("customer_report.pdf");
  };

  // Search functionality with safe access using optional chaining
  const filteredCustomers = customers.filter(customer =>
    customer.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="customer-details-container">
      <div className="cusdetails-card">
        <h2 className="cusdetails-title">Customer Details</h2>
        <div className="search-generate">
          <button className="generate-report" onClick={generatePDF}>Generate Report</button>
          <input
            type="text"
            className="search-bar"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="cusdetails-table-wrapper">
          <table className="customer-table">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Address</th>
                <th>Age</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', color: '#888', fontStyle: 'italic' }}>
                    No customers found.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map(customer => (
                  <tr key={customer._id}>
                    <td>{customer.name || 'N/A'}</td>
                    <td>{customer.username}</td>
                    <td>{customer.email}</td>
                    <td>{customer.address}</td>
                    <td>{customer.age}</td>
                    <td>
                      <div className="cusdetails-action-group">
                        <button className="update-button" onClick={() => handleUpdate(customer._id)}>Update</button>
                        <button className="delete-button" onClick={() => handleDelete(customer._id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Cusdetails;
