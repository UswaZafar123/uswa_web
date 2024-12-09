import React, { useState } from 'react';
import axios from 'axios';
//import "C:\Users\HP\Desktop\Web\Web\frontend\src\pages\customerpages\feedback.css";
const FeedbackForm = ({ carId, userId }) => {
  const [feedbackText, setFeedbackText] = useState('');
  const [rating, setRating] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!feedbackText || !rating) {
      setErrorMessage('Please fill all fields.');
      return;
    }

    try {
      await axios.post('http://localhost:3001/api/feedback/add', {
        userId,
        carId,
        feedbackText,
        rating,
      });

      setSuccessMessage('Feedback submitted successfully!');
      setFeedbackText('');
      setRating('');
      setErrorMessage('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setErrorMessage('Failed to submit feedback.');
    }
  };

  return (
    <div className="feedback-form">
      <h3>Write Feedback</h3>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write your feedback"
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          required
        ></textarea>
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        >
          <option value="" disabled>
            Select Rating
          </option>
          {[1, 2, 3, 4, 5].map((rate) => (
            <option key={rate} value={rate}>
              {rate}
            </option>
          ))}
        </select>
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
