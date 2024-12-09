const express = require("express");
const router = express.Router();
const multer = require('multer');
const Car = require("../Models/Car");
const { protect, admin } = require('../middlewares/Authmidddleware'); // Middleware to check authentication
const upload = multer({ dest: "uploads/" }); 
// Add a new car
router.post("/add-car", protect,upload.single("picture"), async (req, res) => {
    console.log("oo");
   
  const { ownerId,make, model, year, pricePerDay, mileage, condition, availability } = req.body;

  try {
    const newCar = new Car({
        ownerId,
      make,
      model,
      year,
      pricePerDay,
      mileage,
      condition,
      availability : availability === "true",
      picture: req.file?.filename || "", // Handle file upload if needed
    });

    await newCar.save();
    res.status(201).json({ message: "Car added successfully" });
  } catch (err) {
    console.error("Error adding car:", err);
    res.status(500).json({ message: "Error adding car" });
  }
});

// Edit a car
router.post("/edit-car", protect, async (req, res) => {
  const { _id, ...updates } = req.body;

  try {
    const updatedCar = await Car.findByIdAndUpdate(_id, updates, { new: true });
    res.status(200).json({ message: "Car updated successfully", updatedCar });
  } catch (err) {
    console.error("Error updating car g:", err);
    res.status(500).json({ message: "Error updating car" });
  }
});

// Delete a car
router.post("/delete-car", protect, async (req, res) => {
  const { _id } = req.body;

  try {
    await Car.findByIdAndDelete(_id);
    res.status(200).json({ message: "Car deleted successfully" });
  } catch (err) {
    console.error("Error deleting car:", err);
    res.status(500).json({ message: "Error deleting car" });
  }
});

// Get all cars by the vendor
router.get("/get-cars", protect, async (req, res) => {
  try {
    const cars = await Car.find({ ownerId: req.user.id });
    res.status(200).json(cars);
  } catch (err) {
    console.error("Error fetching cars:", err);
    res.status(500).json({ message: "Error fetching cars" });
  }
});
//get all cars 
router.get("/get-all-cars", protect, async (req, res) => {
    try {
      const cars = await Car.find();
      res.status(200).json(cars);
    } catch (err) {
      console.error("Error fetching cars:", err);
      res.status(500).json({ message: "Error fetching cars" });
    }
  });
  // GET /api/cars/:id - Fetch car details by ID
router.get("/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json(car);
  } catch (error) {
    console.error("Error fetching car details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;