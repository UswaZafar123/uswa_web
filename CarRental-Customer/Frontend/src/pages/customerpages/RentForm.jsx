import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const RentForm = () => {
  const { carId } = useParams();
  const [car, setCar] = useState({});
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [rentDuration, setRentDuration] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarDetails = async () => {
      const response = await axios.get(`http://localhost:3001/api/cars/${carId}`);
      setCar(response.data);
    };
    fetchCarDetails();
  }, [carId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const calculatedAmount = car.price * rentDuration;
    setTotalAmount(calculatedAmount);

    // Navigate to PaymentForm2 with all necessary details
    navigate(`/payment-form2`, {
      state: {
        carId,
        username,
        email,
        contact,
        rentDuration,
        totalAmount: calculatedAmount,
      },
    });
  };

  return (
    <div
      style={{
        backgroundImage: "url('https://wallpapers.com/images/hd/4k-bmw-car-in-dark-c0ot64ri2fecu1pr.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "auto",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h3>Rent a Car</h3>
        <form onSubmit={handleSubmit}>
          <p>Car: {car.make} {car.model}</p>
          <p>Price per day: ${car.price}</p>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Contact Number:</label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
          <label>Rent Duration (days):</label>
          <input
            type="number"
            value={rentDuration}
            onChange={(e) => setRentDuration(e.target.value)}
            required
          />
          <button
            type="submit"
            style={{
              marginTop: "20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              padding: "10px",
              width: "100%",
              borderRadius: "5px",
              fontWeight: "bold",
            }}
          >
            Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default RentForm;
