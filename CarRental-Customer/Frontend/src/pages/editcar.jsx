import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/admin/editcar.css";

const EditCarsPage = () => {
  const [cars, setCars] = useState([]);
  const [formData, setFormData] = useState({
    ownerId: "",
    make: "",
    model: "",
    year: "",
    pricePerDay: "",
    mileage: "",
    condition: "New",
    availability: true,
    picture: null,
  });

  const [editMode, setEditMode] = useState(false); // Track if edit mode is active
  const [editCarData, setEditCarData] = useState(null); // Track the car being edited

  // Retrieve token from localStorage
  const token = localStorage.getItem("token");
  if (!token) {
    alert("You need to be logged in to access this page");
  }

  // Fetch cars for the logged-in user (vendor)
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/cars/get-all-cars", {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
            "Content-Type": "multipart/form-data",
          },
        });
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      picture: e.target.files[0],
    }));
  };

  const handleAddCar = async () => {
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      await axios.post("http://localhost:3001/api/cars/add-car", formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token here
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Car added successfully!");
      setFormData({
        ownerId: "",
        make: "",
        model: "",
        year: "",
        pricePerDay: "",
        mileage: "",
        condition: "New",
        availability: true,
        picture: null,
      });
      fetchCars();
    } catch (error) {
      alert(`Error adding car: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleDeleteCar = async (carId) => {
    try {
      await axios.post(
        "http://localhost:3001/api/cars/delete-car",
        { _id: carId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token here
          },
        }
      );
      alert("Car deleted successfully!");
      setCars(cars.filter((car) => car._id !== carId));
    } catch (error) {
      alert(`Error deleting car: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleEditClick = (car) => {
    setEditMode(true);
    setEditCarData(car);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditCarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveCarUpdates = async () => {
    try {
      await axios.post(
        "http://localhost:3001/api/cars/edit-car",
        { ...editCarData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Car updated successfully g!");
      setEditMode(false); // Exit edit mode after saving
      fetchCars(); // Refresh car list
    } catch (error) {
        alert(error);
      alert(`Error updating car r: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="container">
      {/* Add New Car Section */}
      <div className="form-container">
        <h2>Add a New Car</h2>
        <form>
          <label>Owner ID</label>
          <input
            type="text"
            name="ownerId"
            value={formData.ownerId}
            onChange={handleInputChange}
          />
          <label>Car Make</label>
          <input
            type="text"
            name="make"
            value={formData.make}
            onChange={handleInputChange}
          />
          <label>Car Model</label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleInputChange}
          />
          <label>Manufacturing Year</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleInputChange}
          />
          <label>Price per Day</label>
          <input
            type="number"
            name="pricePerDay"
            value={formData.pricePerDay}
            onChange={handleInputChange}
          />
          <label>Mileage</label>
          <input
            type="number"
            name="mileage"
            value={formData.mileage}
            onChange={handleInputChange}
          />
          <label>Condition</label>
          <select
            name="condition"
            value={formData.condition}
            onChange={handleInputChange}
          >
            <option value="New">New</option>
            <option value="Used">Used</option>
          </select>
          <label>Availability</label>
          <select
            name="availability"
            value={formData.availability}
            onChange={handleInputChange}
          >
            <option value={true}>Available</option>
            <option value={false}>Unavailable</option>
          </select>
          <label>Car Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <button type="button" onClick={handleAddCar}>
            Add Car
          </button>
        </form>
      </div>

      {/* Edit/Delete Existing Cars Section */}
      <div className="car-list">
        <h2>Existing Cars</h2>
        {cars.length === 0 ? (
          <p>No cars available</p>
        ) : (
          cars.map((car) => (
            <div key={car._id} className="car-item">
              <img
                src={`https://your-server.com/uploads/${car.picture}`}
                alt="Car"
                width="100"
              />
              <div>
                <strong>{car.make} {car.model} ({car.year})</strong>
                <p>Price per day: ${car.pricePerDay}</p>
                <button onClick={() => handleEditClick(car)}>Edit</button>
                <button onClick={() => handleDeleteCar(car._id)}>Delete</button>
              </div>
            </div>
          ))
        )}

        {/* Conditionally render the Edit Form */}
        {editMode && editCarData && (
          <div className="form-container">
            <h2>Edit Car</h2>
            <form>
              <label>Owner ID</label>
              <input
                type="text"
                name="ownerId"
                value={editCarData.ownerId}
                onChange={handleEditInputChange}
              />
              <label>Car Make</label>
              <input
                type="text"
                name="make"
                value={editCarData.make}
                onChange={handleEditInputChange}
              />
              <label>Car Model</label>
              <input
                type="text"
                name="model"
                value={editCarData.model}
                onChange={handleEditInputChange}
              />
              <label>Manufacturing Year</label>
              <input
                type="number"
                name="year"
                value={editCarData.year}
                onChange={handleEditInputChange}
              />
              <label>Price per Day</label>
              <input
                type="number"
                name="pricePerDay"
                value={editCarData.pricePerDay}
                onChange={handleEditInputChange}
              />
              <label>Mileage</label>
              <input
                type="number"
                name="mileage"
                value={editCarData.mileage}
                onChange={handleEditInputChange}
              />
              <label>Condition</label>
              <select
                name="condition"
                value={editCarData.condition}
                onChange={handleEditInputChange}
              >
                <option value="New">New</option>
                <option value="Used">Used</option>
              </select>
              <label>Availability</label>
              <select
                name="availability"
                value={editCarData.availability}
                onChange={handleEditInputChange}
              >
                <option value={true}>Available</option>
                <option value={false}>Unavailable</option>
              </select>
              <button type="button" onClick={handleSaveCarUpdates}>
                Save Changes
              </button>
              <button type="button" onClick={() => setEditMode(false)}>
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditCarsPage;
