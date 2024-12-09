import React from "react";
import { Link } from "react-router-dom";
import "../../styles/components/header.css"; // Custom CSS for header styling

const Header = () => {
  return (
    <header className="admin-header">
      <div className="logo-container">
        <Link to="/admin" className="logo">
          <img
            src="https://cdn.leonardo.ai/users/bcd4bd36-ab57-4eae-8e0c-7a456a7f9312/generations/6b8ad469-b17c-472e-932b-509fb584293b/Leonardo_Phoenix_Design_a_modern_sleek_logo_for_AUR_Corps_a_ca_2.jpg"
            alt="RealProperty Logo"
          />
        </Link>
      </div>

      <nav className="nav-links">
        <Link to="/admin" className="nav-link">Dashboard</Link>
        <Link to="/edit-user" className="nav-link">Edit User</Link>
        <Link to="/edit-cars" className="nav-link">Edit Cars</Link>
        <Link to="/organize-events" className="nav-link">Organize Events</Link>
        <Link to="/data-analytics" className="nav-link">Data Analytics</Link>
        <Link to="/login" className="nav-link">Logout</Link>
      </nav>
    </header>
  );
};

export default Header;
