import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import UpdateExpenseForm from './ExpenseUpdateform';
import Modal from './Modal';


const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentExpense, setCurrentExpense] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchExpenses = async () => {
    try {
      const res = await axios.get('http://localhost:8070/expenses/all');
      setExpenses(res.data);
      calculateTotal(res.data);
    } catch (error) {
      console.error('Error fetching expenses', error);
    }
  };
  useEffect(() => {
    fetchExpenses();
  }, []);
  const calculateTotal = (expenses) => {
    const totalPrice = expenses.reduce((sum, expense) => sum + Number(expense.price), 0);
    setTotal(totalPrice);
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await axios.put(`http://localhost:8070/expenses/update/${id}`, updatedData);
      alert("Expense updated successfully");
      fetchExpenses();
    } catch (error) {
      console.error('Error updating expense', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/expenses/delete/${id}`);
      alert("Expense deleted successfully");
      fetchExpenses();
    } catch (error) {
      console.error('Error deleting expense', error);
    }
  };

  const openModal = (expense) => {
    setCurrentExpense(expense);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentExpense(null);
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Set title
    doc.setFontSize(18);
    doc.text('Expenses List', 14, 22);

    // Define table columns
    const columns = ['Item Name', 'Price (RS)'];

    // Map filtered expense data to rows for the table
    const filteredExpenses = expenses.filter(expense => 
      expense.itemName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const rows = filteredExpenses.map((expense) => [
      expense.itemName,
      expense.price,
    ]);

    // Add table to PDF
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 30, // start after the title
      theme: 'grid',
      headStyles: { fillColor: [0, 0, 0] }, // black header background
      styles: { cellPadding: 3, fontSize: 12, halign: 'center' },
    });

    // Add total balance for filtered expenses
    const filteredTotal = filteredExpenses.reduce((sum, expense) => sum + Number(expense.price), 0);
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.text(`Total Balance RS: ${filteredTotal} `, 14, finalY);

    // Save the PDF
    doc.save('filtered-expenses-list.pdf');
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  localStorage.setItem('expenses', JSON.stringify(total));

  return (
    <div style={styles.tableContainer} className="expense-table-container">
      <div style={styles.header} className="expense-header">
        <h2 style={styles.heading}>Expenses List</h2>
        <input
          type="text"
          placeholder="Search by Item Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
          className="expense-search-input"
        />
        <button onClick={generatePDF} style={styles.downloadButton} className="expense-download-btn">
          Download PDF
        </button>
      </div>

      <table style={styles.table} className="expense-table">
        <thead>
          <tr>
            <th style={styles.th}>Item Name</th>
            <th style={styles.th}>Price (RS)</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.filter(expense => 
            expense.itemName.toLowerCase().includes(searchQuery.toLowerCase())
          ).map((expense) => (
            <tr key={expense._id}>
              <td style={styles.td}>{expense.itemName}</td>
              <td style={styles.td}>{expense.price}</td>
              <td style={styles.td}>
                <button onClick={() => openModal(expense)} style={styles.updateButton} className="expense-update-btn">
                  Update
                </button>
                <button onClick={() => handleDelete(expense._id)} style={styles.deleteButton} className="expense-delete-btn">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2" style={styles.totalLabelCell}>
              <strong>Total Balance (RS):</strong>
            </td>
            <td style={styles.totalPriceCell}>
              <strong>{expenses.filter(expense => 
                expense.itemName.toLowerCase().includes(searchQuery.toLowerCase())
              ).reduce((sum, expense) => sum + Number(expense.price), 0)}</strong>
            </td>
          </tr>
        </tfoot>
      </table>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          {currentExpense && (
            <UpdateExpenseForm
              expense={currentExpense}
              onUpdate={handleUpdate}
              onClose={closeModal}
            />
          )}
        </Modal>
      )}
    </div>
  );
};

const styles = {
  tableContainer: {
    width: '100%',
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e9ecef',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    flexWrap: 'wrap',
    gap: '12px',
  },
  heading: {
    color: '#2C3E50',
    fontWeight: '700',
    fontSize: '24px',
    margin: 0,
  },
  searchInput: {
    padding: '12px 16px',
    borderRadius: '8px',
    border: '2px solid #e0e0e0',
    outline: 'none',
    width: '250px',
    fontSize: '15px',
    transition: 'all 0.3s ease',
    fontFamily: "'Roboto', sans-serif",
  },
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: 0,
    overflow: 'hidden',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
  },
  th: {
    padding: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: '16px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  td: {
    padding: '16px',
    borderBottom: '1px solid #e9ecef',
    textAlign: 'center',
    fontSize: '15px',
    color: '#495057',
  },
  totalLabelCell: {
    padding: '16px',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: '16px',
    backgroundColor: '#f8f9fa',
    color: '#2C3E50',
  },
  totalPriceCell: {
    padding: '16px',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: '16px',
    backgroundColor: '#f8f9fa',
    color: '#4CAF50',
  },
  updateButton: {
    backgroundColor: '#2196F3',
    color: 'white',
    padding: '10px 18px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginRight: '8px',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    padding: '10px 18px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  downloadButton: {
    backgroundColor: '#2C3E50',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
};

export default ExpenseList;