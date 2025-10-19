import React, { useState } from 'react';
import '../../style/customer/FeedbackForm.css';

function FeedbackForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState(''); // For displaying submission message
  const [error, setError] = useState(''); // For displaying error message

  // Email validation helper function
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validation logic
    if (!fullName.trim()) {
      setError('Full name is required.');
      return;
    }
    
    if (!email.trim() || !isValidEmail(email)) {
      setError('Please provide a valid email address.');
      return;
    }

    if (rating === 0) {
      setError('Please select a rating.');
      return;
    }

    if (!feedback.trim() || feedback.length < 10) {
      setError('Feedback must be at least 10 characters long.');
      return;
    }

    const newFeedback = { fullName, email, feedback, rating };
    
    try {
      const response = await fetch('http://localhost:8070/api/feedback/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFeedback),
      });

      if (response.ok) {
        setMessage('Thank you, your submission has been received.');
        setError(''); // Clear error message
        setFullName(''); // Clear form fields
        setEmail('');
        setFeedback('');
        setRating(0);
      } else {
        setError('Error submitting feedback. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error submitting feedback. Please check your connection.');
    }
  };

  const handleCancel = () => {
    setFullName('');
    setEmail('');
    setRating(0);
    setFeedback('');
    setMessage('');
    setError('');
  };

  return (
    <div className="feedback-form-container">
      <h1>Give Your Feedback</h1>

      {/* Display success message */}
      {message && <p className="message success-message">{message}</p>}
      
      {/* Display error message */}
      {error && <p className="message error-message">{error}</p>}
      
      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="input-group">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="rating">Rate our service:</label>
          <div className="star-rating">
            {[...Array(5)].map((star, index) => (
              <span
                key={index}
                className={`star ${index < rating ? 'filled' : ''}`}
                onClick={() => setRating(index + 1)}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="feedback">Feedback:</label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
            minLength="10"
            placeholder="Please provide at least 10 characters."
          />
        </div>

        <div className="button-group">
          <button type="submit" className="submit-btn">Submit</button>
          <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default FeedbackForm;
