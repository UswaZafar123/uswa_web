const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true, // Event name is mandatory
  },
  eventType: {
    type: String,
    enum: ["Car Show", "Auction"], // Restrict to specific event types
    required: true,
  },
  date: {
    type: Date,
    required: true, // Event date is mandatory
  },
  location: {
    type: String,
    required: true, // Event location is mandatory
  },
  description: {
    type: String,
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the user who organizes the event
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Event", eventSchema);
