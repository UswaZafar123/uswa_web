const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema({
  activityType: {
    type: String,
    enum: ["login", "registration"],
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Analytics", analyticsSchema);
