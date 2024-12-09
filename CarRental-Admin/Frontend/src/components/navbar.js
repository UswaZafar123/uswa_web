import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4 shadow-md fixed top-0 w-full z-50 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src='logo'
            alt="Logo"
            className="h-10 w-10 object-contain"
          />
          <h1 className="text-2xl font-bold font-nunito">AUR Corps</h1>
        </div>
        <ul className="flex items-center space-x-6 font-nunito">
          <li>
            <Link
              to="/admin"
              className="hover:text-purple-400 transition-colors duration-200"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              className="hover:text-purple-400 transition-colors duration-200"
            >
              Users
            </Link>
          </li>
          <li>
            <Link
              to="/admin/cars"
              className="hover:text-purple-400 transition-colors duration-200"
            >
              Cars
            </Link>
          </li>
          <li>
            <Link
              to="/admin/events"
              className="hover:text-purple-400 transition-colors duration-200"
            >
              Events
            </Link>
          </li>
        </ul>
        <div className="flex items-center space-x-4">
          <button className="bg-purple-600 px-4 py-2 rounded-md hover:bg-purple-700 transition duration-200 font-nunito">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
