import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ReviewForm = () => {
  const { carId } = useParams();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    contact: "",
    feedbackText: "",
    experience: "",
    rating: 0,
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Only send `feedbackText`, `experience`, `rating`, and `carId` to the backend
      await axios.post("http://localhost:3001/api/feedback", {
        carId,
        feedbackText: formData.feedbackText,
        experience: formData.experience,
        rating: formData.rating,
      });
      alert("Review submitted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error submitting review:", error.response?.data || error);
      alert("Failed to submit review. Please check the fields and try again.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div
      style={{
        backgroundImage: 'url("https://wallpapers.com/images/hd/4k-bmw-car-in-dark-c0ot64ri2fecu1pr.jpg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#000000e",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          width: "50%",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" ,color: "#00aaff"}}>
          Feedback Form
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div style={{ marginBottom: "15px" }}>
            <input
              type="text"
              name="username"
              placeholder="Your Name "
              value={formData.username}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
            />
          </div>
          {/* Email */}
          <div style={{ marginBottom: "15px" }}>
            <input
              type="email"
              name="email"
              placeholder="Your Email "
              value={formData.email}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
            />
          </div>
          {/* Contact */}
          <div style={{ marginBottom: "15px" }}>
            <input
              type="text"
              name="contact"
              placeholder="Your Contact Number "
              value={formData.contact}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
            />
          </div>
          {/* Feedback */}
          <div style={{ marginBottom: "15px" }}>
            <textarea
              name="feedbackText"
              placeholder="Your Feedback"
              value={formData.feedbackText}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                resize: "none",
              }}
              rows="5"
            ></textarea>
          </div>
          {/* Experience */}
          <div style={{ marginBottom: "15px" }}>
            <textarea
              name="experience"
              placeholder="Describe Your Experience with Us"
              value={formData.experience}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                resize: "none",
              }}
              rows="3"
            ></textarea>
          </div>
          {/* Rating */}
          <div style={{ textAlign: "center",marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "10px" }}>
              Your Rating:
            </label>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setFormData({ ...formData, rating: star })}
                style={{
                  cursor: "pointer",
                  color: formData.rating >= star ? "gold" : "gray",
                  fontSize: "24px",
                }}
              >
                ★
              </span>
            ))}
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
