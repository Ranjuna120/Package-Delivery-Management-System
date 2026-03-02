import React, { useState } from 'react';
import jsPDF from 'jspdf';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  // Handle clear search button
  const handleClearSearch = () => {
    setSearchTerm('');
    onSearch(''); 
  };

  // Function to generate a simple PDF report
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Report Title', 10, 10);
    doc.text(`Search Term: ${searchTerm}`, 10, 20);
    doc.text('Your report data goes here...', 10, 30);
    doc.save('report.pdf');
  };

  return (
    <div style={styles.searchBarContainer} className="payment-search-container">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search by Payment ID or Email"
        style={styles.input}
        className="payment-search-input"
      />
      {searchTerm && (
        <button onClick={handleClearSearch} style={styles.clearButton} className="payment-clear-btn">
          Clear
        </button>
      )}
      <button onClick={handleDownloadPDF} style={styles.downloadButton} className="payment-download-pdf-btn">
        Download PDF
      </button>
    </div>
  );
};

const styles = {
  searchBarContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 0 20px 0',
    gap: '12px',
    flexWrap: 'wrap',
  },
  input: {
    flex: 1,
    minWidth: '250px',
    padding: '14px 18px',
    fontSize: '15px',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    outline: 'none',
    transition: 'all 0.3s ease',
    fontFamily: "'Roboto', sans-serif",
  },
  clearButton: {
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    padding: '14px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  downloadButton: {
    padding: '14px 24px',
    backgroundColor: '#2C3E50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
};


export default SearchBar;