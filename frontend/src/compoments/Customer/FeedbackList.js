import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import the autotable plugin
import '../../style/customer/FeedbackList.css';

function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState('');

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch('http://localhost:8070/api/feedback');
      const data = await response.json();
      setFeedbacks(data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // Function to accept feedback
  const handleAccept = async (id) => {
    try {
      const response = await fetch(`http://localhost:8070/api/feedback/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'accepted' }),
      });

      if (response.ok) {
        setMessage('Feedback accepted');
        fetchFeedbacks(); // Refresh list after update
      } else {
        setMessage('Error accepting feedback');
      }
    } catch (error) {
      console.error('Error accepting feedback:', error);
      setMessage('Error accepting feedback');
    }
  };

  // Function to reject feedback
  const handleReject = async (id) => {
    try {
      const response = await fetch(`http://localhost:8070/api/feedback/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('Feedback rejected and deleted');
        fetchFeedbacks(); // Refresh list after deletion
      } else {
        setMessage('Error rejecting feedback');
      }
    } catch (error) {
      console.error('Error rejecting feedback:', error);
      setMessage('Error rejecting feedback');
    }
  };

  // Function to request PDF generation
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.text('Feedback Report', 14, 20);
    
    // Define table columns and rows
    const tableColumn = ["Customer Name", "Email", "Feedback", "Rating", "Status"];
    const tableRows = feedbacks.map(feedback => [
      feedback.fullName,
      feedback.email,
      feedback.feedback,
      feedback.rating,
      feedback.status
    ]);

    // Create table
    doc.autoTable(tableColumn, tableRows, { startY: 30 });
    
    // Save the PDF
    doc.save('feedback_report.pdf');
  };

  return (
    <div className="app-container">
      <div className="main-content">
        <h2>Feedback List</h2>
        {message && <p className="message">{message}</p>} {/* Display message */}
        <div className="actions">
          <button className="generate-btn" onClick={generatePDF}>
            Generate PDF Report
          </button>
          <div className="feedback-header">
            <div className="search-bar">
              <input 
                type="text" 
                placeholder="Search here" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        <table className="feedback-table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Feedback</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Approve</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks
              .filter(feedback =>
                feedback.fullName.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map(feedback => (
                <tr key={feedback._id}>
                  <td>{feedback.fullName}</td>
                  <td>{feedback.email}</td>
                  <td>{feedback.feedback}</td>
                  <td>{feedback.rating}</td>
                  <td>{feedback.status}</td>
                  <td>
                    <button className="accept-btn" onClick={() => handleAccept(feedback._id)}>Accept</button>
                  </td>
                  <td>
                    <button className="reject-btn" onClick={() => handleReject(feedback._id)}>Reject</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FeedbackList;
