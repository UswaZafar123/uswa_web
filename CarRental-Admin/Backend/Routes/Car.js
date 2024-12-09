const express = require("express");
const router = express.Router();
const multer = require('multer');
const Car = require("../Models/Car");
const user = require("../Models/User");
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
const sgMail = require('@sendgrid/mail'); // Ensure @sendgrid/mail is imported and configured
sgMail.setApiKey(process.env.SENDGRID_API_KEY); // Set your SendGrid API Key

router.post("/delete-car", protect, async (req, res) => {
  const { _id } = req.body;
  console.log("ustas");

  try {
    // Find the car before deleting it
    const car = await Car.findById(_id);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    // Find the owner based on the ownerId from the car document
    const owner = await user.findById(car.ownerId);

    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    // Delete the car
    await Car.findByIdAndDelete(_id);

    // Send notification email to the owner
    const msg = {
      to: owner.email, // Owner's email address
      from: 'Alihaider11464@gmail.com', // Your verified sender email address
      subject: 'Car Deleted Notification',
      text: `Hello ${owner.name},\n\nWe want to inform you that your car with ID: ${_id} has been successfully deleted from our platform.\n\nIf you have any questions, please contact our support team.\n\nBest regards,\nYour Company Name`,
    };

    await sgMail.send(msg);
console.log("jijijij");
    res.status(200).json({ message: "Car deleted successfully and notification sent to owner" });
  } catch (err) {
    console.log(err);
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
//no of cars 
router.get("/get-no-of-cars", protect, async (req, res) => {
    try {
      const cars = await Car.find();
      res.status(200).json(cars.length);
    } catch (err) {
      console.error("Error fetching cars:", err);
      res.status(500).json({ message: "Error fetching cars" });
    }
  });

module.exports = router;