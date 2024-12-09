// src/App.js
import React from "react";
import { Provider } from "react-redux";  // Import Provider
import store from "./store";  // Import the store
import Login from "./pages/Login";  // Import the Login component
import Register from "./pages/Register";  // Import the Register component
import AdminDashboard from "./pages/Admin";
import EditCarsPage from "./pages/editcar";
import CustomerPanel  from "./pages/customer";
import BuyForm from './pages/customerpages/BuyForm';
import RentForm from './pages/customerpages/RentForm';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import routing
import FavoritesPage from './pages/customerpages/FavoritesPage';
import CarDetails from './pages/customerpages/CarDetails';
import ReviewForm from "./pages/customerpages/ReviewForm";

import PaymentForm from "./pages/customerpages/PaymentForm";
import PaymentForm2 from "./pages/customerpages/PaymentForm2";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
//import CustomerLandingpage from "/pages/customerpages//CustomerLandingpage";
const stripePromise = loadStripe("pk_test_51QTOHdBicms9V609084pcTYJeETpmxCPY6b908g4o7NN7253zOJbkI2N9mOdNmYxzhnQWMhES4lYJ9iAJhUHHAMv00cXK046Lh");
import Navbar from "./CustomerComponents/Navbar.jsx"; // Adjust the path to your Navbar file
// Add Route


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
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/car/:carId" element={<CarDetails />} />
          <Route path="/review/:carId" element={<ReviewForm />} />
        <Route path="/buy/:carId" element={<BuyForm />} />
        <Route path="/rent/:carId" element={<RentForm />} />
        <Route path="/payment" element={<PaymentForm />} />
        <Route path="/payment-form2" element={<PaymentForm2 />} />
          {/* Add other routes here */}
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
