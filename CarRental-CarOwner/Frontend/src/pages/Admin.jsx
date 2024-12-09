import React from "react";
import Header from "../components/admincomponents/adminheader";
import Footer from "../components/admincomponents/adminfooter";
import "../styles/admin/adminlandingpage.css"; // Make sure to include your landing page CSS
import { Link} from "react-router-dom";

const AdminLandingPage = () => {
  return (
    <div className="admin-landing-page">
      {/* Header */}
      <Header />

      {/* Main content */}
      <div className="background-overlay">
        <div className="admin-container">
          <div className="admin-header">
            <h1 className="admin-title">Welcome to the Admin Dashboard</h1>
            <p className="admin-subtitle">Manage Users, Cars, Events, and Analytics</p>
          </div>

          {/* Admin Options */}
          <div className="admin-options">
            <div className="admin-option">
              <Link to="/" className="admin-link">
                <div className="admin-card">
                  <i className="fas fa-users"></i>
                  <h3>Edit User</h3>
                  <p>Manage user information and permissions</p>
                </div>
              </Link>
            </div>

            <div className="admin-option">
              <Link to="/edit-cars" className="admin-link">
                <div className="admin-card">
                  <i className="fas fa-car"></i>
                  <h3>Edit Cars</h3>
                  <p>Manage car listings and availability</p>
                </div>
              </Link>
            </div>

            <div className="admin-option">
              <Link to="/organize-events" className="admin-link">
                <div className="admin-card">
                  <i className="fas fa-calendar-alt"></i>
                  <h3>Organize Events</h3>
                  <p>Set up car sales or rental events</p>
                </div>
              </Link>
            </div>

            <div className="admin-option">
              <Link to="/data-analytics" className="admin-link">
                <div className="admin-card">
                  <i className="fas fa-chart-line"></i>
                  <h3>Data Analytics</h3>
                  <p>Analyze trends and performance</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AdminLandingPage;
