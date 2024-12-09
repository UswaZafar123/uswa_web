import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BuyForm = () => {
  const { carId } = useParams();
  const [car, setCar] = useState({});
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarDetails = async () => {
      const response = await axios.get(`http://localhost:3001/api/cars/${carId}`);
      setCar(response.data);
    };
    fetchCarDetails();
  }, [carId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/api/transactions/buy", {
        carId,
        username,
        email,
        contact,
        amount: car.price, // Use car price
      });
      alert("Purchase successful! Redirecting to payment...");
      setTimeout(() => navigate("/payment"), 2000); // Redirect to payment page
    } catch (error) {
      console.error("Error processing purchase:", error);
      alert("Failed to process purchase.");
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('https://wallpapers.com/images/hd/4k-bmw-car-in-dark-c0ot64ri2fecu1pr.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h3
          style={{
            color: "#007bff",
            fontSize: "2rem",
            textAlign: "center",
            marginBottom: "20px",
            fontWeight: "bold",
          }}
        >
          Buy Car
        </h3>
        {successMessage && <p style={{ color: "green", textAlign: "center" }}>{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <p style={{ fontSize: "1.1rem", marginBottom: "10px" ,color: "black",textAlign:"center"}}>
            <strong>Car:</strong> {car.make} {car.model}
          </p>
          <p style={{ fontSize: "1.1rem", marginBottom: "20px" ,color: "black",textAlign:"center"}}>
            <strong>Price:</strong> ${car.price}
          </p>
          <label style={{ display: "block",color: "black", marginBottom: "5px" }}>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              color: "black",
            }}
          />
          <label style={{ display: "block", marginBottom: "5px" ,color: "black"}}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              color: "black",
            }}
          />
          <label style={{ display: "block", marginBottom: "5px",color: "black" }}>Contact Number:</label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "20px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              color: "black",
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              padding: "10px 15px",
              width: "100%",
              borderRadius: "5px",
              fontWeight: "bold",
              fontSize: "1.1rem",
              cursor: "pointer",
            }}
          >
            Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default BuyForm;
