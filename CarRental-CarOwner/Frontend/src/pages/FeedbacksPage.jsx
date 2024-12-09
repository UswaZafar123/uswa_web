import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/carownercomponents/Header"; // Header component
import Footer from "../components/carownercomponents/Footer"; // Footer component
import "../styles/carowner/feedbacksPage.css"; // Custom styles for feedbacks page

const FeedbacksPage = () => {
  const [feedbacks, setFeedbacks] = useState([]); // State to store feedbacks
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [cars, setCars] = useState([]); // State to store car details

  // Fetch feedbacks and car details
  useEffect(() => {
    const fetchFeedbacksAndCars = async () => {
      try {
        const token = localStorage.getItem("token"); // Get auth token
        console.log("Token:", token); // Debugging token

        // Fetch feedbacks
        const feedbacksResponse = await axios.get("http://localhost:3001/api/feedback/feedbackss", {

          headers: {
            Authorization: `Bearer ${token}`, // Pass token for authentication
          },
        });

        console.log("Feedbacks Response:", feedbacksResponse.data); 
        
        const feedbacks = feedbacksResponse.data.map((feedback) => ({
            carId: feedback.carId,
            feedbackText: feedback.feedbackText,
          }));
          setFeedbacks(feedbacks);

        // Fetch cars
        const carsResponse = await axios.get("http://localhost:3001/api/cars/get-all-cars", {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token for authentication
          },
        });
        console.log("Cars Response:", carsResponse.data); // Debugging cars response
        setCars(carsResponse.data);

        setLoading(false); // Stop loading
      } catch (error) {
        console.error("Error fetching feedbacks or cars:", error.response || error.message);
        setLoading(false); // Stop loading
      }
    };

    fetchFeedbacksAndCars();
  }, []);

  return (
    <div className="feedbacks-page">
      <Header /> {/* Navigation Header */}
      <div className="content">
        <h1 className="feedback-heading" style={{ paddingTop: "70px" }}>Car Feedbacks</h1> {/* Adjust padding */}
        {loading ? (
          <p>Loading feedbacks...</p>
        ) : feedbacks.length === 0 ? (
          <p>No feedbacks available</p>
        ) : (
          cars.map((car) => (
            <div key={car._id} className="car-feedback-card">
              <h2>
                {car.make} {car.model} ({car.year})
              </h2>
              <p>Condition: {car.condition}</p>
              <p>Status: {car.status}</p>
              <p>Mileage: {car.mileage} km</p>
              <h3>Feedbacks:</h3>
              <ul>
  {feedbacks.map((feedback, index) => (
    <li key={index}>
      <p><strong>ID:</strong> {feedback.carId}</p>
      <p><strong>Feedback:</strong> {feedback.feedbackText}</p>
    </li>
  ))}
</ul>

            </div>
          ))
        )}
      </div>
      <Footer /> {/* Footer */}
    </div>
  );
};

export default FeedbacksPage;
