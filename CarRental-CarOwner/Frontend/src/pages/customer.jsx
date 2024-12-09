import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/admin/editcar.css"; // Reusing the same dark theme CSS
const token = localStorage.getItem("token");
const CustomerPanel = () => {
  const [cars, setCars] = useState([]);

  // Fetch all cars from the backend
  useEffect(() => {
    const fetchCars = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/cars/get-all-cars", {
              headers: {
                Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
                "Content-Type": "multipart/form-data",
              },
            });
            setCars(response.data);
          } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, []);

  return (
    <div className="container">
      {/* Landing Page Header */}
      <div className="header">
        <h1>Welcome to the Car Rental Service</h1>
        <p>Explore and book cars easily!</p>
      </div>

      {/* Car List Section */}
      <div className="car-list">
        <h2>Available Cars</h2>
        {cars.length === 0 ? (
          <p>Loading cars...</p>
        ) : (
          cars.map((car) => (
            <div key={car._id} className="car-item">
              <img
                src={`https://your-server.com/uploads/${car.picture}`}
                alt="Car"
                width="100"
              />
              <div>
                <strong>{car.make} {car.model} ({car.year})</strong>
                <p>Price per day: ${car.pricePerDay}</p>
                <p>Mileage: {car.mileage} miles</p>
                <p>Condition: {car.condition}</p>
                <p>{car.availability ? "Available" : "Unavailable"}</p>
                <button disabled={!car.availability}>
                  {car.availability ? "Book Now" : "Unavailable"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CustomerPanel;
