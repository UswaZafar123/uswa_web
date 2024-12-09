const express = require("express");
const router = express.Router();
const Feedback = require("../Models/Feedback");
const protect = require("../middlewares/Authmidddleware"); // Authentication middleware

// @desc    Add a new feedback
// @route   POST /api/feedbacks
// @access  Private
router.post("/", async (req, res) => {
  const { carId, feedbackText, rating } = req.body;

  try {
    const feedback = new Feedback({
      userId: req.user._id,
      carId,
      feedbackText,
      rating,
    });

    const savedFeedback = await feedback.save();
    res.status(201).json(savedFeedback);
  } catch (error) {
    console.error("Error adding feedback:", error);
    res.status(500).json({ message: "Error adding feedback" });
  }
});

// @desc    Get all feedbacks for a specific car
// @route   GET /api/feedbacks/car/:carId
// @access  Public

router.get("/feedbackss", async (req, res) => {
    console.log("chlra e");
    try {
      // Fetch all feedbacks and populate carId and userId references
      const feedbacks = await Feedback.find()
        .populate("carId", "make model year") // Populate car details (make, model, year)
        .populate("userId", "name email");
        console.log(feedbacks); // Populate user details (name, email)
  
      res.status(200).json(feedbacks);
    } catch (error) {
      console.error("Error fetching all feedbacks:", error);
      res.status(500).json({ message: "Error fetching feedbacks" });
    }
  });
  
// @desc    Get all feedbacks by a specific user
// @route   GET /api/feedbacks/user/:userId
// @access  Private
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const feedbacks = await Feedback.find({ userId }).populate("carId", "make model year");
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedbacks by user:", error);
    res.status(500).json({ message: "Error fetching feedbacks by user" });
  }
});

// @desc    Update a feedback
// @route   PUT /api/feedbacks/:id
// @access  Private
router.put("/:id",  async (req, res) => {
  const { id } = req.params;
  const { feedbackText, rating } = req.body;

  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(
      id,
      { feedbackText, rating },
      { new: true }
    );

    if (!updatedFeedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.status(200).json(updatedFeedback);
  } catch (error) {
    console.error("Error updating feedback:", error);
    res.status(500).json({ message: "Error updating feedback" });
  }
});

// @desc    Delete a feedback
// @route   DELETE /api/feedbacks/:id
// @access  Private
router.delete("/:id",  async (req, res) => {
  const { id } = req.params;

  try {
    const deletedFeedback = await Feedback.findByIdAndDelete(id);

    if (!deletedFeedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    res.status(500).json({ message: "Error deleting feedback" });
  }
});

module.exports = router;
