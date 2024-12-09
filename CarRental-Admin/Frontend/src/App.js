// src/App.js
import React from "react";
import { Provider } from "react-redux";  // Import Provider
import store from "./store";  // Import the store
import Login from "./pages/Login";  // Import the Login component
import Register from "./pages/Register";  // Import the Register component
import AdminDashboard from "./pages/Admin";
import EditCarsPage from "./pages/editcar";
import CustomerPanel  from "./pages/customer";
import OrganizeEvent from "./pages/OrganizeEvent";
import EditUsersPage from "./pages/editUser";
import DataAnalytics from "./pages/DataAnalytics";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import routing

const App = () => {
  return (
    <Provider store={store}>  {/* Wrap your app with Provider */}
      <Router>
        <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/edit-cars" element={<EditCarsPage />} />
          <Route path="/customer" element={<CustomerPanel />} />
          <Route path="/organize-events" element={<OrganizeEvent />} />
          <Route path="/edit-users" element={<EditUsersPage />} />
          <Route path="/data-analytics" element={<DataAnalytics />} />
          {/* Add other routes here */}
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
