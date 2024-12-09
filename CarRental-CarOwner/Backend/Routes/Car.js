const express = require("express");
const router = express.Router();
const multer = require("multer");
const Car = require("../Models/Car");
const { protect, admin } = require("../middlewares/Authmidddleware"); // Middleware to check authentication
const upload = multer({ dest: "uploads/" });
const axios = require("axios");

// Add a new car
router.post("/add-car", protect, upload.single("picture"), async (req, res) => {
  
  const { ownerId, make, model, year, price, carType, driverOption, tripType, mileage, condition, availability } = req.body;

  try {
   

    const newCar = new Car({

      ownerId, // Use the user ID from the token
      make,
      model,
      year,
      price,
      carType,
      driverOption: carType === "Rent" ? driverOption : undefined,
      tripType: carType === "Rent" && driverOption === "With Driver" ? tripType : undefined,
      mileage,
      condition,
      availability: availability === "true",
      picture: req.file?.filename || "",
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
    console.error("Error updating car:", err);
    res.status(500).json({ message: "Error updating car" });
  }
});

// Delete a car
router.post("/delete-car", protect, async (req, res) => {
  const { _id } = req.body;

  try {
   

    await Car.findByIdAndDelete(_id);
    // Prepare email payload
    const emailPayload = {
        from: "i222443@nu.edu.pk", // Replace with your verified sender email
        to: "haiderjutt119@gmail.com",
        subject: "Car Deleted Notification",
        text: Hello ${owner.name},\n\nWe want to inform you that your car with ID: ${_id} has been successfully deleted from our platform.\n\nIf you have any questions, please contact our support team.\n\nBest regards,\nYour Company Name,
        html: `<p>Hello ${owner.name},</p>
               <p>We want to inform you that your car with ID: <strong>${_id}</strong> has been successfully deleted from our platform.</p>
               <p>If you have any questions, please contact our support team.</p>
               <p>Best regards,</p>
               <p>Your Company Name</p>`,
      };
  
      // Send email using MailerSend API
      const response = await axios.post("https://api.mailersend.com/v1/email", emailPayload, {
        headers: {
          Authorization: Bearer ${process.env.MAILERSEND_API_KEY}, // Ensure your API key is set in .env
          "Content-Type": "application/json",
        },
      });
  
      console.log("Email sent successfully:", response.data);
    res.status(200).json({ message: "Car deleted successfully" });
  } catch (err) {
    console.error("Error deleting car:", err);
    res.status(500).json({ message: "Error deleting car" });
  }
});

// Get all cars by the vendor
router.get("/get-cars", protect, async (req, res) => {
  try {
    
    const cars = await Car.find({ ownerId: req.user._id });
    res.status(200).json(cars);
  } catch (err) {
    console.error("Error fetching cars:", err);
    res.status(500).json({ message: "Error fetching cars" });
  }
});

// Get all cars (make this endpoint public for inspection page)
router.get("/get-all-cars", async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (err) {
    console.error("Error fetching cars:", err);
    res.status(500).json({ message: "Error fetching cars" });
  }
});

router.get("/get-no-of-cars", async (req, res) => {
  console.log("hello hi bye bye");
  try {
    const totalCars = await Car.countDocuments({});
    console.log("Total cars in database:", totalCars); // Debugging log
    res.status(200).json({ totalCars }); // Respond with total cars
  } catch (err) {
    console.error("Error fetching total cars:", err);
    res.status(500).json({ message: "Error fetching total cars" });
  }
});


// Add inspection report
router.post("/inspect", async (req, res) => {
  const { carId, tires, engine, brakes, lights, oilLevel, cleanliness, notes } = req.body;

  try {
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    car.inspectionReport = {
      tires,
      engine,
      brakes,
      lights,
      oilLevel,
      cleanliness,
      notes,
    };

    await car.save();
    res.status(201).json({ message: "Inspection report saved successfully!" });
  } catch (err) {
    console.error("Error saving inspection report:", err);
    res.status(500).json({ message: "Error saving inspection report" });
  }
});

// @desc    Get all cars with their feedbacks
// @route   GET /api/cars/feedbacks
// @access  Private
router.get("/feedbacks", protect, async (req, res) => {
  try {
    const cars = await Car.find({ ownerId: req.user._id }).populate("reviews.customerId", "name email");
    res.status(200).json(cars);
  } catch (error) {
    console.error("Error fetching cars with feedbacks:", error);
    res.status(500).json({ message: "Error fetching cars with feedbacks" });
  }
});


module.exports = router;