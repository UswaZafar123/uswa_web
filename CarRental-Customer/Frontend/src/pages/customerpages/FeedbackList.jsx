import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FeedbackList = ({ carId }) => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/feedback/${carId}`);
        setFeedbacks(response.data);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchFeedbacks();
  }, [carId]);

  return (
    <div className="feedback-list">
      <h3>Customer Feedback</h3>
      {feedbacks.length === 0 ? (
        <p>No feedback available.</p>
      ) : (
        feedbacks.map((feedback) => (
          <div key={feedback._id} className="feedback-item">
            <p>
              <strong>{feedback.userId?.name}:</strong> {feedback.feedbackText}
            </p>
            <p>Rating: {feedback.rating}/5</p>
          </div>
        ))
      )}
    </div>
  );
};

export default FeedbackList;
