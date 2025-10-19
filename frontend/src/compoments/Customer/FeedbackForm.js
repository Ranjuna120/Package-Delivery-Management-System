import React, { useState } from 'react';
import '../../style/customer/FeedbackForm.css';

function FeedbackForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState(''); // For displaying submission message
  const [error, setError] = useState(''); // For displaying error message
  const [submitting, setSubmitting] = useState(false);

  // Email validation helper function
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    
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
      setSubmitting(true);
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
    } finally {
      setSubmitting(false);
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
    <section
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: 'calc(100vh - 120px)',
        background: 'linear-gradient(135deg, #6dd5ed 0%, #2193b0 100%)',
        padding: '20px'
      }}
    >
      <div className="card shadow-lg p-4" style={{ maxWidth: 520, width: '100%', borderRadius: 16 }}>
        <h3 className="text-center mb-3" style={{ color: '#2193b0', fontWeight: 700 }}>We value your feedback</h3>

        {message && (
          <div className="alert alert-success py-2" role="alert">
            {message}
          </div>
        )}
        {error && (
          <div className="alert alert-danger py-2" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label">Full Name</label>
            <input
              type="text"
              id="fullName"
              className="form-control form-control-lg"
              placeholder="Your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              style={{ borderRadius: 10 }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              className="form-control form-control-lg"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ borderRadius: 10 }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Rate our service</label>
            <div className="d-flex gap-2 align-items-center">
              {[1, 2, 3, 4, 5].map((i) => (
                <button
                  key={i}
                  type="button"
                  className="btn"
                  onClick={() => setRating(i)}
                  aria-label={`Rate ${i} star${i > 1 ? 's' : ''}`}
                  style={{
                    fontSize: 24,
                    lineHeight: 1,
                    color: i <= rating ? '#f5c518' : '#c7c7c7',
                    background: 'transparent'
                  }}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="feedback" className="form-label">Feedback</label>
            <textarea
              id="feedback"
              className="form-control"
              rows={4}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
              minLength={10}
              placeholder="Tell us what went well or what we could improve..."
              style={{ borderRadius: 10 }}
            />
          </div>

          <div className="d-flex gap-2">
            <button
              type="submit"
              className="btn flex-fill"
              disabled={submitting}
              style={{
                background: 'linear-gradient(90deg, #2193b0 0%, #6dd5ed 100%)',
                color: '#fff',
                border: 'none',
                fontWeight: 600,
                borderRadius: 10,
                padding: '10px 0'
              }}
            >
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary flex-fill"
              onClick={handleCancel}
              style={{ borderRadius: 10 }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default FeedbackForm;
