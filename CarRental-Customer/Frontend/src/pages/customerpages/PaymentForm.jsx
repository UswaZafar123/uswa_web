import React, { useState } from "react";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

// Load Stripe public key
const stripePromise = loadStripe("pk_test_51QTOHdBicms9V609084pcTYJeETpmxCPY6b908g4o7NN7253zOJbkI2N9mOdNmYxzhnQWMhES4lYJ9iAJhUHHAMv00cXK046Lh");

const PaymentForm = ({ carId, amount, username }) => {
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
      // Mock successful payment for now
      setSuccess(true);

      // Send the transaction details to the backend
      await axios.post("http://localhost:3001/api/transactions/buy", {
        carId,
        username,
        type: "Buy",
        amount,
      });
    } catch (err) {
      console.error("Error during payment or backend processing:", err);
      setError("Payment completed but failed to record transaction. Contact support.");
    }
  };

  if (success) {
    return (
      <div className="payment-success">
        <p style={{  textAlign: "center",color: "black" }}>Payment Successful!</p>
        <p style={{color: "black"}}>Thank you for your purchase.</p>
      </div>
    );
  }

  return (
    <div className="payment-form">
      <h3> Payment</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label style={{ fontWeight: "bold", marginBottom: "10px", display: "block" }}>Card Details</label>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": { color: "#black" },
              },
              invalid: { color: "#9e2146" },
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
            padding: "10px",
            width: "100%",
            borderRadius: "5px",
            fontWeight: "bold",
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
            maxWidth: "1000px", // Increased the width of the container
            backgroundColor: "rgba(255, 255, 255, 0.95)", // Slightly more opaque for better readability
            padding: "30px", // Adjusted padding for better spacing
            borderRadius: "15px", // Larger border radius for a modern look
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)", // Slightly darker shadow
          }}
        >
          <h3
            style={{
              color: "#007bff", // Changed heading color to match the button
              fontSize: "2rem", // Larger font size for visibility
              textAlign: "center", // Center-aligned for better focus
              marginBottom: "20px", // Added spacing below the heading
              fontWeight: "bold", // Bold text for emphasis
            }}
          >
            Complete Your Payment
          </h3>
          <PaymentForm {...props} />
        </div>
      </Elements>
    </div>
  );

export default PaymentFormWrapper;
