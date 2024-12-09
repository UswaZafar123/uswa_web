import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/carownercomponents/Header"; // Assuming the header component is in a components folder

const InspectionPage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [selectedCar, setSelectedCar] = useState(null);
  const [inspectionData, setInspectionData] = useState({
    tires: "",
    engine: "",
    brakes: "",
    lights: "",
    oilLevel: "",
    cleanliness: "",
    notes: "",
  });

  useEffect(() => {
    // Fetch all cars from the backend
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/cars/get-all-cars");
        setCars(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to load cars. Please try again.");
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleInspectClick = (car) => {
    setSelectedCar(car);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInspectionData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:3001/api/cars/inspect", {
        carId: selectedCar._id, // Ensure the selected car ID is sent
        ...inspectionData, // Spread the inspection data
      });
      alert("Inspection saved successfully!");
      setSelectedCar(null);
      setInspectionData({
        tires: "",
        engine: "",
        brakes: "",
        lights: "",
        oilLevel: "",
        cleanliness: "",
        notes: "",
      });
    } catch (error) {
      console.error("Error saving inspection:", error);
      alert("Failed to save inspection.");
    }
  };

  if (loading) {
    return <p>Loading cars...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div style={{ backgroundColor: "#121212", minHeight: "100vh", color: "white" }}>
      <Header />
      <div style={{ padding: "20px" }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Car Inspection Page</h1>

        {selectedCar ? (
          <div style={{ marginTop: "20px", backgroundColor: "#1E1E1E", padding: "20px", borderRadius: "10px" }}>
            <h2>Inspect Car: {selectedCar.make} {selectedCar.model}</h2>
            <form style={{ display: "grid", gap: "10px" }}>
              {/* Inspection Form */}
              <label>Tires:</label>
              <select name="tires" value={inspectionData.tires} onChange={handleInputChange}>
                <option value="">Select</option>
                <option value="Good">Good</option>
                <option value="Needs Replacement">Needs Replacement</option>
              </select>

              <label>Engine:</label>
              <select name="engine" value={inspectionData.engine} onChange={handleInputChange}>
                <option value="">Select</option>
                <option value="Good">Good</option>
                <option value="Needs Service">Needs Service</option>
              </select>

              <label>Brakes:</label>
              <select name="brakes" value={inspectionData.brakes} onChange={handleInputChange}>
                <option value="">Select</option>
                <option value="Working">Working</option>
                <option value="Needs Repair">Needs Repair</option>
              </select>

              <label>Lights:</label>
              <select name="lights" value={inspectionData.lights} onChange={handleInputChange}>
                <option value="">Select</option>
                <option value="Functional">Functional</option>
                <option value="Broken">Broken</option>
              </select>

              <label>Oil Level:</label>
              <select name="oilLevel" value={inspectionData.oilLevel} onChange={handleInputChange}>
                <option value="">Select</option>
                <option value="Sufficient">Sufficient</option>
                <option value="Needs Refill">Needs Refill</option>
              </select>

              <label>Cleanliness:</label>
              <select name="cleanliness" value={inspectionData.cleanliness} onChange={handleInputChange}>
                <option value="">Select</option>
                <option value="Clean">Clean</option>
                <option value="Requires Cleaning">Requires Cleaning</option>
              </select>

              <label>Additional Notes:</label>
              <textarea
                name="notes"
                value={inspectionData.notes}
                onChange={handleInputChange}
                placeholder="Enter additional notes"
                style={{ height: "100px" }}
              />

              <div style={{ display: "flex", gap: "10px" }}>
                <button type="button" onClick={handleSubmit} style={{ backgroundColor: "#6200EE", color: "white", border: "none", padding: "10px 20px", borderRadius: "5px" }}>
                  Save Inspection
                </button>
                <button type="button" onClick={() => setSelectedCar(null)} style={{ backgroundColor: "#B00020", color: "white", border: "none", padding: "10px 20px", borderRadius: "5px" }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div style={{ display: "grid", gap: "15px", padding: "20px" }}>
            <h2 style={{ textAlign: "center" }}>All Cars</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
              {cars.map((car) => (
                <div
                  key={car._id}
                  style={{
                    backgroundColor: "#1E1E1E",
                    padding: "15px",
                    borderRadius: "10px",
                    textAlign: "center",
                    width: "250px",
                  }}
                >
                  <p style={{ fontWeight: "bold" }}>{car.make} {car.model} ({car.year})</p>
                  <button onClick={() => handleInspectClick(car)} style={{ backgroundColor: "#6200EE", color: "white", border: "none", padding: "10px 20px", borderRadius: "5px" }}>
                    Inspect
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InspectionPage;
