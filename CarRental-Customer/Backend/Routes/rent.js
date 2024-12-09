const express = require("express");
const router = express.Router();
const RentTransaction = require("../Models/RentTransaction");
const Car = require("../Models/Car");

// Rent a car



router.post("/rent", async (req, res) => {
  const { username, email, contact, carId, rentDuration, amount } = req.body;

  if (!username || !email || !contact || !carId || !rentDuration || !amount) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const rentTransaction = new RentTransaction({
      username,
      email,
      contact,
      carId,
      rentDuration,
      amount,
      ty
    });

    await rentTransaction.save();

    res.status(201).json({ message: "Rent transaction recorded successfully." });
  } catch (error) {
    console.error("Error saving rent transaction:", error);
    res.status(500).json({ message: "Failed to save rent transaction." });
  }
});



module.exports = router;
