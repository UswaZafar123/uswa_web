import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/carownercomponents/Header"; // Import Header component
import Footer from "../components/carownercomponents/Footer"; // Import Footer component
import "../styles/carowner/carownerlandingpage.css";
const token=localStorage.getItem("token");

const CarOwnerDashBoard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [totalCars, setTotalCars] = useState(0); // State for total cars

  // Fetch dashboard data and total cars
  useEffect(() => {
    console.log("Token:", localStorage.getItem("token")); // Debug log
    const fetchData = async () => {
      try {
        // Fetch dashboard data 
        /*
        const dashboardRes = await axios.get("http://localhost:3001/api/car-owner/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`, // Include token
          },
        });
        console.log("Dashboard Data:", dashboardRes.data); // Debug log
        setDashboardData(dashboardRes.data);
*/
        // Fetch total cars
        const totalCarsRes = await axios.get("http://localhost:3001/api/cars/get-no-of-cars");
       alert("Total Cars from API:", totalCarsRes.data.totalCars); // Debug log
        setTotalCars(totalCarsRes.data.totalCars || 0);
      } catch (error) {
        alert(error);
        console.error("Error fetching data:", error.response?.data || error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Header Component */}
      <Header />

      {/* Main Content Area */}
      <div className="main-content">
        {/* Dashboard Overview Section */}
        <section className="dashboard">
          <h2>Dashboard Overview</h2>
          <div className="dashboard-metrics">
            <div className="metric">
              <h3>Total Revenue</h3>
              <p>${dashboardData.totalRevenue || 0}</p>
            </div>
            <div className="metric">
              <h3>Total Cars</h3>
              <p>{totalCars}</p>
            </div>
            <div className="metric">
              <h3>Active Rentals</h3>
              <p>{dashboardData.activeRentals || 0}</p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default CarOwnerDashBoard;
