import React from "react";
import Header from "../components/carownercomponents/Header"; // Import Header component

const CarLandingPage = () => {
  return (
    <div style={{ textAlign: "center", backgroundColor: "#121212", color: "white" }}>
      {/* Header Component */}
      <Header />

      {/* Hero Section */}
      <div
        style={{
          position: "relative",
          height: "100vh",
          backgroundImage: "url('https://wallpapers.com/images/hd/4k-bmw-car-in-dark-c0ot64ri2fecu1pr.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            textAlign: "center",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            padding: "30px",
            borderRadius: "10px",
            zIndex: 10,
          }}
        >
          <h1
            style={{
              fontSize: "4rem",
              margin: 0,
              color: "white",
              textShadow: "3px 3px 6px rgba(0, 0, 0, 0.8)",
            }}
          >
            AUR Rental And Sales System
          </h1>
          <p
            style={{
              fontSize: "1.5rem",
              marginTop: "10px",
              color: "#f0f0f0",
              textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)",
            }}
          >
            Find your dream Car, SUV, Sedan, Luxury, with trusted vendors.
          </p>
        </div>
      </div>

      {/* What We Offer Section */}
      <div
        style={{
          padding: "50px",
          backgroundColor: "#1e1e1e",
        }}
      >
        <h2
          style={{
            color: "#64b5f6",
            fontSize: "2.5rem",
            marginBottom: "20px",
          }}
        >
          Why Choose Us?
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              backgroundColor: "#0d47a1",
              color: "white",
              padding: "20px",
              borderRadius: "5px",
              width: "250px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
              textAlign: "center",
            }}
          >
            <h3 style={{ marginBottom: "10px" }}>Wide Variety</h3>
            <p>Choose from a range of cars, including SUVs, luxury vehicles, and more.</p>
          </div>
          <div
            style={{
              backgroundColor: "#0d47a1",
              color: "white",
              padding: "20px",
              borderRadius: "5px",
              width: "250px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
              textAlign: "center",
            }}
          >
            <h3 style={{ marginBottom: "10px" }}>Trusted Vendors</h3>
            <p>All cars are from verified and trusted vendors.</p>
          </div>
          <div
            style={{
              backgroundColor: "#0d47a1",
              color: "white",
              padding: "20px",
              borderRadius: "5px",
              width: "250px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
              textAlign: "center",
            }}
          >
            <h3 style={{ marginBottom: "10px" }}>Easy Booking</h3>
            <p>Quick and hassle-free booking process.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarLandingPage;
