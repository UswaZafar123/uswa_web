import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Make sure to create a Navbar.css file with the styles

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="navbar-logo">
        <img
          src="https://your-logo-url-here.com/logo.png" // Replace with your logo URL
          alt="Logo"
        />
      </div>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/view-cars" className="navbar-link">View Cars</Link>
        <Link to="/wishlist" className="navbar-link">Wish list</Link>
        <Link to="/rented-cars" className="navbar-link">Rented Cars</Link>
        <Link to="/add-review" className="navbar-link">Add Review</Link>
        <Link to="/cart" className="navbar-link">Cart</Link>
      </div>
      <div className="navbar-profile">
        <img
          src="https://via.placeholder.com/40" // Replace with the user's profile picture URL
          alt="Profile"
          className="navbar-profile-img"
        />
      </div>
    </div>
  );
};

export default Navbar;
