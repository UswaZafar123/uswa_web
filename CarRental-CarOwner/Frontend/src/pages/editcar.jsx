import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/carownercomponents/Header"; // Import Header component
import Footer from "../components/carownercomponents/Footer"; // Import Footer component
import "../styles/admin/editcar.css";

const EditCarsPage = () => {
  const [cars, setCars] = useState([]);
  const [formData, setFormData] = useState({
    ownerId: "",
    make: "",
    model: "",
    year: "",
    price: "",
    carType: "Sale", // Sale or Rent
    driverOption: "Without Driver", // With Driver or Without Driver
    tripType: "", // If With Driver, specify trip type
    mileage: "",
    condition: "New",
    availability: true,
    picture: null,
  });

  const [editMode, setEditMode] = useState(false);
  const [editCarData, setEditCarData] = useState(null);
  const token = localStorage.getItem("token");

  // Fetch cars
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/cars/get-all-cars", {
          headers: {
            Authorization: `Bearer ${token}`,
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
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Car added successfully!");
      setFormData({
        ownerId: "",
        make: "",
        model: "",
        year: "",
        price: "",
        carType: "Sale",
        driverOption: "Without Driver",
        tripType: "",
        mileage: "",
        condition: "New",
        availability: true,
        picture: null,
      });
      fetchCars(); // Refresh the car list
    } catch (error) {
      alert(`Error adding car: ${error.response?.data?.message || error.message}`);
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
      alert("Car updated successfully!");
      setEditMode(false); // Exit edit mode after saving
      fetchCars(); // Refresh car list
    } catch (error) {
      alert(`Error updating car: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleDeleteCar = async (carId) => {
    try {
      await axios.post(
        "http://localhost:3001/api/cars/delete-car",
        { _id: carId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Car deleted successfully!");
      setCars(cars.filter((car) => car._id !== carId));
    } catch (error) {
      alert(`Error deleting car: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="page-container">
      <Header />
      <div className="container" style={{ marginTop: "100px" }}> {/* Ensures content starts below navbar */}
        <div className="form-container">
          <h2>Add a New Car</h2>
          <form>
            <label>Owner ID</label>
            <input type="text" name="ownerId" value={formData.ownerId} onChange={handleInputChange} />

            <label>Car Make</label>
            <input type="text" name="make" value={formData.make} onChange={handleInputChange} />

            <label>Car Model</label>
            <input type="text" name="model" value={formData.model} onChange={handleInputChange} />

            <label>Manufacturing Year</label>
            <input type="number" name="year" value={formData.year} onChange={handleInputChange} />

            {/* Sale or Rent */}
            <label>Car Type</label>
            <select name="carType" value={formData.carType} onChange={handleInputChange}>
              <option value="Sale">Sale</option>
              <option value="Rent">Rent</option>
            </select>

            {/* Sale Price */}
            {formData.carType === "Sale" && (
              <>
                <label>Sale Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </>
            )}

            {/* Rent Options */}
            {formData.carType === "Rent" && (
              <>
                <label>Driver Option</label>
                <select name="driverOption" value={formData.driverOption} onChange={handleInputChange}>
                  <option value="With Driver">With Driver</option>
                  <option value="Without Driver">Without Driver</option>
                </select>

                {formData.driverOption === "With Driver" && (
                  <>
                    <label>Trip Type</label>
                    <select name="tripType" value={formData.tripType} onChange={handleInputChange}>
                      <option value="">Select</option>
                      <option value="Airport Pickup">Airport Pickup</option>
                      <option value="Northern Trip">Northern Trip</option>
                      <option value="City Travel">City Travel</option>
                    </select>
                  </>
                )}

                <label>Rent Price (Per Day)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </>
            )}

            <label>Mileage</label>
            <input type="number" name="mileage" value={formData.mileage} onChange={handleInputChange} />

            <label>Condition</label>
            <select name="condition" value={formData.condition} onChange={handleInputChange}>
              <option value="New">New</option>
              <option value="Used">Used</option>
            </select>

            <label>Availability</label>
            <select name="availability" value={formData.availability} onChange={handleInputChange}>
              <option value={true}>Available</option>
              <option value={false}>Unavailable</option>
            </select>

            <label>Car Picture</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />

            <button type="button" onClick={handleAddCar}>
              Add Car
            </button>
          </form>
        </div>

        {/* Existing Cars Section */}
        <div className="car-list">
          <h2>Existing Cars</h2>
          {cars.length === 0 ? (
            <p>No cars available</p>
          ) : (
            <div className="car-list-row" style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
              {cars.map((car) => (
                <div key={car._id} className="car-item" style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "8px" }}>
                  <img
                    src={`https://your-server.com/uploads/${car.picture}`}
                    alt="Car"
                    width="100"
                  />
                  <div>
                    <strong>
                      {car.make} {car.model} ({car.year})
                    </strong>
                    <p>
                      {car.carType === "Sale"
                        ? `Sale Price: $${car.price}`
                        : `Rent Price: $${car.price}/day`}
                    </p>
                    {car.carType === "Rent" && car.driverOption === "With Driver" && (
                      <p>Trip Type: {car.tripType || "N/A"}</p>
                    )}
                    <button onClick={() => handleEditClick(car)}>Edit</button>
                    <button onClick={() => handleDeleteCar(car._id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {editMode && editCarData && (
            <div className="form-container">
              <h2>Edit Car</h2>
              <form>
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
                <label>Year</label>
                <input
                  type="number"
                  name="year"
                  value={editCarData.year}
                  onChange={handleEditInputChange}
                />
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
      <Footer />
    </div>
  );
};

export default EditCarsPage;
