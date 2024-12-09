const express = require("express");
const router = express.Router();
const Car = require("../Models/Car");
const{protect}=require("../middlewares/Authmidddleware");

// Middleware to ensure only authenticated car owners can access these routes


// Route to fetch dashboard data
router.get("/dashboard", protect, async (req, res) => {
  try {
    const ownerId = req.user._id; // Extract logged-in user's ID from the token
    // Example: Fetch total revenue and active rentals for the owner
    const totalRevenue = await Car.aggregate([
      { $match: { ownerId } },
      { $group: { _id: null, total: { $sum: "$revenue" } } },
    ]);
    const activeRentals = await Car.countDocuments({
      ownerId,
      status: "Rented",
    });

    res.status(200).json({
      totalRevenue: totalRevenue[0]?.total || 0,
      activeRentals,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Error fetching dashboard data" });
  }
});

// Route to fetch car listings
router.get("/cars", async (req, res) => {
  try {
    const ownerId = req.user.id; // Assume `req.user` is set by AuthMiddleware
    const cars = await Car.find({ ownerId });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: "Error fetching car listings", error });
  }
});

// Route to fetch notifications
router.get("/notifications", async (req, res) => {
  try {
    const ownerId = req.user.id; // Assume `req.user` is set by AuthMiddleware

    // Example notifications logic
    const notifications = [
      { message: "New rental request received", type: "rental" },
      { message: "Auction ending soon for Car XYZ", type: "auction" },
    ];

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notifications", error });
  }
});

module.exports = router;
