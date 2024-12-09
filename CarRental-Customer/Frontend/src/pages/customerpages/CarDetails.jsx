import React from 'react';
import FeedbackForm from './FeedbackForm';
import FeedbackList from './FeedbackList';

const CarDetails = ({ car, userId }) => {
  return (
    <div className="car-details">
      <h2>
        {car.make} {car.model}
      </h2>
      <p>Price per day: ${car.pricePerDay}</p>
      <p>Mileage: {car.mileage} miles</p>
      <p>Condition: {car.condition}</p>

      {/* Feedback Section */}
      <FeedbackForm carId={car._id} userId={userId} />
      <FeedbackList carId={car._id} />
    </div>
  );
};

export default CarDetails;
