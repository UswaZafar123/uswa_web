import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/components2/Header.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import DefaultProfileIcon from "../../assets/ai.jpg"; // Default profile icon image

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false); // State for side menu toggle
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleClick = () => {
    navigate("/carownerprofile"); // Navigate to the car owner profile
  };

  return (
    <>
      <header className="navbar">
        <div className="logo">
          <img src="https://th.bing.com/th/id/OIP.yjw5psiNnGr3cgnjR-bLHQHaHa?w=800&h=800&rs=1&pid=ImgDetMain" alt="AUR Corps Logo" />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="nav-links">
          <Link to="/carowner">Home</Link>
          <Link to="/edit-cars">Car Management</Link>
          <Link to="/carownerdashboard">Dashboard</Link>
          <Link to="/inspection">Inspection</Link>
          <Link to="/feedbacks">Feedbacks</Link> {/* Replaced "More" with "Feedbacks" */}
          <div className="profile-container">
            <img
              src={DefaultProfileIcon}
              alt="Profile"
              className="profile-icon"
              onClick={handleClick}
            />
          </div>
        </nav>

        {/* Hamburger Icon */}
        <div className="hamburger" onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>

        {/* Overlay */}
        {menuOpen && (
          <div
            className="overlay show"
            onClick={closeMenu} // Close menu when clicking outside
          ></div>
        )}

        {/* Side Menu */}
        <div className={`side-menu ${menuOpen ? "open" : ""}`}>
          <Link to="/carowner" onClick={closeMenu}>
            Home
          </Link>
          <Link to="/edit-cars" onClick={closeMenu}>
            Car Management
          </Link>
          <Link to="/carownerdashboard" onClick={closeMenu}>
            Dashboard
          </Link>
          <Link to="/carownerprofile" onClick={closeMenu}>
            Profile
          </Link>
          <Link to="/feedbacks" onClick={closeMenu}>
            Feedbacks
          </Link>
          <Link to="#" onClick={closeMenu}>
            Contact Us
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;