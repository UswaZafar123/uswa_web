const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/Authmidddleware");
const Event = require("../Models/Event");

// Create a new event
router.post("/add-event", protect, async (req, res) => {
  const { eventName, eventType, date, location, description , organizer} = req.body;

  try {
    const newEvent = new Event({
      eventName,
      eventType,
      date,
      location,
      description,
      organizer , // Organizer ID from the authenticated user
    });

    await newEvent.save();
    res.status(201).json({ message: "Event created successfully", newEvent });
  } catch (err) {
    console.error("Error creating event:", err);
    res.status(500).json({ message: "Error creating event" });
  }
});

// Fetch all events
router.get("/get-events", async (req, res) => {
  try {
    const events = await Event.find().populate("organizer", "name email");
    res.status(200).json(events);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ message: "Error fetching events" });
  }
});

// Delete an event
router.post("/delete-event", protect, async (req, res) => {
  const { _id } = req.body;

  try {
    await Event.findByIdAndDelete(_id);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error("Error deleting event:", err);
    res.status(500).json({ message: "Error deleting event" });
  }
});
router.post("/edit-event", protect, async (req, res) => {
    const { _id, ...updates } = req.body;
  
    try {
      const updatedEvent = await Event.findByIdAndUpdate(_id, updates, { new: true });
      res.status(200).json({ message: "Event updated successfully", updatedEvent });
    } catch (err) {
      console.error("Error updating event:", err);
      res.status(500).json({ message: "Error updating event" });
    }
  });
  
module.exports = router;
