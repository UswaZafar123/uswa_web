import React from "react";
import { Provider } from "react-redux"; // Import Provider
import store from "./store"; // Import the store
import Login from "./pages/Login"; // Import the Login component
import Register from "./pages/Register"; // Import the Register component
import AdminDashboard from "./pages/Admin";
import EditCarsPage from "./pages/editcar";
import CustomerPanel from "./pages/customer";
import CarOwnerDashBoard from "./pages/DashBoard";
import InspectionPage from "./pages/InspectionPage";
import FeedbacksPage from "./pages/FeedbacksPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import routing
import CarLandingPage from "./pages/carlandingpage";

const App = () => {
  return (
    <Provider store={store}> {/* Wrap your app with Provider */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/edit-cars" element={<EditCarsPage />} />
          <Route path="/customer" element={<CustomerPanel />} />
          <Route path="/carownerdashboard" element={<CarOwnerDashBoard />} /> {/* Dashboard route */}
          <Route path="/carowner" element={<CarLandingPage />} /> {/* Home route */}
          <Route path="/inspection" element={<InspectionPage />} />
          <Route path="/feedbacks" element={<FeedbacksPage />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
