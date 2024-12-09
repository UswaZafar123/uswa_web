// routes/feedback.js
const express = require('express');
const router = express.Router();
const Feedback = require('../Models/Feedback');

// POST: Add Feedback
router.post('/', async (req, res) => {
  const { userId, carId, feedbackText, rating } = req.body;

  try {
    const feedback = new Feedback({ userId, carId, feedbackText, rating });
    await feedback.save();
    res.status(201).json({ message: 'Feedback added successfully', feedback });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ error: 'Failed to save feedback' });
  }
});

// GET: Fetch Feedback for a Car
router.get('/:carId', async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ carId: req.params.carId }).populate('userId', 'name');
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
});
router.post("/feedback", async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Debugging purpose
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).send("Feedback submitted successfully!");
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).send("Failed to save feedback.");
  }
});

module.exports = router;
