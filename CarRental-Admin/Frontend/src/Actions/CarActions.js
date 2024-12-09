import axios from "axios";

const API_URL = "http://localhost:3000/api/cars";

// Get all cars
export const getAllCars = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch cars:", error);
    throw error;
  }
};

// Get a single car by ID
export const fetchCarById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch car:", error);
    throw error;
  }
};

// Add a new car
export const addCar = async (formData) => {
  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to add car:", error);
    throw error;
  }
};

// Update a car
export const updateCar = async (id, formData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to update car:", error);
    throw error;
  }
};

// Delete a car
export const deleteCar = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete car:", error);
    throw error;
  }
};
