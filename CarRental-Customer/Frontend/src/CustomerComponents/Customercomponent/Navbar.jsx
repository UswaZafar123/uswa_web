import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import axios from "axios";
const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userImage, setUserImage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/">
            <img
              src="https://th.bing.com/th/id/OIP.yjw5psiNnGr3cgnjR-bLHQHaHa?w=800&h=800&rs=1&pid=ImgDetMain"
              alt="app logo"
            />
          </Link>
        </div>

        {/* Hamburger Menu */}
        <div className="navbar-hamburger" onClick={toggleMenu}>
          {isOpen ? "✖" : "☰"}
        </div>

        {/* Links */}
        <ul className={`navbar-links ${isOpen ? "active" : ""}`}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/ViewProperties">View Cars</Link>
          </li>
          {isLoggedIn && (
            <>
              <li>
                <Link to="/favorites">Wish list</Link>
              </li>
              <li>
                <Link to="/bookedproperties">Rented Cars</Link>
              </li>
              <li>
                <Link to="/PropertyDetails">Add Review</Link>
              </li>
              <li>
                <Link to="/payment">Cart</Link>
              </li>
              <li className="navbar-profile">
                {userImage ? (
                  <img
                    src={`http://localhost:5000/${userImage}`}
                    alt="User"
                    className="profile-image"
                  />
                ) : (
                  <span className="profile-icon" aria-label="Default User Icon">🧓</span>
                )}
                <div className="dropdown-menu">
                  <Link to="/customerprofile">Edit Profile</Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              </li>
            </>
          )}
          {!isLoggedIn && (
            <>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/contact">Customer Reviews</Link>
              </li>
              <li className="navbar-buttons">
                <Link to="/login" className="btn btn-outline">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
