import React, { useState } from "react";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

// Load Stripe public key
const stripePromise = loadStripe("pk_test_51QTOHdBicms9V609084pcTYJeETpmxCPY6b908g4o7NN7253zOJbkI2N9mOdNmYxzhnQWMhES4lYJ9iAJhUHHAMv00cXK046Lh");

const PaymentForm = ({ carId, amount, username, email, rentDuration }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setError("Stripe not loaded. Please refresh the page.");
      return;
    }

    const card = elements.getElement(CardElement);

    try {
      // Simulate successful payment
      setSuccess(true);

      // Send the transaction details to the backend
      await axios.post("http://localhost:3001/api/rent", {
        carId,
        username,
        email,
        rentDuration,
        amount,
      });
    } catch (err) {
      console.error("Error during payment or backend processing:", err);
      setError("Payment completed but failed to record transaction. Contact support.");
    }
  };

  if (success) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
          color: "#333",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h3>Payment Successful!</h3>
        <p>Thank you for your purchase.</p>
      </div>
    );
  }

  return (
    <div className="payment-form">
      <h3
        style={{
          color: "#007bff",
          textAlign: "center",
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        Payment
      </h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label
          style={{
            fontWeight: "bold",
            marginBottom: "10px",
            display: "block",
            color: "#555",
          }}
        >
          Card Details
        </label>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#333",
                "::placeholder": { color: "#888" },
              },
              invalid: { color: "#e63946" },
            },
          }}
        />
        <button
          type="submit"
          style={{
            marginTop: "20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            padding: "12px",
            width: "100%",
            borderRadius: "5px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          disabled={!stripe || !elements}
        >
          Pay ${amount}
        </button>
      </form>
    </div>
  );
};

const PaymentFormWrapper = (props) => (
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
    <Elements stripe={stripePromise}>
      <div
        style={{
          maxWidth: "800px", // Increased width for better visibility
          backgroundColor: "rgba(255, 255, 255, 0.95)", // Adjusted opacity
          padding: "30px", // Added padding for a cleaner look
          borderRadius: "15px", // Rounded corners for a modern design
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)", // Slightly stronger shadow
          fontFamily: "Arial, sans-serif",
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
          Confirm Your Payment
        </h3>
        <PaymentForm {...props} />
      </div>
    </Elements>
  </div>
);

export default PaymentFormWrapper;
